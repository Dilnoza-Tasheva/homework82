import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../../axiosApi.ts";
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError} from "../../app/types";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<
    RegisterResponse,
    RegisterMutation,
    {rejectValue: ValidationError}
>(
    'users/register',
    async (registerMutation: RegisterMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/register', registerMutation);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
           return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    }
);

export const logout = createAsyncThunk(
    'users/logout',
    async (_, { getState }) => {
        const state = getState() as { users: { user: User | null } };
        const token = state.users.user?.token;

        if (token) {
            await axiosApi.delete('/users/sessions', {
                headers: { Authorization: token },
            });
        }
    }
);
