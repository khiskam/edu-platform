import { FormFieldsArray, FormFieldsData } from "../types";

export const getFieldsData = <T extends Record<string, string>>(
  data: FormFieldsData<T>
): FormFieldsArray<T> => {
  const result: FormFieldsArray<T> = [];

  for (const key in data) {
    const { label, placeholder, type, revalidate } = data[key];
    result.push({ key, label, placeholder, type, revalidate });
  }

  return result;
};
