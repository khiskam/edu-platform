import Flex from "antd/es/flex";
import Typography from "antd/es/typography";

import { GAP } from "@/shared/theme/constants";

import { DescriptionProps } from "./types";

export const Description = ({ layout, label, value }: DescriptionProps) => {
  return (
    <Flex
      gap={GAP[4]}
      vertical={layout === "vertical"}
      style={{ width: "100%" }}
      align={layout === "vertical" ? "start" : "un"}
    >
      <Typography.Text type="secondary">{label}:</Typography.Text>
      {value}
    </Flex>
  );
};
