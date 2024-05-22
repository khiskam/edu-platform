import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { TaskApi } from "@/shared/api";
import { AnswerData } from "@/shared/types";

import correctSound from "./assets/correct.wav";
import incorrectSound from "./assets/incorrect.mp3";
import { toAnswers } from "./utils";

export const useSubmit = () => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const { mutateAsync, isPending } = TaskApi.useCreateAnswerMutation();

  const onSubmit = (id: string, reset: () => void) => async (data: AnswerData) => {
    try {
      const answers = toAnswers(data);
      await mutateAsync({ answers, id });
      setSuccess(true);
    } catch (e) {
      setFailure(true);
      reset?.();
    }
  };

  const onSuccess = () => setSuccess(false);
  const onFailure = () => setFailure(false);

  return { onSubmit, isPending, success, failure, onSuccess, onFailure };
};

export const useTasksPage = () => {
  const location = useLocation();

  const routes = location.pathname.split("/");
  routes.pop();

  return routes.join("/");
};

export const useSound = (success: boolean, failure: boolean, onFailure: () => void) => {
  useLayoutEffect(() => {
    if (success) {
      new Audio(correctSound).play();
    }

    if (failure) {
      new Audio(incorrectSound).play();
      onFailure();
    }
  }, [success, failure, onFailure]);
};
