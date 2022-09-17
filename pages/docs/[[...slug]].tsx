import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactElement } from "react";
import { join, resolve } from "path";
import { GetStaticProps, Redirect } from "next";
import { removeExt } from "../../lib/files";
import { readFile, stat } from "fs/promises";
import { readdir } from "fs/promises";
import remarkGfm from "remark-gfm";
import TreeNode from "../../components/TreeItem";
import fm from "front-matter";
import DocWrapper from "../../components/DocWrapper";
import { TreeItem, TreeItemConstructor } from "../../lib/tree";
import { validPaths } from "../../lib/docs";
import { load } from "js-yaml";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { NextPageWithLayout } from "../_app";

export const getServerSideProps: GetStaticProps = async (context) => {
  const slug =
    context.params!.slug === undefined
      ? []
      : (context.params!.slug as string[]);

  if (
    !validPaths.find((path) => JSON.stringify(path) === JSON.stringify(slug))
  ) {
    return {
      notFound: true,
    };
  }

  let path = ["_docs", ...slug].join("/") + ".mdx";

  let redirect: Redirect | null = null;

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
        } catch (_) {}

        if (current && i + 1 == slug.length && node.children.length > 0) {
          redirect = {
            permanent: false,
            destination: `/docs/${slug.join("/")}/${
              node.children[
                node.children.findIndex((a) => a.value === slug[i])
              ].children.shift()!.value
            }`,
          };
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
    await walk(new TreeItemConstructor("root", true), "_docs/")
  ).sort();

  if (slug.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: `/docs/${slug.join("/")}/${tree.children.shift()!.value}`,
      },
    };
  }

  if (redirect) {
    return { redirect };
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

  return { props: { source: mdxSource, tree: tree.plain() } };
};

const DocPage: NextPageWithLayout<{
  source: MDXRemoteSerializeResult;
  tree: TreeItem;
}> = ({ source, tree }) => {
  return (
    <div className="max-w-8xl px-8 min-h-screen mx-auto pt-24 space-y-12 lg:pt-28">
      <aside className="lg:fixed mb-8 lg:mb-0 right-auto flex max-w-80 flex-col break-normal align-top">
        <TreeNode node={tree} path="/docs" />
      </aside>

      <DocWrapper>
        {source.frontmatter?.title && <h1>{source.frontmatter.title}</h1>}
        <MDXRemote {...source} />
      </DocWrapper>
    </div>
  );
};

DocPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <main className="bg-ctp-base">
      {page}
    </main>
  );
};

export default DocPage;
