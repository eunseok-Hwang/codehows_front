import { Box, Button, Container, TextField, Typography } from "@mui/material";
import type { Board, Comment } from "../type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteBoard, getBoardId, } from "../api/boardApi";
import { useAuthState } from "../store";
import { getComments, postComment } from "../api/commentApi";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ContentPage() {
    const { id } = useParams();
    const { userInfo, isAuthenticated } = useAuthState();
    const [board, setBoard] = useState<Board>({
        title: "",
        contents: "",
        img: "",
        type: "",
    });

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);


    const fetchBoardData = async () => {
        try {
            const boardRes = await getBoardId(Number(id));
            setBoard(boardRes);

            const commentsRes = await getComments(Number(id));
            setComments(commentsRes);
        } catch (error) {
            console.error("데이터 로딩 실패", error);
        }
    };

    const handleDelete = async () => {
        if (!id) return;

        const confirmDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await deleteBoard(Number(id));
            alert("게시글이 삭제되었습니다.");
            window.location.href = "/"; // 홈으로 리디렉션
        } catch (error) {
            alert("삭제 실패");
            console.error(error);
        }

    }

    useEffect(() => {
        if (id) {
            fetchBoardData();
        }
    }, [id])


    const handleSubmit = async () => {
        if (!commentText || !userInfo) return;

        const commentData: Comment = {
            board_id: Number(id),
            comment: commentText,
            // memberId: userInfo.memberId // 사용자 ID를 추가
        };

        try {
            await postComment(commentData);
            setCommentText("");
            fetchBoardData(); // 댓글 등록 후 데이터 새로고침
            alert("댓글이 성공적으로 등록되었습니다!");
        } catch (error) {
            alert("댓글 등록 실패");
            console.error(error);
        }
    };

    return (
        <>
            <Container maxWidth="sm">
                {/* 삭제버튼 */}
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="h4">{board.title}</Typography>
                    {isAuthenticated && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>
                    )}
                </Box>
                <img src={`${BASE_URL}${board.img}`} alt="게시글 이미지" style={{ width: "100%" }} />
                <Typography variant="body1" sx={{ marginY: 2 }}>{board.contents}</Typography>
                <Typography variant="h6" sx={{ mt: 4 }}>댓글:</Typography>
                {/* 댓글 입력 폼 */}
                {isAuthenticated ? (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="댓글"
                            name="commetn"
                            variant="outlined"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            multiline
                            minRows={3}
                            required
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            등록하기
                        </Button>
                    </Box>) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                        댓글을 작성하려면 로그인하세요.
                    </Typography>
                )}

                {/* 댓글 목록 표시 */}
                <Box sx={{ mt: 4 }}>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {/* 댓글 작성자 표시. 백엔드에서 member 엔티티의 이름 등을 가져와야 합니다. */}
                                    {comment.nickname ? comment.nickname : "익명"}
                                </Typography>
                                <Typography variant="body1">
                                    {comment.comment}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
                        </Typography>
                    )}
                </Box>
            </Container>


        </>
    )
}