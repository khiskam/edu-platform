import { Editor } from "@tinymce/tinymce-react";
import { Spin } from "antd";
import { useRef, useState } from "react";
import { Editor as TinyMCEEditor, RawEditorOptions } from "tinymce";

import { Container } from "@/components";

import { PageLayout } from "./styled";

export const initConfig: RawEditorOptions &
  Partial<
    Record<"selector" | "target" | "readonly" | "license_key", undefined>
  > = {
  plugins:
    "autoresize anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes autocorrect typography inlinecss markdown textcolor hr",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | forecolor backcolor | hr",
  language: "ru",
  file_picker_types: "image",
};

export const CreateLessonPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Container>
      {isLoading && <Spin />}

      <PageLayout style={{ display: isLoading ? "none" : "block" }}>
        <Editor
          apiKey={import.meta.env.VITE_MCE_API_KEY}
          onInit={(_, editor) => {
            console.log("here");
            editorRef.current = editor;
            setIsLoading(false);
          }}
          init={{
            ...initConfig,
            images_upload_handler: async (blobInfo) => {
              const data = new FormData();
              data.append("file", blobInfo.blob(), blobInfo.filename());
              return "https://images.unsplash.com";
            },
          }}
          initialValue=""
        />
      </PageLayout>
    </Container>
  );
};
