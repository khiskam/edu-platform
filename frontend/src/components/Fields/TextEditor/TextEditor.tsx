import { Editor, IAllProps } from "@tinymce/tinymce-react";
import Form from "antd/es/form";
import Spin from "antd/es/spin";
import { useLayoutEffect, useRef, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { Editor as TinyMCEEditor } from "tinymce";

import { initConfig } from "./config";
import { useImageUpload } from "./hooks";
import { EditorContainer } from "./styled";
import { TextEditorFieldProps } from "./types";

export const TextEditor = <T extends FieldValues>(props: TextEditorFieldProps<T>) => {
  const { label, control, initValue, resetValue, onReset } = props;

  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const { upload } = useImageUpload();

  const {
    field: { onChange },
    fieldState: { error },
  } = useController(control);

  const handleInit: IAllProps["onInit"] = (_, editor) => {
    editorRef.current = editor;
    setIsLoading(false);
  };

  const handleChange = () => {
    onChange(editorRef.current?.getContent());
  };

  useLayoutEffect(() => {
    if (resetValue !== undefined) {
      editorRef.current?.setContent(resetValue);
    }
    onReset();
  }, [resetValue, onReset]);

  return (
    <Form.Item validateStatus={error ? "error" : "validating"} help={error?.message} label={label}>
      <Spin spinning={isLoading}>
        <EditorContainer hide={isLoading}>
          <Editor
            apiKey={import.meta.env.VITE_MCE_API_KEY}
            onInit={handleInit}
            init={{
              ...initConfig,
              image_dimensions: false,
              image_class_list: [{ title: "Responsive", value: "img-responsive" }],
              images_upload_handler: async (blobInfo) => {
                return await upload(blobInfo.blob(), blobInfo.filename());
              },
            }}
            onChange={handleChange}
            initialValue={initValue}
          />
        </EditorContainer>
      </Spin>
    </Form.Item>
  );
};
