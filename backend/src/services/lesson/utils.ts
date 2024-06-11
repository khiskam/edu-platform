import { ENV } from "../../env";

export const getImageIdsFromLayout = (layout: string): string[] => {
  const imgTagRegex = /<img\b[^>]*>/gi;

  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  const regex = new RegExp(
    ENV.BASE_URL +
      /\/api\/images\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi.source
  );

  const imgTags = layout.match(imgTagRegex);

  if (imgTags) {
    return imgTags
      .filter((item) => item.match(regex))
      .flatMap((item) => item.match(uuidRegex)) as string[];
  } else {
    return [];
  }
};
