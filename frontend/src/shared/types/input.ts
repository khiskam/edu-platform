type InputType = "password" | "input";

type StringRecord = Record<string, string>;

export type FieldProps = {
  label: string;
  placeholder?: string;
  type?: InputType;
};

export type FormFieldsData<T extends StringRecord> = {
  [K in keyof T]: FieldProps;
};

export type FormFieldsArray<T extends StringRecord> = (FieldProps & {
  key: keyof T;
})[];

export type ApiError<T extends Record<string, string>> =
  | { field: keyof T | "root"; message: string }
  | undefined;
