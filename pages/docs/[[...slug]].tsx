import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { FC } from "react";
import { resolve } from "path";
import { GetStaticPaths, GetStaticProps, Redirect } from "next";
import { removeExt, walkFiles } from "../../lib/files";
import { readFile } from "fs/promises";
import { readdir } from "fs/promises";
import remarkGfm from "remark-gfm";
import TreeNode from "../../components/TreeItem";
import fm from "front-matter";
import DocWrapper from "../../components/docs/Wrapper";
import { TreeItem, TreeItemConstructor } from "../../lib/tree";

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

        const frontmatter = fm<FrontMatter>(contents);
        node.addChild(
          new TreeItemConstructor(
            removeExt(dirent.name),
            current,
            frontmatter.attributes.title ? frontmatter.attributes.title : null,
            frontmatter.attributes.weight ? frontmatter.attributes.weight : 0
          )
        );
      }
    }
    return node;
  };

  const tree = await walk(new TreeItemConstructor("root", true), "_docs/");

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
      },
    }
  );

  return { props: { source: mdxSource, tree: tree.plain() } };
};

const DocPage: FC<{ source: MDXRemoteSerializeResult; tree: TreeItem }> = ({
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
