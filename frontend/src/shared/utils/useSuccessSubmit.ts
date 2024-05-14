import { useState } from "react";

export const useSuccessSubmit = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const onSuccess = (success: boolean) => setIsSuccess(success);

  return { isSuccess, onSuccess };
};
