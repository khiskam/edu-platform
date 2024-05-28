import { useTheme } from "@emotion/react";
import { Col, Flex, Row, Typography } from "antd";

import { GAP } from "@/shared/theme";

import { Section } from "../styled";
import { ADVANTAGES } from "./constants";
import { icon } from "./styled";

export const Advantages = () => {
  const theme = useTheme();

  return (
    <Section>
      <Typography.Title level={2}>Причины начать учиться здесь</Typography.Title>
      <Row gutter={[GAP[64], GAP[64]]} align="middle">
        {ADVANTAGES.map(({ key, icon: Icon, title, description }) => (
          <Col xs={24} lg={12} key={key}>
            <Flex vertical align="start" gap={GAP[12]}>
              <Icon className={icon(theme)} />
              <Typography.Text strong>{title}</Typography.Text>
              <Typography.Text>{description}</Typography.Text>
            </Flex>
          </Col>
        ))}
      </Row>
    </Section>
  );
};
