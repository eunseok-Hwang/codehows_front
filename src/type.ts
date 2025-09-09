export type ImgCardData = {
    id: number;
    title: string;
    contents: string;
    img: string;
    type: string;
}

export type User = {
    username?: string;
    password: string;
    userId: string;
    nickname?: string;
}

export type Board = {
    id?: number;
    title: string;
    contents: string;
    img: string;
    type: string;
}

export type Comment = {
    board_id: number;
    nickname?: string;
    comment: string;
}