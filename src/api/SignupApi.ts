import axios from "axios";
import type { User } from "../type";
import type { UserInfo } from "../store";

const BASE_URL = import.meta.env.VITE_API_URL;

export const postMember = async (user: User): Promise<void> => {
    const response = await axios.post(`${BASE_URL}/member/signup`, user);
    return response.data;
}

export const getAuthToken = async (user: User) => {
    const response = await axios.post(`${BASE_URL}/member/login`, user)
    const token = response.headers.authorization;
    const userInfo: UserInfo = response.data;
    return [token, userInfo];
}