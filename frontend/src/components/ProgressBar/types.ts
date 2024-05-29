export type ProgressBarProps = {
  completedCount: number;
  totalCount: number;
} & ContainerProps;

export type ContainerProps = {
  fullWidth?: boolean;
};
