import { create } from "zustand";

interface UserData {
  username : string
  email  : string 
  password : string
}

interface AuthState {
  user: UserData | null;
  login: (user: UserData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
