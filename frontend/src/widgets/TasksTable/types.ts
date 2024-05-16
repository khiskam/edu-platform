import { TaskData } from "@/shared/validation";

export type useColumnsProps = {
  onDelete: (id?: string) => void;
};

export type DataType = {
  id: string;
} & TaskData;
