import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Typography, List, ListItem, ListItemText, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTracks} from "../tracks/tracksSlice.ts";
import {fetchTracksByAlbum} from "../tracks/tracksThunks.ts";
import axiosApi from "../../../axiosApi.ts";
import {selectUser} from "../users/usersSlice.ts";

const AlbumDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const user = useAppSelector(selectUser);

    const visibleTracks = tracks.filter(t => user?.role === "admin" || t.isPublished);


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
                {visibleTracks.map((track) => (
                    <ListItem key={track._id} divider
                              secondaryAction={
                                  <Button variant="contained" color="primary" onClick={() => handlePlayTrack(track._id)}>
                                      Play
                                  </Button>
                              }
                    >
                        <ListItemText
                            primary={`${track.trackNumber}. ${track.title} ${user?.role === "admin" && !track.isPublished ? "(не опубликовано)" : ""}`}
                            secondary={`Length: ${track.length}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default AlbumDetailsPage;
