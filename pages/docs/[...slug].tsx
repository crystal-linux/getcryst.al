import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { FC } from "react";
import { resolve } from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import { removeExt, walkFiles } from "../../lib/files";
import { readFile } from "fs/promises";
import { readdir } from "fs/promises";
import remarkGfm from "remark-gfm";
import TreeNode from "../../components/TreeNode";
import { inspect } from "util";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: {
    params: {
      slug: string[];
    };
  }[] = [];

  for await (const file of walkFiles("_docs/")) {
    const path = file.slice(resolve(process.cwd(), "_docs/").length);

    paths.push({
      params: {
        // This is cursed
        slug: removeExt(path).split("/").slice(1),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug as string[];
  const path = ["_docs", ...slug].join("/") + ".mdx";

  const walk = async (node: node, dir: string, i = 0) => {
    const dirents = await readdir(resolve(process.cwd(), dir), {
      withFileTypes: true,
    });
    for (const dirent of dirents) {
      const current = slug[i] === removeExt(dirent.name) && node.current
      if (dirent.isDirectory()) {
        node.children.push(
          await walk(
            {
              value: removeExt(dirent.name),
              children: [],
              current
            },
            resolve(dir, dirent.name),
            i + 1
          )
        );
      } else {
        node.children.push({
          value: removeExt(dirent.name),
          children: [],
          current
        });
      }
    }
    return node;
  };

  const tree = await walk(
    {
      value: "root",
      children: [],
      current: true
    },
    "_docs/"
  );

  const mdxSource = await serialize(
    (await readFile(resolve(process.cwd(), path))).toString(),
    {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    }
  );

  return { props: { source: mdxSource, tree } };
};

const DocPage: FC<{ source: MDXRemoteSerializeResult; tree: node }> = ({
  source,
  tree,
}) => {
  console.log(inspect(tree, {colors: true, depth: null}))
  return (
    <>
      <div className="flex max-w-3xl justify-between mx-auto pt-28 md:pt-40">
        <aside className="flex flex-col">
          <TreeNode node={tree} path="/docs" />
        </aside>
        <MDXRemote {...source} />
      </div>
    </>
  );
};

export default DocPage;
