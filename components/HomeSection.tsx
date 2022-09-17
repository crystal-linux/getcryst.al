import { FC, ReactNode } from "react";

const HomeSection: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="flex flex-col lg:flex-row gap-8 max-w-8xl mx-auto px-8">
    {children}
  </section>
);

export default HomeSection;
