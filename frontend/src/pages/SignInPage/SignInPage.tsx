import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Form, Spin, Typography } from "antd";
import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Container, FormContainer, FormField } from "@/components";
import { auth } from "@/shared/config";
import { ROUTES } from "@/shared/constants";

import { errorsMap } from "../SignUpPage/fields";
import { FormData, inputs, schema } from "./fields";

const signIn = async (data: FormData) => {
  await signInWithEmailAndPassword(auth, data.email, data.password);
};

const useSignInMutation = () => {
  return useMutation({ mutationFn: signIn });
};

export const SignInPage = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate(ROUTES.main);
        }
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (
          e.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS ||
          e.code === AuthErrorCodes.INVALID_EMAIL
        ) {
          setError("root", { message: errorsMap.CREDENTIALS_INVALID });
        } else if (e.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
          setError("root", {
            message: "Выполнено слишком много попыток, попробуйте позже",
          });
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

            {errors.root?.message && (
              <Typography.Text type="danger">
                {errors.root.message}
              </Typography.Text>
            )}
            <Form layout="vertical" onFinish={onSubmit}>
              {inputs.map(({ key, ...value }) => (
                <FormField<FormData>
                  key={key}
                  controller={{ control, name: key }}
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
