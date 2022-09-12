import { useRouter } from "next/router";
import { FC } from "react";

const DocPage: FC<{}> = () => {
  const route = useRouter()

  console.log(route.query)
  return (
    <>
    </>
  );
};

export default DocPage;
