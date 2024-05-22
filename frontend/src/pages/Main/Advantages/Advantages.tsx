import { useTheme } from "@emotion/react";
import { Col, Row, Steps, Typography } from "antd";

import { GAP } from "@/shared/theme";

import AdvantagesImage from "../asset/advantages.svg?react";
import { title } from "../styled";
import { ADVANTAGES } from "./constants";
import { Content } from "./styled";

export const Advantages = () => {
  const theme = useTheme();

  return (
    <Row gutter={[GAP[32], GAP[32]]} align="middle">
      <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
        <AdvantagesImage width="100%" />
      </Col>
      <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
        <Content>
          <Typography.Title level={2} className={title(theme)}>
            Для кого подойдет методика нашей школы?
          </Typography.Title>
          <Steps progressDot current={ADVANTAGES.length} direction="vertical" items={ADVANTAGES} />
        </Content>
      </Col>
    </Row>
  );
};
