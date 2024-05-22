import { useLayoutEffect } from "react";

import { LessonApi } from "@/shared/api";

export const useSubmit = (isCompleted: boolean) => {
  const { mutateAsync } = LessonApi.useCreateCompletedMutation();

  if (isCompleted) {
    return undefined;
  }

  const onSubmit = (taskId: string) => async () => {
    try {
      await mutateAsync(taskId);
    } catch (e) {
      console.log(e);
    }
  };

  return onSubmit;
};

export const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>, cb?: () => void) => {
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cb?.();
          observer.disconnect();
        }
      },
      { threshold: 0.8 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, cb]);
};
