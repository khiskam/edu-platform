import { Button, Modal } from "antd";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { auth } from "@/shared/api";
import { useUserStore } from "@/shared/store";

export const SignOutLink = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const handleOk = async () => {
    await signOut(auth);
    useUserStore.setState({ auth: undefined });
    handleCancel();
  };

  return (
    <>
      <NavLink to="#" onClick={handleOpen}>
        Выйти
      </NavLink>
      <Modal
        open={open}
        footer={[
          <Button key="delete" type="primary" onClick={handleOk}>
            Выйти
          </Button>,
          <Button key="cancel" type="default" onClick={handleCancel}>
            Отмена
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        Вы уверены, что хотите выйти?
      </Modal>
    </>
  );
};
