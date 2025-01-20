import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../../axiosApi.ts";
import {RegisterMutation, RegisterResponse, ValidationError} from "../../app/types";
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
)
