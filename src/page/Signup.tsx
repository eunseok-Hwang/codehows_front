import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import type { User } from "../type";
import { postMember } from "../api/SignupApi";
import { useNavigate } from "react-router-dom";


export default function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        username: "",
        password: "",
        userId: "",
        nickname: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSignup = () => {
        postMember(user);
        navigate("/");
    };

    return (
        <>
            <Stack spacing={2} mt={2} alignItems="center">
                <TextField
                    label="ID"
                    name="user_id"
                    onChange={handleChange}
                />

                <TextField
                    label="PW"
                    name="password"
                    onChange={handleChange}
                />

                <TextField
                    label="UserName"
                    name="username"
                    onChange={handleChange}
                />

                <TextField
                    label="NickName"
                    name="nickname"
                    onChange={handleChange}
                />

                <Button
                    color="primary"
                    onClick={handleSignup}>
                    회원가입
                </Button>

            </Stack>
        </>
    )
}