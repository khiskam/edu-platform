import { Button, Modal } from "antd";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { auth } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { useUserStore } from "@/shared/store";

export const ProfileLink = () => {
  const auth = useUserStore(({ auth }) => auth);

  if (!auth) return <NavLink to={ROUTES.profile.path}>Профиль</NavLink>;

  return auth.role === "user" ? (
    <NavLink to={ROUTES.profile.path}>Профиль</NavLink>
  ) : (
    <NavLink to={ROUTES.admin.path}>Админ-панель</NavLink>
  );
};

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
