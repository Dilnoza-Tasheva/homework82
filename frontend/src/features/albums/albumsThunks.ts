import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../../axiosApi.ts";

export const fetchAlbumsByArtist = createAsyncThunk(
    'albums/fetchAlbumsByArtist',
    async (artistId: string) => {
        const response = await axiosApi.get(`/albums?artist=${artistId}`);
        return response.data;
    }
);
