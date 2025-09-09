import { Button, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../api/SignupApi";
import { useAuthState } from "../store";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuthState();
    const [toastOpen, setToastOpen] = useState(false);
    const [user, setUser] = useState({
        userId: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        getAuthToken(user)
            .then((res) => {
                const [token, userInfo] = res;
                if (token != null) {
                    sessionStorage.setItem("jwt", token);
                    login(userInfo);
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
                setToastOpen(true);
            });
    }


    return (
        <>
            <Stack spacing={2} mt={2} alignItems="center">
                <TextField
                    label="ID"
                    name="userId"
                    onChange={handleChange}
                />

                <TextField
                    label="PW"
                    name="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <Button
                    color="primary"
                    onClick={handleLogin}>
                    로그인
                </Button>
                <Snackbar
                    open={toastOpen}
                    autoHideDuration={3000}
                    onClose={() => setToastOpen(false)}
                    message='로그인 실패'
                />
            </Stack>
        </>
    )
}