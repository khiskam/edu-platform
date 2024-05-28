import { Container } from "@/components";

import { Advantages } from "./Advantages";
import { Banner } from "./Banner";
import { Categories } from "./Categories";
import { Faq } from "./Faq";
import { Process } from "./Process";
import { StatisticBadge } from "./StatisticBadge";
import { Layout } from "./styled";

export const Main = () => {
  return (
    <Container>
      <Layout>
        <div>
          <Banner />
          <StatisticBadge />
        </div>
        <Categories />
        <Advantages />
        <Process />
        <Faq />
      </Layout>
    </Container>
  );
};
