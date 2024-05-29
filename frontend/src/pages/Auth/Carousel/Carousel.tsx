import { Carousel as AntdCarousel, CarouselProps } from "antd";

import EducationIcon from "@/assets/icons/education.svg?react";
import LessonIcon from "@/assets/icons/lesson.svg?react";
import ThinkingIcon from "@/assets/icons/thinking.svg?react";

import { icon, Layout, Slide } from "./styled";

export const Carousel = ({ dotPosition }: CarouselProps) => {
  return (
    <Layout>
      <AntdCarousel dotPosition={dotPosition} infinite vertical autoplay autoplaySpeed={5000}>
        <div>
          <Slide padding={dotPosition}>
            <EducationIcon className={icon} />
          </Slide>
        </div>
        <div>
          <Slide padding={dotPosition}>
            <LessonIcon className={icon} />
          </Slide>
        </div>
        <div>
          <Slide padding={dotPosition}>
            <ThinkingIcon className={icon} />
          </Slide>
        </div>
      </AntdCarousel>
    </Layout>
  );
};
