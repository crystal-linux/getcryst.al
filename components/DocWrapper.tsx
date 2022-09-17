import { FC, ReactNode } from "react";

const DocWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <article className="prose !mt-0 max-w-full dark:prose-invert lg:pl-80 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-scroll [&_pre]:!bg-ctp-mantle">
        {children}
      </article>
    </>
  );
};

export default DocWrapper;
