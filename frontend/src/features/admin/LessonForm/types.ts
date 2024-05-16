import { Category, FormProps } from "@/shared/types";
import { LessonData } from "@/shared/validation";

export type LessonFormProps = FormProps<LessonData> & {
  categories?: Category[];
};
