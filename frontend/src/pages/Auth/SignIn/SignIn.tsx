import Divider from "antd/es/divider";
import Typography from "antd/es/typography";

import { Carousel, Container } from "@/components";
import { Auth } from "@/widgets";

import { useMatchMedia } from "../hooks";
import { divider, Form, Layout } from "../styled";

export const SignIn = () => {
  const isSmallSize = useMatchMedia();

  return (
    <Container>
      <Layout formPosition="right">
        {!isSmallSize && (
          <>
            <Carousel dotPosition="left" />
            <Divider type="vertical" className={divider} />
          </>
        )}
        <Form>
          <Typography.Title level={2}>Вход</Typography.Title>
          <Auth.SignInForm />
        </Form>
      </Layout>
    </Container>
  );
};
