import { UseFormSetError } from "react-hook-form";

import { UpdateUserData } from "@/shared/types";

export type ProfileFormProps = {
  data: Pick<UpdateUserData, "firstName" | "lastName">;
  onSubmit: (setError: UseFormSetError<UpdateUserData>) => (data: UpdateUserData) => void;
};
