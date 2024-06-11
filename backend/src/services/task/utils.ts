export const checkAnswers = (answers: string[], correctAnswers: string[]) => {
  if (answers.length !== correctAnswers.length) {
    return false;
  }

  const sortFn = (a: string, b: string) => +(a > b) - +(a < b);

  answers.sort(sortFn);
  correctAnswers.sort(sortFn);

  for (let i = 0; i < answers.length; ++i) {
    if (answers[i] != correctAnswers[i]) {
      return false;
    }
  }

  return true;
};
