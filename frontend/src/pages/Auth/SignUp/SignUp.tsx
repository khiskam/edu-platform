import Divider from "antd/es/divider";
import Typography from "antd/es/typography";

import { Carousel, Container } from "@/components";
import { Auth } from "@/widgets";

import { useMatchMedia } from "../hooks";
import { divider, Form, Layout } from "../styled";

export const SignUp = () => {
  const isSmallSize = useMatchMedia();

  return (
    <Container>
      <Layout>
        <Form>
          <Typography.Title level={2}>Регистрация</Typography.Title>
          <Auth.SignUpForm />
        </Form>
        {!isSmallSize && (
          <>
            <Divider type="vertical" className={divider} />
            <Carousel dotPosition="right" />
          </>
        )}
      </Layout>
    </Container>
  );
};
