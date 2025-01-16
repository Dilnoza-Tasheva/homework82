import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Card, CardMedia, CardContent, CardActionArea } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAlbums} from "../albums/albumsSlice.ts";
import {fetchAlbumsByArtist} from "../albums/albumsThunks.ts";
import Grid from "@mui/material/Grid2";

const ArtistDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);

    useEffect(() => {
        if (id) dispatch(fetchAlbumsByArtist(id));
    }, [dispatch, id]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Albums
            </Typography>
            <Grid container spacing={3}>
                {albums.map((album) => (
                    <Grid size={{xs:12, sm:6, md:4}} key={album._id}>
                        <Card>
                            <CardActionArea component={Link} to={`/album/${album._id}`}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={album.coverImage || "/fixtures/placeholder.jpg"}
                                    alt={album.title}
                                />
                                <CardContent>
                                    <Typography variant="h6">{album.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {album.releaseDate}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ArtistDetailsPage;
