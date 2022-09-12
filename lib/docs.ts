import { resolve } from "path";
import { removeExt, walkFiles } from "./files";

export const validPaths = await (async () => {
  const paths: string[][] = [[]];

  for await (const file of walkFiles("_docs/")) {
    const path = file.slice(resolve(process.cwd(), "_docs/").length);

    paths.push(removeExt(path).split("/").slice(1));
  }

  return paths;
})();
