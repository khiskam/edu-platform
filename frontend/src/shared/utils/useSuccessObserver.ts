import { useLayoutEffect } from "react";

import { FormWidgetProps } from "../types";

export const useSuccessObserver = (isSuccess: boolean, onSuccess: FormWidgetProps["onSuccess"]) => {
  useLayoutEffect(() => {
    onSuccess?.(isSuccess);
  }, [isSuccess, onSuccess]);
};
