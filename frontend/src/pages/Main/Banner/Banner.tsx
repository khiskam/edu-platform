import { WifiOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { Button, Col, Flex, Row, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";

import BannerImage from "../asset/banner.svg?react";
import { title } from "../styled";
import { Badge, Layout } from "./styled";

export const Banner = () => {
  const theme = useTheme();
  return (
    <Row gutter={[GAP[128], GAP[32]]} align="middle">
      <Col xs={24} lg={12}>
        <Layout>
          <Badge>
            <Flex gap={GAP[12]}>
              <WifiOutlined />
              <Typography.Text>ОНЛАЙН</Typography.Text>
            </Flex>
          </Badge>

          <Typography.Title className={title(theme)}>
            НЕСКУЧНАЯ ШКОЛА ДЛЯ ДЕТЕЙ ОТ 7 ДО 15 ЛЕТ
          </Typography.Title>

          <Typography.Text>
            Каждое занятие вы можете пройти в удобное для вас время. Соверешенно бесплатно. Много
            интересных занятий и заданий к ним.
          </Typography.Text>

          <NavLink to={ROUTES.signin.name}>
            <Button type="primary" size="large">
              Начать учиться
            </Button>
          </NavLink>
        </Layout>
      </Col>
      <Col xs={24} lg={12}>
        <BannerImage width="100%" />
      </Col>
    </Row>
  );
};
