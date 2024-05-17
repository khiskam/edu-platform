import { Lesson } from "@domain/lesson";

export type LessonDTO = Omit<Lesson, "id">;
