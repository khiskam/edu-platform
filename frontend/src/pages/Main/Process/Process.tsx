import Col from "antd/es/col";
import Collapse from "antd/es/collapse";
import Row from "antd/es/row";
import Typography from "antd/es/typography";

import ProcessIcon from "@/assets/icons/process.svg";
import { GAP } from "@/shared/theme";

import { Section } from "../styled";
import { STEPS } from "./constants";

export const Process = () => {
  return (
    <Section>
      <Typography.Title level={2}>Как начать учиться</Typography.Title>

      <Row align="middle" gutter={[GAP[32], GAP[32]]}>
        <Col xs={24} lg={12}>
          <img src={ProcessIcon} style={{ width: "100%" }} />
        </Col>
        <Col xs={24} lg={12}>
          <Collapse items={STEPS} accordion bordered={false} defaultActiveKey={"step1"} />
        </Col>
      </Row>
    </Section>
  );
};
