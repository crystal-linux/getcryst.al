import { readdir } from "fs/promises";
import { resolve } from "path";

export async function* walkFiles(dir: string): AsyncGenerator<string> {
  const dirents = await readdir(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      if (!dirent.name.startsWith(".")) {
        yield res;
        yield* walkFiles(res);
      }
    } else {
      yield res;
    }
  }
}

export const removeExt = (str: string) => str.replace(/\.[^/.]+$/, "");
