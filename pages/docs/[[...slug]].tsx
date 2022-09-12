import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { FC } from "react";
import { resolve } from "path";
import { GetStaticPaths, GetStaticProps, Redirect } from "next";
import { removeExt, walkFiles } from "../../lib/files";
import { lstat, readFile } from "fs/promises";
import { readdir } from "fs/promises";
import remarkGfm from "remark-gfm";
import TreeNode from "../../components/TreeNode";
import fm from "front-matter";
import DocWrapper from "../../components/docs/Wrapper";

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

  paths.push({
    params: {
      slug: [],
    },
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug =
    context.params!.slug === undefined
      ? []
      : (context.params!.slug as string[]);

  let path = ["_docs", ...slug].join("/");

  // try {
  //   if ((await lstat(path)).isDirectory()) {
  //     const dirents = await readdir(resolve(process.cwd(), path));
  //
  //     return {
  //       props: {},
  //       redirect: {
  //         destination: `/docs/${slug.join("/")}/${removeExt(dirents.shift()!)}`,
  //         permanent: false,
  //       },
  //     };
  //   }
  // } catch {}

  path = path + ".mdx";

  let redirect: Redirect | null = null;

  const walk = async (node: node, dir: string, i = 0) => {
    const dirents = await readdir(resolve(process.cwd(), dir), {
      withFileTypes: true,
    });
    for (const dirent of dirents) {
      if (dirent.name.startsWith(".")) {
        continue;
      }

      const current = slug[i] === removeExt(dirent.name) && node.current;
      if (dirent.isDirectory()) {
        const child = await walk(
          {
            value: removeExt(dirent.name),
            children: [],
            current,
          },
          resolve(dir, dirent.name),
          i + 1
        );
        node.children.push(child);

        if (current && i + 1 == slug.length && node.children.length > 0) {
          // We are a directory AND the path
          redirect = {
            permanent: false,
            destination: `/docs/${slug.join("/")}/${
              node.children[0].children.shift()!.value
            }`,
          };
        }
      } else {
        try {
          const contents = (
            await readFile(resolve(dir, dirent.name))
          ).toString();

          const frontmatter = fm<FrontMatter>(contents);
          node.children.push({
            value: removeExt(dirent.name),
            pretty: frontmatter.attributes.title
              ? frontmatter.attributes.title
              : null,
            children: [],
            current,
          });
        } catch (e) {}
      }
    }
    return node;
  };

  const tree = await walk(
    {
      value: "root",
      children: [],
      current: true,
    },
    "_docs/"
  );

  if (redirect) {
    return { props: { tree }, redirect };
  }

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
  return (
    <>
      <div className="flex justify-center gap-4 pt-28 md:pt-40">
        <aside className="flex w-60 flex-col">
          <TreeNode node={tree} path="/docs" />
        </aside>

        <DocWrapper>
          {source.frontmatter?.title && <h1>{source.frontmatter.title}</h1>}
          <MDXRemote {...source} />
        </DocWrapper>
      </div>
    </>
  );
};

export default DocPage;
