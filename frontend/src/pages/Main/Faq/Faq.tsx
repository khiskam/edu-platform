import { useTheme } from "@emotion/react";
import { Collapse, Typography } from "antd";

import { title } from "../styled";
import { FAQ } from "./constants";
import { Layout } from "./styled";

export const Faq = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Typography.Title level={2} className={title(theme)}>
        Вопросы и ответы
      </Typography.Title>
      <Collapse items={FAQ} size="large" />
    </Layout>
  );
};
