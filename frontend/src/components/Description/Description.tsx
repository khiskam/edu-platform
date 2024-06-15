import Flex from "antd/es/flex";
import Typography from "antd/es/typography";

import { GAP } from "@/shared/theme/constants";

import { DescriptionProps } from "./types";

export const Description = ({ layout, label, value }: DescriptionProps) => {
  return (
    <Flex gap={GAP[4]} vertical={layout === "vertical"}>
      <Typography.Text type="secondary">{label}:</Typography.Text>
      <Typography.Text>{value}</Typography.Text>
    </Flex>
  );
};
