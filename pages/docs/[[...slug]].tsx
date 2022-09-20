import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactElement } from "react";
import { join, resolve } from "path";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { removeExt, walkFiles } from "../../lib/files";
import { readFile, stat } from "fs/promises";
import { readdir } from "fs/promises";
import remarkGfm from "remark-gfm";
import TreeNode from "../../components/TreeItem";
import fm from "front-matter";
import DocWrapper from "../../components/DocWrapper";
import { findCurrentDir, TreeItem, TreeItemConstructor } from "../../lib/tree";
import { load } from "js-yaml";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TranslationInfo from "../../components/TranslationInfo";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: GetStaticPathsResult["paths"] = [];

  for (const locale of locales!) {
    for await (const file of walkFiles(`_docs/${locale}`)) {
      const path = file.slice(
        resolve(process.cwd(), `_docs/${locale}/`).length
      );

      paths.push({
        params: {
          slug: removeExt(path).split("/").slice(1),
          locale,
        },
      });
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params!.slug === undefined ? [] : (params!.slug as string[]);
  const translations = await serverSideTranslations(locale!, [
    "common",
    "footer",
    "navbar",
    "meta",
  ]);

  let path = ["_docs", locale, ...slug].join("/") + ".mdx";
  let isDir: boolean = false;

  const walk = async (node: TreeItemConstructor, dir: string, i = 0) => {
    const dirents = await readdir(resolve(process.cwd(), dir), {
      withFileTypes: true,
    });
    for (const dirent of dirents.filter(
      (dirent) => !dirent.name.startsWith(".")
    )) {
      const current = slug[i] === removeExt(dirent.name) && node.current;
      if (dirent.isDirectory()) {
        node.addChild(
          await walk(
            new TreeItemConstructor(removeExt(dirent.name), current, null, 0),
            resolve(dir, dirent.name),
            i + 1
          )
        );

        try {
          const configFile = join(resolve(dir, dirent.name), ".config.yaml");
          const config = await stat(configFile);

          if (config.isFile()) {
            const { title, weight } = load(
              (await readFile(configFile)).toString(),
              {}
            ) as FrontMatter;
            if (title) node.children.at(-1)!.pretty = title;
            if (weight) node.children.at(-1)!.weight = weight;
          }
        } catch (_) { }

        if (current && i + 1 == slug.length && node.children.length > 0) {
          isDir = true;
        }
      } else {
        const contents = (await readFile(resolve(dir, dirent.name))).toString();

        const {
          attributes: { title, weight },
        } = fm<FrontMatter>(contents);
        node.addChild(
          new TreeItemConstructor(
            removeExt(dirent.name),
            current,
            title ? title : null,
            weight ? weight : 0
          )
        );
      }
    }
    return node;
  };

  const tree = (
    await walk(new TreeItemConstructor("root", true), `_docs/${locale}/`)
  ).sort();

  if (isDir || slug.length === 0) {
    const plain = tree.plain();
    return {
      props: {
        source: null,
        tree: plain,
        dir: findCurrentDir(plain),
        ...translations,
      },
    };
  }

  const mdxSource = await serialize(
    (await readFile(resolve(process.cwd(), path))).toString(),
    {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
          rehypeHighlight,
        ],
      },
    }
  );

  return {
    props: {
      source: mdxSource,
      tree: tree.plain(),
      ...translations,
    },
  };
};

const DocPage: NextPageWithLayout<{
  source: MDXRemoteSerializeResult | null;
  tree: TreeItem;
  dir: TreeItem | null;
}> = ({ source, tree, dir }) => {
  const {
    query: { slug },
  } = useRouter();

  return (
    <div className="mx-auto min-h-screen max-w-8xl space-y-12 space-x-4 px-4 pb-16 pt-24 md:px-8 md:pb-28 lg:pt-28">
      <aside className="right-auto mb-8 flex w-80 flex-col break-normal align-top lg:fixed lg:mb-0">
        <TreeNode node={tree} path="/docs" />
      </aside>

      <DocWrapper>
        {dir ? (
          <>
            {dir.pretty !== null && <h1>{dir.pretty}</h1>}
            <TranslationInfo />
            <ul>
              {dir.children.map((child) => (
                <li key={child.value}>
                  <Link href={`${(slug as string[]).join("/")}/${child.value}`}>
                    <a>{child.pretty ? child.pretty : child.value}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            {source!.frontmatter?.title && <h1>{source!.frontmatter.title}</h1>}
            <TranslationInfo />
            <MDXRemote {...source!} />
          </>
        )}
      </DocWrapper>
    </div>
  );
};

DocPage.getLayout = function getLayout(page: ReactElement) {
  return <main>{page}</main>;
};

export default DocPage;
