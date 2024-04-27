import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Form, Spin, Typography } from "antd";
import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Container, FormContainer, FormField } from "@/components";
import { auth } from "@/shared/config";
import { ROUTES } from "@/shared/constants";

import { errorsMap, inputs, schema } from "./fields";
import { FormData } from "./fields";

export const SignUpPage = () => {
  const { control, handleSubmit, trigger, setError } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      onAuthStateChanged(auth, (user) => {
        setIsLoading(false);
        if (user) {
          sendEmailVerification(user);
          navigate(ROUTES.main);
        }
      });
    } catch (e) {
      setIsLoading(false);
      if (e instanceof FirebaseError) {
        if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
          setError("email", { message: errorsMap.EMAIL_EXISTS });
        } else if (e.code === AuthErrorCodes.INVALID_EMAIL) {
          setError("email", { message: errorsMap.EMAIL_INVALID });
        }
      }
    }
  });

  return (
    <Container>
      <Spin spinning={isLoading}>
        <Flex align="center" justify="center">
          <FormContainer>
            <Typography.Title level={2}>Регистрация</Typography.Title>
            <Form layout="vertical" onFinish={onSubmit}>
              {inputs.map(({ key, revalidate, ...value }) => (
                <FormField<FormData>
                  key={key}
                  controller={{ control, name: key }}
                  trigger={
                    revalidate ? { fn: trigger, name: revalidate } : undefined
                  }
                  {...value}
                />
              ))}

              <Button type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
            </Form>
          </FormContainer>
        </Flex>
      </Spin>
    </Container>
  );
};
