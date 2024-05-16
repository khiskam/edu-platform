import { CategoryData, LessonData, TaskData } from "../validation";

type Id = { id: string };

export type Category = CategoryData & Id;
export type Lesson = LessonData & Id;
export type Task = TaskData & Id;
