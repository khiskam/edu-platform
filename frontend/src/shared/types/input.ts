type InputType = "password" | "input";

type StringRecord = Record<string, string>;

export type FieldProps = {
  label: string;
  placeholder?: string;
  type?: InputType;
};

type Trigger<T extends StringRecord> = {
  revalidate?: keyof T;
};

export type FormFieldsData<T extends StringRecord> = {
  [K in keyof T]: FieldProps & Trigger<T>;
};

export type FormFieldsArray<T extends StringRecord> = (FieldProps &
  Trigger<T> & {
    key: keyof T;
  })[];

export type ApiError<T extends Record<string, string>> =
  | { field: keyof T | "root"; message: string }
  | undefined;
