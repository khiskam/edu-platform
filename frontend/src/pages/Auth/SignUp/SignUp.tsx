import Divider from "antd/es/divider";
import Typography from "antd/es/typography";

import { Container } from "@/components";
import { SignUpForm } from "@/widgets";

import { Carousel } from "../Carousel";
import { useMatchMedia } from "../hooks";
import { divider, Form, Layout } from "../styled";

export const SignUp = () => {
  const isSmallSize = useMatchMedia();

  return (
    <Container>
      <Layout>
        <Form>
          <Typography.Title level={2}>Регистрация</Typography.Title>
          <SignUpForm />
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
