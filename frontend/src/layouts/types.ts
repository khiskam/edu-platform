import { FieldValues, UseFormSetError } from "react-hook-form";

export type FormProps<T extends FieldValues = FieldValues> = {
  onSubmit: (
    setError: UseFormSetError<T>,
    reset?: (data?: Partial<T>) => void
  ) => (data: T) => Promise<void>;

  defaultValues?: Partial<T>;
};

export type Data<T> = {
  data: T;
};

export type ListProps<T> = {
  data?: T[];
  isLoading: boolean;
  totalCount: number | undefined;
};

export type TableProps<T> = {
  data?: T[];
  onDelete: (id?: string) => void;
  pagesCount: number;
  isLoading: boolean;
};

export type useColumnsProps = {
  onDelete: (id?: string) => void;
};
