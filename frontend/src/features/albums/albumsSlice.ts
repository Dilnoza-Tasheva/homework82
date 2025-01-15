import {Album} from "../../app/types";
import {RootState} from "../../app/store.ts";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAlbumsByArtist} from "./albumsThunks.ts";


interface AlbumState {
    albums: Album[];
    fetchLoading: boolean;
}

const initialState: AlbumState = {
    albums: [],
    fetchLoading: false,
}

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectFetchLoading = (state: RootState) => state.albums.fetchLoading;

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbumsByArtist.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAlbumsByArtist.fulfilled, (state, { payload: albums }) => {
                state.fetchLoading = false;
                state.albums = albums;
            })
            .addCase(fetchAlbumsByArtist.rejected, (state) => {
                state.fetchLoading = false;
            });
    },
});

export const albumsReducer = albumsSlice.reducer;