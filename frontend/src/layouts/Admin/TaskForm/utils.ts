import { CorrectAnswer } from "@/shared/types";

export const getCorrectAnswers = (answers: string[], correctAnswers: string[]) => {
  const correctCount = 0;

  return answers.map((value): CorrectAnswer => {
    return {
      isCorrect: correctCount <= correctAnswers.length && correctAnswers.includes(value),
      value,
    };
  });
};
