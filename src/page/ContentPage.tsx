import { Container, Typography } from "@mui/material";
import type { Board } from "../type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoardId, } from "../api/boardApi";

export default function ContentPage() {
    const { id } = useParams();
    const [board, setBoard] = useState<Board>({
        title: "",
        contents: "",
        img: "",
        type: "",
    });

    useEffect(() => {
        if (id) {
            getBoardId(Number(id))
                .then(setBoard);
        }
    }, [id])

    return (
        <>
            <Container maxWidth="sm">
                <Typography variant="h4">{board.title}</Typography>
                <Typography variant="body1" sx={{ marginY: 2 }}>{board.contents}</Typography>
                <img src={board.img} alt="게시글 이미지" style={{ width: "100%" }} />
                <Typography variant="caption">분류: {board.type}</Typography>
            </Container>

        </>
    )
}