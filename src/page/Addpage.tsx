import { Box, Button, Container, FormControlLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBoards } from "../api/boardApi";
import type { Board } from "../type";


export default function AddPage() {
    const navigate = useNavigate();
    const categories = ["KR", "CN", "JP", "WEST"];
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [board, setBoard] = useState<Board>({
        title: "",
        contents: "",
        img: "",
        type: "",
    });
    const [selectedType, setSelectedType] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBoard((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setSelectedFiles(Array.from(files));
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            // 게시글 데이터(boardDto)를 JSON 문자열로 변환하여 FormData에 추가
            formData.append("boardDto", new Blob([JSON.stringify(board)], { type: "application/json" }));

            // 선택된 파일들을 FormData에 추가
            selectedFiles.forEach((file) => {
                formData.append("imageFiles", file);
            });

            // API 호출 함수 수정 (postBoards가 FormData를 받도록 변경)
            await postBoards(formData);

            alert("게시글이 성공적으로 등록되었습니다!");
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            alert("게시글 등록 실패");
            console.error(error);
        }
    };

    return (

        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
                <Typography variant="h5" gutterBottom>
                    게시글 등록
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="제목"
                        name="title"
                        variant="outlined"
                        value={board.title}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="내용"
                        name="contents"
                        variant="outlined"
                        multiline
                        rows={6}
                        value={board.contents}
                        onChange={handleChange}
                        required
                    />
                    <Button variant="contained" component="label">
                        이미지 업로드
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Typography variant="subtitle1">게시글 분류 선택</Typography>
                    <RadioGroup
                        value={selectedType}
                        onChange={(e) => {
                            const type = e.target.value;
                            console.log("???")
                            setSelectedType(type);
                            setBoard((prev) => ({ ...prev, ['type']: type }));
                        }}
                    >
                        {categories.map((type) => (
                            <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                        ))}
                    </RadioGroup>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        등록하기
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
