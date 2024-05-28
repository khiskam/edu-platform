import { PlusOutlined } from "@ant-design/icons";
import { Collapse, Typography } from "antd";

import { Section } from "../styled";
import { FAQ } from "./constants";
import { accordionIcon, AccordionsContainer } from "./styled";

export const Faq = () => {
  return (
    <Section>
      <Typography.Title level={2}>Вопросы и ответы</Typography.Title>
      <AccordionsContainer>
        {FAQ?.map((item) => (
          <Collapse
            key={item.key}
            items={[item]}
            expandIconPosition="end"
            expandIcon={({ isActive }) => (
              <PlusOutlined className={accordionIcon} rotate={isActive ? 45 : 0} />
            )}
          />
        ))}
      </AccordionsContainer>
    </Section>
  );
};
