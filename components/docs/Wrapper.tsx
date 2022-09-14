import { FC, ReactNode } from "react";

const DocWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <article className="prose max-w-full px-8 pl-80 dark:prose-invert">
        {children}
      </article>
    </>
  );
};

export default DocWrapper;
