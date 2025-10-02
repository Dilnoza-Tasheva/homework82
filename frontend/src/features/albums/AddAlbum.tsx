import { useEffect, useState } from "react";
import { Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { Artist } from "../../app/types";
import axiosApi from "../../../axiosApi.ts";

const AddAlbum = () => {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [artist, setArtist] = useState("");
    const [artists, setArtists] = useState<Artist[]>([]);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        axiosApi.get("/artists").then(res => setArtists(res.data));
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        await axiosApi.post("/albums",
            { title, releaseDate: +year, artist },
            { headers: { Authorization: user.token } }
        );
        navigate("/");
    };

    return (
        <Container>
            <Typography variant="h4">Add Album</Typography>
            <form onSubmit={submit}>
                <TextField fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <TextField fullWidth label="Year" value={year} onChange={e => setYear(e.target.value)} />
                <Select fullWidth value={artist} onChange={e => setArtist(e.target.value)}>
                    {artists.map(a => <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>)}
                </Select>
                <Button type="submit" variant="contained">Save</Button>
            </form>
        </Container>
    );
};
export default AddAlbum;
