import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { Form, Spin } from "antd";
import { useRef, useState } from "react";
import { useController } from "react-hook-form";
import { Editor as TinyMCEEditor } from "tinymce";

import { initConfig } from "./config";
import { EditorContainer } from "./styled";
import { TextEditorFieldProps } from "./types";

export const TextEditorField = <T extends object>(props: TextEditorFieldProps<T>) => {
  const { label, control, initValue } = props;

  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const {
    field: { onChange },
    fieldState: { error },
  } = useController(control);

  const handleInit: IAllProps["onInit"] = (_, editor) => {
    editorRef.current = editor;
    setIsLoading(false);
  };

  const handleInput = () => onChange(editorRef.current?.getContent());

  return (
    <Form.Item validateStatus={error ? "error" : "validating"} help={error?.message} label={label}>
      <Spin spinning={isLoading}>
        <EditorContainer hide={isLoading}>
          <Editor
            apiKey={import.meta.env.VITE_MCE_API_KEY}
            onInit={handleInit}
            init={initConfig}
            onInput={handleInput}
            initialValue={initValue}
          />
        </EditorContainer>
      </Spin>
    </Form.Item>
  );
};
