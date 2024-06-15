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
    } catch (e) {}
  };

  return onSubmit;
};

export const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>, cb?: () => void) => {
  useLayoutEffect(() => {
    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        cb?.();
        io.disconnect();
      }
    };

    const io = new IntersectionObserver(onIntersection, { threshold: 0.8 });
    if (ref.current) io.observe(ref.current);

    return () => {
      io.disconnect();
    };
  }, [ref, cb]);
};
