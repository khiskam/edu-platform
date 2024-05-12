import { create } from "zustand";

import { User } from "./types";

export const useUserStore = create<User>(() => ({}));
