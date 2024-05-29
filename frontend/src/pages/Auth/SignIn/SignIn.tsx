import { Divider, Typography } from "antd";

import { Container } from "@/components";
import { SignInForm } from "@/widgets";

import { Carousel } from "../Carousel";
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
          <SignInForm />
        </Form>
      </Layout>
    </Container>
  );
};
