import AntdSkeleton from "antd/es/skeleton";

export const Skeleton = () => {
  return (
    <AntdSkeleton
      active
      paragraph={false}
      title={{ width: 64, style: { margin: 0, height: "20px" } }}
    />
  );
};
