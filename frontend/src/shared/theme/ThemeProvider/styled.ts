import { css } from "@emotion/react";

import NunitoBold from "@/assets/fonts/Nunito-Bold.ttf";
import NunitoMedium from "@/assets/fonts/Nunito-Medium.ttf";
import NunitoRegular from "@/assets/fonts/Nunito-Regular.ttf";
import NunitoSemibold from "@/assets/fonts/Nunito-SemiBold.ttf";

export const global = css`
  @font-face {
    font-family: "Nunito";
    src: url(${NunitoRegular});
    font-weight: 400;
  }

  @font-face {
    font-family: "Nunito";
    src: url(${NunitoMedium});
    font-weight: 500;
  }

  @font-face {
    font-family: "Nunito";
    src: url(${NunitoSemibold});
    font-weight: 600;
  }

  @font-face {
    font-family: "Nunito";
    src: url(${NunitoBold});
    font-weight: 700;
  }

  .img-responsive {
    max-width: 100%;
    height: auto;
  }
`;
