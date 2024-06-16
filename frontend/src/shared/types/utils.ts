import { AnswerData, TaskData, TaskDataWithAnswers } from "./task";

export const toTaskData = (data: TaskDataWithAnswers): TaskData => {
  return {
    title: data.title,
    description: data.description,
    lessonId: data.lessonId,
    answers: data.answers.map((value) => value.value),
    correctAnswers: data.answers.reduce<string[]>((acc, curr) => {
      if (curr.isCorrect) {
        return [...acc, curr.value];
      }
      return acc;
    }, []),
  };
};

export const getTaskData = (data?: TaskData): TaskDataWithAnswers | undefined => {
  if (!data) {
    return undefined;
  }

  const answersData: AnswerData = { answers: [] };
  const correctAnswers = [...data.correctAnswers];

  data.answers.forEach((value) => {
    const idx = correctAnswers.findIndex((item) => item === value);

    if (idx === -1) {
      answersData.answers.push({ isCorrect: false, value });
    } else {
      answersData.answers.push({ isCorrect: true, value });
      correctAnswers.splice(idx, 1);
    }
  });

  return {
    title: data.title,
    description: data.description,
    lessonId: data.lessonId,
    answers: answersData.answers,
  };
};
