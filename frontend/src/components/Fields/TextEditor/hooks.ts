import { ImageApi } from "@/shared/api";
import { API_URL } from "@/shared/api/constants";
import { useMessageStore } from "@/shared/store";

export const useImageUpload = () => {
  const { mutateAsync } = ImageApi.useImageUploadMutation();

  const upload = async (blob: Blob, fileName: string) => {
    const data = new FormData();
    data.append("file", blob, fileName);

    try {
      const response = await mutateAsync(data);
      if (!response) {
        throw new Error("Не удалось загрузить изображение");
      }

      useMessageStore.setState({
        content: { message: "Изображение загружено", type: "success" },
      });

      return `${API_URL}/images/${response.data.image.id}`;
    } catch {
      throw new Error("Не удалось загрузить изображение");
    }
  };

  return { upload };
};
