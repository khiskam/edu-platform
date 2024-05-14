import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { Form } from "antd";
import { useRef } from "react";
import { useController } from "react-hook-form";
import { Editor as TinyMCEEditor } from "tinymce";

import { initConfig } from "./config";
import { TextEditorFieldProps } from "./types";

export const TextEditorField = <T extends object>(props: TextEditorFieldProps<T>) => {
  const { label, control } = props;
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const {
    field: { onChange },
    fieldState: { error },
  } = useController(control);

  const handleInit: IAllProps["onInit"] = (_, editor) => {
    editorRef.current = editor;
    props.onInit?.();
  };

  const handleInput = () => onChange(editorRef.current?.getContent());

  return (
    <Form.Item validateStatus={error ? "error" : "validating"} help={error?.message} label={label}>
      <Editor
        apiKey={import.meta.env.VITE_MCE_API_KEY}
        onInit={handleInit}
        init={initConfig}
        onInput={handleInput}
      />
    </Form.Item>
  );
};
