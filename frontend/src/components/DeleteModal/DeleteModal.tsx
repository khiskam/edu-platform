import { Button, Modal } from "antd";

import { DeleteModalProps } from "./types";

export const DeleteModal = (props: DeleteModalProps) => {
  const { open, onOk, onCancel, title, body } = props;
  return (
    <Modal
      title={title}
      footer={[
        <Button key="delete" type="primary" danger onClick={onOk}>
          Удалить
        </Button>,
        <Button key="cancel" type="default" onClick={onCancel}>
          Отмена
        </Button>,
      ]}
      open={open}
      onCancel={onCancel}
    >
      <p>{body}</p>
    </Modal>
  );
};
