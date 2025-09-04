
import type { ImgCardData } from "../type";
import axios from 'axios';

export const getBoards = async (type: string): Promise<ImgCardData[]> => {
    const response = await axios.get(`http://localhost:5173/api/boards/${type}`);
    return response.data;
}