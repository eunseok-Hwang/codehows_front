import { create } from "zustand"
export type UserInfo = {
    memberId: number;
    nickname: string;
}

type AuthState = {
    isAuthenticated: boolean;
    userInfo: UserInfo;
    login: (user: UserInfo) => void;
    logout: () => void;
}

export const useAuthState = create<AuthState>((set) => ({
    isAuthenticated: !!sessionStorage.getItem("jwt"),
    userInfo: {
        memberId: 0,
        nickname: ""
    },
    login: (user: UserInfo) => set({ isAuthenticated: true, userInfo: user }),
    logout: () => {
        sessionStorage.removeItem("jwt");
        set({
            isAuthenticated: false, userInfo: {
                memberId: 0,
                nickname: ""
            }
        });
    }
}));