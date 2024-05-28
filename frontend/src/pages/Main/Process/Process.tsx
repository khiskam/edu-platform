import { Col, Collapse, Row, Typography } from "antd";

import ProcessIcon from "@/assets/icons/process.svg?react";
import { GAP } from "@/shared/theme";

import { Section } from "../styled";
import { STEPS } from "./constants";

export const Process = () => {
  return (
    <Section>
      <Typography.Title level={2}>Как начать учиться</Typography.Title>

      <Row align="middle" gutter={[GAP[32], GAP[32]]}>
        <Col xs={24} lg={12}>
          <ProcessIcon width="100%" />
        </Col>
        <Col xs={24} lg={12}>
          <Collapse items={STEPS} accordion bordered={false} defaultActiveKey={"step1"} />
        </Col>
      </Row>
    </Section>
  );
};
