import { MutationDTO, MutationDTOWithId, TaskDTO } from "./dto";

export type Answers = { answers: string[]; correctAnswers: string[] };

export type Values = {
  answers: { isCorrect: boolean; value: string }[];
};

export const MutationDTOtoTaskDTO = (task: MutationDTO | MutationDTOWithId): TaskDTO => {
  const { title, description, lessonId, answers } = task;
  const variants = answers.map((item) => item.value.trim());
  const correctAnswers = answers.filter((item) => item.isCorrect).map((item) => item.value.trim());

  return { title, description, lessonId, correctAnswers, answers: variants };
};

export const checkAnswers = (answers: string[], correctAnswers: string[]) => {
  if (answers.length !== correctAnswers.length) {
    return false;
  }

  let count = 0;

  for (let i = 0; i < correctAnswers.length; ++i) {
    if (answers.includes(correctAnswers[i])) {
      ++count;
    }
  }

  return count === correctAnswers.length;
};
