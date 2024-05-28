import { useTheme } from "@emotion/react";
import { Button, Col, Row, Typography } from "antd";
import { NavLink } from "react-router-dom";

import BannerImage from "@/assets/icons/banner.svg?react";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";

import { Section } from "../styled";
import { ContentLayout, subtitle, title } from "./styled";

export const Banner = () => {
  const theme = useTheme();
  return (
    <Section>
      <Row align="middle" gutter={[GAP[32], GAP[32]]}>
        <Col xs={24} lg={12}>
          <ContentLayout>
            <Typography.Title className={title(theme)}>
              НЕСКУЧНАЯ ШКОЛА ДЛЯ ДЕТЕЙ
              <span className="orange"> ОТ 7 ДО 15 ЛЕТ</span>
            </Typography.Title>

            <Typography.Text className={subtitle(theme)}>
              Каждое занятие вы можете пройти в удобное для вас время. Соверешенно бесплатно. Много
              интересных занятий и заданий к ним.
            </Typography.Text>

            <NavLink to={ROUTES.signin.name}>
              <Button type="primary" size="large">
                Начать учиться
              </Button>
            </NavLink>
          </ContentLayout>
        </Col>
        <Col xs={24} lg={12}>
          <BannerImage width="100%" />
        </Col>
      </Row>
    </Section>
  );
};
