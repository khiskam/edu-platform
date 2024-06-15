import { UseFormSetError } from "react-hook-form";

import { getApiError, UserApi } from "@/shared/api";
import { UpdateUserData } from "@/shared/types";

export const useFormSubmit = () => {
  const { submit, isPending, isSuccess } = UserApi.useUpdateMutation();

  const onSubmit = (setError: UseFormSetError<UpdateUserData>) => async (data: UpdateUserData) => {
    try {
      await submit(data);
    } catch (e) {
      const errors = getApiError<UpdateUserData>(e);

      if (errors) {
        errors.forEach((item) => {
          setError(item.field, { message: item.message });
        });
      }
    }
  };

  return { onSubmit, isPending, isSuccess };
};
