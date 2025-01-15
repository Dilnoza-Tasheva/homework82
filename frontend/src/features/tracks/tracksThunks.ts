import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../../axiosApi.ts";

export const fetchTracksByAlbum = createAsyncThunk(
    'tracks/fetchTracksByAlbum',
    async (albumId: string) => {
        const response = await axiosApi.get(`/tracks?album=${albumId}`);
        return response.data;
    }
);
