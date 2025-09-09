import axios from "axios";
import type { Comment } from "../type";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getComments = async (boardId: number): Promise<Comment[]> => {
    const jwt = sessionStorage.getItem('jwt');
    const response = await axios.get(`${BASE_URL}/boards/${boardId}/comments`, {
        headers: {
            Authorization: jwt
        }
    });
    return response.data;
};

export const postComment = async (commentData: Comment): Promise<void> => {
    const jwt = sessionStorage.getItem('jwt');
    return await axios.post(`${BASE_URL}/boards/${commentData.board_id}/comments`, commentData, {
        headers: {
            Authorization: jwt
        }
    });
};