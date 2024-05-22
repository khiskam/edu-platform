import { SmileOutlined } from "@ant-design/icons";
import { Button, Modal, Result, Spin } from "antd";
import { useLayoutEffect } from "react";
import Confetti from "react-confetti";
import { NavLink } from "react-router-dom";

import { User } from "@/features";
import { TaskApi } from "@/shared/api";
import { Id } from "@/shared/types";

import correctSound from "./asset/correct.wav";
import incorrectSound from "./asset/incorrect.mp3";
import { useSubmit, useTasksPage } from "./hooks";
import { CONGRATULATORY_PHRASES } from "./utils";

const { Task: TaskLayout } = User;

export const Task = ({ id }: Id) => {
  const { isLoading, data, isRefetching } = TaskApi.useOneWithProgress(id);
  const { onSubmit, isPending, success, onSuccess, failure, onFailure } = useSubmit();
  const taskPageRoute = useTasksPage();

  useLayoutEffect(() => {
    const correctAudio = new Audio(correctSound);
    const incorrectAudio = new Audio(incorrectSound);

    if (success) {
      correctAudio.play();
    }

    if (failure) {
      incorrectAudio.play();
      onFailure();
    }
  }, [success, failure, onFailure]);

  if (isLoading || !data) {
    return <Spin />;
  }

  return (
    <>
      {success && <Confetti recycle={true} gravity={0.2} />}
      <Spin spinning={isPending || isRefetching}>
        <TaskLayout data={data.task} onSubmit={onSubmit} />

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
