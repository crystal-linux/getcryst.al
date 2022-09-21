import fm from "front-matter";
import { readdir, readFile, stat } from "fs/promises";
import { load } from "js-yaml";
import { join, resolve } from "path";
import { removeExt } from "./files";

export interface ITreeItem {
  value: string;
  current: boolean;
  children: ITreeItem[];
  weight: number;
  pretty: string | null;
}

export class TreeItem {
  value: string;
  current: boolean;
  children: TreeItem[] = [];
  weight: number;
  pretty: string | null;

  contents: string | null = null;

  constructor(
    value = "root",
    pretty: string | null = null,
    weight = 0,
    contents: string | null = null,
    children: TreeItem[] = []
  ) {
    this.value = value;
    this.current = false;
    this.pretty = pretty;
    this.weight = weight;
    this.contents = contents;
    this.children = children;
  }

  async addEntry(dir: string, name: string) {
    const contents = (await readFile(resolve(dir, name))).toString();

    const {
      attributes: { title, weight },
    } = fm<FrontMatter>(contents);

    this.addChild(
      new TreeItem(
        removeExt(name),
        title ? title : null,
        weight ? weight : 0
      ).setContents(contents)
    );
  }

  async walk(dir: string) {
    const dirents = await readdir(resolve(process.cwd(), dir), {
      withFileTypes: true,
    });

    for (const dirent of dirents) {
      if (dirent.name.startsWith(".")) continue;

      if (dirent.isDirectory()) {
        const resolvedDir = resolve(dir, dirent.name);

        this.addChild(
          await (
            await new TreeItem(removeExt(dirent.name), null, 0).walk(
              resolvedDir
            )
          ).readConfigYaml(resolvedDir)
        );
      } else {
        await this.addEntry(dir, dirent.name);
      }
    }

    return this;
  }

  async readConfigYaml(dir: string) {
    try {
      const configFile = join(dir, ".config.yaml");
      const config = await stat(configFile);

      if (config.isFile()) {
        const { title, weight } = load(
          (await readFile(configFile)).toString(),
          {}
        ) as FrontMatter;

        if (weight) this.weight = weight;
        if (title) this.pretty = title;
      }
    } catch (e) {
      console.info("Could not load .config.yaml for ", dir);
      console.error(e);
    }

    return this;
  }

  setContents(contents: string) {
    this.contents = contents;
    return this;
  }

  find(slug: string[], current: boolean = false, i = 0): TreeItem | undefined {
    if (slug[i] !== this.value) return;

    for (const child of this.children) {
      const match = child.find(slug, current, i + 1);

      if (match !== undefined) return match;
    }

    if (this.children.length === 0) return this;
  }

  walkCurrents(aim: string[], i = 0) {
    this.current = aim[i] === this.value;

    if (this.current) {
      for (const child of this.children) {
        child.walkCurrents(aim, i + 1);
      }
    }
  }

  copy(): TreeItem {
    return new TreeItem(
      this.value,
      this.pretty,
      this.weight,
      this.contents,
      this.children.map((child) => child.copy())
    );
  }

  addChild(child: TreeItem) {
    this.children.push(child);
  }

  plain(): ITreeItem {
    return {
      value: this.value,
      current: this.current,
      children: this.children.map((child) => child.plain()),
      weight: this.weight,
      pretty: this.pretty,
    };
  }

  sort() {
    this.children.forEach((child) => child.sort());
    this.children.sort((a, b) => b.weight - a.weight);

    return this;
  }
}

export const findCurrentDir = (node: ITreeItem): ITreeItem | null => {
  if (!node.current) {
    return null;
  }

  for (const child of node.children) {
    if (child.current && child.children.length !== 0) {
      return child;
    }
  }

  return node;
};
