import { useLayoutEffect } from "react";

import { FormProps } from "../types";

export const useSuccessObserver = (isSuccess: boolean, onSuccess: FormProps["onSuccess"]) => {
  useLayoutEffect(() => {
    onSuccess(isSuccess);
  }, [isSuccess, onSuccess]);
};
