import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {Track} from "../../app/types";
import {fetchTracksByAlbum} from "./tracksThunks.ts";

interface TracksState {
    tracks: Track[];
    fetchLoading: boolean;
}

const initialState: TracksState = {
    tracks: [],
    fetchLoading: false,
};

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksFetchLoading = (state: RootState) => state.tracks.fetchLoading;

const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTracksByAlbum.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchTracksByAlbum.fulfilled, (state, { payload: tracks }) => {
                state.fetchLoading = false;
                state.tracks = tracks;
            })
            .addCase(fetchTracksByAlbum.rejected, (state) => {
                state.fetchLoading = false;
            });
    },
});

export const tracksReducer = tracksSlice.reducer;
