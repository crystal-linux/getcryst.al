import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactElement, useEffect } from "react";
import { resolve } from "path";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { removeExt, walkFiles } from "../../lib/files";
import remarkGfm from "remark-gfm";
import TreeNode from "../../components/TreeItem";
import DocWrapper from "../../components/DocWrapper";
import { findCurrentDir, ITreeItem } from "../../lib/tree";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TranslationInfo from "../../components/TranslationInfo";
import Edit from "../../components/Edit";
import { existsSync } from "fs";
import getTree from "../../lib/trees";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: GetStaticPathsResult["paths"] = [];

  for (const locale of locales!) {
    if (existsSync(`_docs/${locale}`)) {
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

  const rootySlug = ["root", ...slug];

  const tree = getTree(locale!).copy();
  tree.walkCurrents(rootySlug);

  const me = tree.find(rootySlug);

  if (slug.length === 0 || me === undefined) {
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

  return {
    props: {
      source: await serialize(me.contents!, {
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
      }),
      tree: tree.plain(),
      ...translations,
    },
  };
};

const DocPage: NextPageWithLayout<{
  source: MDXRemoteSerializeResult | null;
  tree: ITreeItem;
  dir: ITreeItem | null;
}> = ({ source, tree, dir }) => {
  const {
    query: { slug },
    push,
  } = useRouter();

  useEffect(() => {
    if (slug === undefined) {
      push("/docs/crystal-linux/getting-started");
    }
  }, [push, slug]);

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
              {slug &&
                dir.children.map((child) => (
                  <li key={child.value}>
                    <Link
                      href={`${(slug as string[]).join("/")}/${child.value}`}
                    >
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
            <Edit />
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
