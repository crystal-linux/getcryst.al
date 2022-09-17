import { FC, ReactNode } from "react";

const HomeSection: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <section className={`w-full py-6 ${className ? className : ""}`}>
    <div className="mx-auto flex max-w-8xl flex-col gap-8 px-4 md:px-8 lg:flex-row">
      {children}
    </div>
  </section>
);

export default HomeSection;
