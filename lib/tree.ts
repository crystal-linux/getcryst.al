export interface TreeItem {
  value: string,
  current: boolean,
  children: TreeItem[],
  weight: number,
  pretty: string | null
}

export class TreeItemConstructor {
  value: string;
  current: boolean;
  children: TreeItemConstructor[] = [];
  weight: number;
  pretty: string | null;

  constructor(
    value = "root",
    current = false,
    pretty: string | null = null,
    weight = 0
  ) {
    this.value = value;
    this.current = current;
    this.pretty = pretty
    this.weight = weight;
  }

  addChild(child: TreeItemConstructor) {
    this.children.push(child)
    this.children.sort((a, b) => b.weight - a.weight);
  }

  plain(): TreeItem {
    return {
      value: this.value,
      current: this.current,
      children: this.children.map(child => child.plain()),
      weight: this.weight,
      pretty: this.pretty
    }
  }
}
