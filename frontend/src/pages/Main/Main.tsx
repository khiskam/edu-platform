import { Container } from "@/shared/ui";

import { Advantages } from "./Advantages";
import { Banner } from "./Banner";
import { Faq } from "./Faq";
import { Layout } from "./styled";

export const Main = () => {
  return (
    <Container>
      <Layout>
        <Banner />
        <Advantages />
        <Faq />
      </Layout>
    </Container>
  );
};
