import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { TaskApi } from "@/shared/api";
import { AnswerData } from "@/shared/types";
import { getCompletedAnswerData } from "@/shared/types/utils";

import { FAILURE_AUDIO, SUCCESS_AUDIO } from "./constants";

export const useSubmit = () => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const { mutateAsync, isPending } = TaskApi.useCreateCompletedMutation();

  const onSubmit = (id: string, reset: () => void) => async (data: AnswerData) => {
    try {
      await mutateAsync({ answers: getCompletedAnswerData(data), id });
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
      SUCCESS_AUDIO.play();
    }

    if (failure) {
      FAILURE_AUDIO.play();
      onFailure();
    }
  }, [success, failure, onFailure]);
};
