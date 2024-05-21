import { NoticeType } from "antd/es/message/interface";

import { UserRole } from "../types";

export type User = {
  auth?: {
    token: string;
    role: UserRole;
  };
};

export type Message = {
  content?: { message: string; type: NoticeType };
};
