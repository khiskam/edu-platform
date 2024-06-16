import AntdCarousel, { CarouselProps } from "antd/es/carousel";

import EducationIcon from "@/assets/icons/education.svg";
import LessonIcon from "@/assets/icons/lesson.svg";
import ThinkingIcon from "@/assets/icons/thinking.svg";

import { icon, Layout, Slide } from "./styled";

export const Carousel = ({ dotPosition }: CarouselProps) => {
  return (
    <Layout>
      <AntdCarousel dotPosition={dotPosition} infinite vertical autoplay autoplaySpeed={5000}>
        <div>
          <Slide padding={dotPosition}>
            <img src={EducationIcon} className={icon} />
          </Slide>
        </div>
        <div>
          <Slide padding={dotPosition}>
            <img src={LessonIcon} className={icon} />
          </Slide>
        </div>
        <div>
          <Slide padding={dotPosition}>
            <img src={ThinkingIcon} className={icon} />
          </Slide>
        </div>
      </AntdCarousel>
    </Layout>
  );
};
