import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Typography, List, ListItem, ListItemText, Divider, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTracks} from "../tracks/tracksSlice.ts";
import {fetchTracksByAlbum} from "../tracks/tracksThunks.ts";
import axiosApi from "../../../axiosApi.ts";

const AlbumDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);

    useEffect(() => {
        if (id) dispatch(fetchTracksByAlbum(id));
    }, [dispatch, id]);

    const handlePlayTrack = async (trackId: string) => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                await axiosApi.post(
                    '/track-history',
                    { trackId },
                    { headers: {Authentication: token }}
                );
                console.log(`Track ${trackId} added to track history.`);
            } catch (error) {
                console.error("Error adding track to history:", error);
            }
        } else {
            console.error("User is not authenticated.");
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Tracks
            </Typography>
            <List>
                {tracks.map((track) => (
                    <React.Fragment key={track._id}>
                        <ListItem secondaryAction={
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handlePlayTrack(track._id)}
                            >
                                Play
                            </Button>
                        }
                        >
                            <ListItemText
                                primary={`${track.trackNumber}. ${track.title}`}
                                secondary={`Length: ${track.length}`}
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default AlbumDetailsPage;
