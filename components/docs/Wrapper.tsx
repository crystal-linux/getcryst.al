import { FC, ReactNode } from "react";

const DocWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <article className="prose max-w-full [&_table]:overflow-x-scroll [&_table]:block [&_table]:max-w-full md:pl-80 dark:prose-invert [&_pre]:!bg-ctp-mantle">
        {children}
      </article>
    </>
  );
};

export default DocWrapper;
