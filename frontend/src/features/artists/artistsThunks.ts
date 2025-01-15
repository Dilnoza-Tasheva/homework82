import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../../axiosApi.ts";

export const fetchArtists = createAsyncThunk('artists/fetchArtists', async () => {
    const response = await axiosApi.get('/artists');
    return response.data;
});
