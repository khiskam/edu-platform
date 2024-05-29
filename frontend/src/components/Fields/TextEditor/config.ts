import { RawEditorOptions } from "tinymce";

export const initConfig: RawEditorOptions &
  Partial<Record<"selector" | "target" | "readonly" | "license_key", undefined>> = {
  plugins:
    "autoresize anchor autolink charmap codesample emoticons image link lists media searchreplace table" +
    " visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker" +
    " a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions" +
    " tableofcontents footnotes autocorrect typography inlinecss markdown",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table" +
    " | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent" +
    " | emoticons charmap | removeformat | forecolor backcolor | hr",
  language: "ru",
  file_picker_types: "image",
};
