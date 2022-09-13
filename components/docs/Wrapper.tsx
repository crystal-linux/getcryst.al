import { FC, ReactNode } from "react";

const DocWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <article className="prose dark:prose-invert max-w-full pl-80 px-8">{children}</article>
    </>
  );
};

export default DocWrapper;
