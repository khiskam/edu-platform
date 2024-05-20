export type Image = {
  id: string;
  path: string;
  size: number;
  contentType: string;
  fileName: string;
  lessonId: string | null;
};

export type ImageKeys = keyof Image;
