
import type { ImgCardData } from "../type";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getBoards = async (type: string): Promise<ImgCardData[]> => {
    const response = await axios.get(`${BASE_URL}/boards/list/${type}`, {
        headers: {
            Authorization: sessionStorage.getItem("jwt")
        }
    });
    return response.data;
}

export const postBoards = async (type: FormData) => {
    const jwt = sessionStorage.getItem('jwt');
    const response = await axios.post(`${BASE_URL}/boards/post`, type, {
        headers: {
            Authorization: jwt
        }
    })
    return response.data
}

export const getBoardId = async (id: number): Promise<ImgCardData> => {
    const response = await axios.get(`${BASE_URL}/boards/${id}`, {
        headers: {
            Authorization: sessionStorage.getItem("jwt")
        }
    });
    return response.data;
}

export const deleteBoard = async (id: number): Promise<number> => {
    const jwt = sessionStorage.getItem('jwt');
    const response = await axios.delete(`${BASE_URL}/boards/${id}`, {
        headers: {
            Authorization: jwt
        }
    });
    return response.data;
}