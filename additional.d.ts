type node = {
  value: string;
  pretty?: string | null;
  children: node[];
  current: boolean;
};

type FrontMatter = {
  title?: string
}
