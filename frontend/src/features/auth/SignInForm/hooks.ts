import { message } from "antd";
import { useCallback, useLayoutEffect } from "react";
import { FormState, UseFormClearErrors } from "react-hook-form";

import { SignInData } from "@/shared/types";

export const useMessage = <T extends SignInData>(
  errors: FormState<T>["errors"],
  clearErrors: UseFormClearErrors<T>
) => {
  const [messageApi, contextHolder] = message.useMessage();

  const error = useCallback(
    (errors: FormState<T>["errors"]) => {
      messageApi.open({
        type: "error",
        content: errors.root?.message,
        duration: 2,
      });
      clearErrors("root");
    },
    [messageApi, clearErrors]
  );

  useLayoutEffect(() => {
    if (errors.root) {
      error(errors);
    }
  }, [errors, error, errors.root]);

  return contextHolder;
};
