
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