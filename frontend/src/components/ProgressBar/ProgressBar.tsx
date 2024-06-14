import Progress from "antd/es/progress";

import { Container } from "./styled";
import { ProgressBarProps } from "./types";

export const ProgressBar = ({ completedCount, totalCount, fullWidth }: ProgressBarProps) => {
  return (
    <Container fullWidth={fullWidth}>
      <Progress percent={(completedCount / totalCount) * 100} />
    </Container>
  );
};
