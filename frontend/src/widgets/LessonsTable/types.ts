import { LessonData } from "@/shared/validation";

export type useColumnsProps = {
  onDelete: (id?: string) => void;
};

export type DataType = {
  id: string;
} & LessonData;
