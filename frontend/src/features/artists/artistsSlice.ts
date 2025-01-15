import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {Artist} from "../../app/types";
import {fetchArtists} from "./artistsThunks.ts";


interface ArtistsState {
    artists: Artist[];
    fetchLoading: boolean;
}

const initialState: ArtistsState = {
    artists: [],
    fetchLoading: false,
};

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsFetchLoading = (state: RootState) => state.artists.fetchLoading;

const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtists.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
                state.fetchLoading = false;
                state.artists = artists;
            })
            .addCase(fetchArtists.rejected, (state) => {
                state.fetchLoading = false;
            });
    },
});

export const artistsReducer = artistsSlice.reducer;
