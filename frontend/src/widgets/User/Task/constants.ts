import correctSound from "@/assets/audio/correct.wav";
import incorrectSound from "@/assets/audio/incorrect.mp3";

export const CONGRATULATORY_PHRASES = [
  "Отличная работа!",
  "Ты справился великолепно!",
  "Превосходный результат!",
  "Поздравляю, задание выполнено!",
  "Фантастический успех!",
  "Блестяще выполнено!",
  "Ты молодец!",
  "Отличное достижение!",
  "Замечательно!",
  "Ты сделал это!",
  "Потрясающий результат!",
  "Превосходно!",
  "Ты просто гений!",
  "Идеальное выполнение задания!",
  "Браво!",
  "Ты справился на все 100!",
  "Великолепно!",
  "Так держать!",
  "Ты превзошел ожидания!",
  "Задание выполнено на ура!",
];

export const SUCCESS_AUDIO = new Audio(correctSound);
export const FAILURE_AUDIO = new Audio(incorrectSound);
