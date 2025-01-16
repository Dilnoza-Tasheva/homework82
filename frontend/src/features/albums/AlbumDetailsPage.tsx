import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTracks} from "../tracks/tracksSlice.ts";
import {fetchTracksByAlbum} from "../tracks/tracksThunks.ts";

const AlbumDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    // const loading = useAppSelector(selectTracksFetchLoading);

    useEffect(() => {
        if (id) dispatch(fetchTracksByAlbum(id));
    }, [dispatch, id]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Tracks
            </Typography>
            <List>
                {tracks.map((track) => (
                    <React.Fragment key={track._id}>
                        <ListItem>
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
