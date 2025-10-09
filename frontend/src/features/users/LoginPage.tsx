import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { login } from './usersThunks';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(login({ username, password }));
        if (login.fulfilled.match(result)) {
            navigate('/');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Typography variant="h5" textAlign="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={onSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
                    Sign In
                </Button>
            </form>
        </Container>
    );
};

export default LoginPage;
