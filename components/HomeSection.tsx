import { FC, ReactNode } from "react";

const HomeSection: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <section
    className={`py-6 w-full ${
      className ? className : ""
    }`}
  >
    <div className="flex flex-col px-8 lg:flex-row gap-8 mx-auto max-w-8xl">
      {children}
    </div>
  </section>
);

export default HomeSection;
