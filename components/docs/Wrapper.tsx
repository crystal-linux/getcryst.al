import { FC, ReactNode } from "react";

const DocWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <>
    <article className="prose dark:prose-invert">
      {children}
    </article>
  </>;
};

export default DocWrapper;
