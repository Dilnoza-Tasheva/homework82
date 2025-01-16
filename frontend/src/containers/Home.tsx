import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {selectArtists} from "../features/artists/artistsSlice.ts";
import {useEffect} from "react";
import {fetchArtists} from "../features/artists/artistsThunks.ts";
import Grid from "@mui/material/Grid2";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Home = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Artists
            </Typography>
            <Grid container spacing={3}>
                {artists.map((artist) => (
                    <Grid size={{xs:12, sm:6, md:4}} key={artist._id}>
                        <Card>
                            <CardActionArea component={Link} to={`/artist/${artist._id}`}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={artist.photo || "/placeholder.jpg"}
                                    alt={artist.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{artist.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
};

export default Home;