export type TableProps<T> = {
  data?: T[];
  onDelete: (id?: string) => void;
  pagesCount: number;
};
