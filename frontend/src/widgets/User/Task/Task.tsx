import SmileOutlined from "@ant-design/icons/SmileOutlined";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import Result from "antd/es/result";
import Spin from "antd/es/spin";
import Confetti from "react-confetti";
import { NavLink } from "react-router-dom";

import { User } from "@/layouts";
import { TaskApi } from "@/shared/api";
import { Id } from "@/shared/types";

import { CONGRATULATORY_PHRASES } from "./constants";
import { useSound, useSubmit, useTasksPage } from "./hooks";

export const Task = ({ id }: Id) => {
  const { isLoading, data, isRefetching } = TaskApi.useOneProgressQuery(id);
  const { onSubmit, isPending, success, onSuccess, failure, onFailure } = useSubmit();
  const taskPageRoute = useTasksPage();
  useSound(success, failure, onFailure);

  if (isLoading || !data) {
    return <Spin />;
  }

  return (
    <>
      {success && <Confetti recycle={true} gravity={0.2} />}
      <Spin spinning={isPending || isRefetching}>
        <User.Task data={data.task} onSubmit={onSubmit} />

        <Modal open={success} onCancel={onSuccess} footer={[]}>
          <Result
            icon={<SmileOutlined />}
            title={
              CONGRATULATORY_PHRASES[Math.floor(Math.random() * CONGRATULATORY_PHRASES.length)]
            }
            extra={
              <NavLink to={taskPageRoute}>
                <Button key="delete" type="primary" onClick={onSuccess}>
                  Вернуться к заданиям
                </Button>
              </NavLink>
            }
          />
        </Modal>
      </Spin>
    </>
  );
};
