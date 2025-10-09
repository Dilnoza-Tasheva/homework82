import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Avatar, Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { LoginMutation } from '../../app/types';
import { useAppDispatch } from '../../app/hooks.ts';
import { login } from './usersThunks.ts';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from './usersThunks.ts';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(login(state)).unwrap();
        navigate('/');
    };

    const googleLoginHandler = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                label="Username"
                                name="username"
                                autoComplete="current-username"
                                value={state.username}
                                onChange={inputChangeHandler}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={state.password}
                                onChange={inputChangeHandler}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>

                    <Box sx={{ pt: 2, width: '100%', textAlign: 'center' }}>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                if (credentialResponse.credential) {
                                    void googleLoginHandler(credentialResponse.credential);
                                }
                            }}
                            onError={() => console.log('Login Failed')}
                        />
                    </Box>

                    <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Grid>
                            <Link href="#" variant="body2">
                                Don't have an account yet? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
