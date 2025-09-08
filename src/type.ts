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
    title: string;
    contents: string;
    img: string;
    type: string;
}