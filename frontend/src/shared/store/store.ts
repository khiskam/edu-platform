import { create } from "zustand";

import { Message, User } from "./types";

export const useUserStore = create<User>(() => ({}));

export const useMessageStore = create<Message>(() => ({}));
