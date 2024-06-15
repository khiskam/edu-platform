import { create } from "zustand";

import { Message, User } from "./types";

export const useUserStore = create<User>(() => ({ isLoading: false }));

export const useMessageStore = create<Message>(() => ({}));
