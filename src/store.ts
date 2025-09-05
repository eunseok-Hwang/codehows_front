import { create } from "zustand"

type AuthState = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const useAuthState = create<AuthState>((set) => ({
    isAuthenticated: !!sessionStorage.getItem("jwt"),
    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false })
}))