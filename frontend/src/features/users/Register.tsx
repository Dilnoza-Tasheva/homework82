import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Avatar, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError } from './usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { register } from './usersThunks.ts';
import { RegisterMutation } from '../../app/types';

const Register = () => {
    const dispatch = useAppDispatch();
    const registerError = useAppSelector(selectRegisterError);
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterMutation & { displayName: string; avatar: File | null }>({
        username: '',
        password: '',
        displayName: '',
        avatar: null,
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setForm(prevState => ({ ...prevState, avatar: e.target.files![0] }));
        }
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('password', form.password);
        formData.append('displayName', form.displayName);
        if (form.avatar) formData.append('avatar', form.avatar);

        try {
            // @ts-ignore
            await dispatch(register(formData)).unwrap();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return registerError?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                    <Grid container direction="column" size={12} spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={form.username}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('username'))}
                                helperText={getFieldError('username')}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={form.password}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                name="displayName"
                                label="Display Name"
                                id="displayName"
                                value={form.displayName}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Button variant="outlined" component="label" fullWidth>
                                Upload Avatar
                                <input hidden accept="image/*" type="file" name="avatar" onChange={fileChangeHandler} />
                            </Button>
                            {form.avatar && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Selected: {form.avatar.name}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
