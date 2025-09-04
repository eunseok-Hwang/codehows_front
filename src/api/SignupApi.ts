import axios from "axios";
import type { User } from "../type";

export const postMember = async (user: User): Promise<void> => {
    const response = await axios.post(`http://localhost:5173/api/member/signup`, user);
    return response.data;
}