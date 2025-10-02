import { useEffect, useState } from "react";
import { Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { Album } from "../../app/types";
import axiosApi from "../../../axiosApi.ts";

const AddTrack = () => {
    const [title, setTitle] = useState("");
    const [number, setNumber] = useState("");
    const [length, setLength] = useState("");
    const [album, setAlbum] = useState("");
    const [albums, setAlbums] = useState<Album[]>([]);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        axiosApi.get("/albums").then(res => setAlbums(res.data));
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        await axiosApi.post("/tracks",
            { title, trackNumber: +number, length, album },
            { headers: { Authorization: user.token } }
        );
        navigate("/");
    };

    return (
        <Container>
            <Typography variant="h4">Add Track</Typography>
            <form onSubmit={submit}>
                <TextField fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <TextField fullWidth label="Track number" value={number} onChange={e => setNumber(e.target.value)} />
                <TextField fullWidth label="Length" value={length} onChange={e => setLength(e.target.value)} />
                <Select fullWidth value={album} onChange={e => setAlbum(e.target.value)}>
                    {albums.map(a => <MenuItem key={a._id} value={a._id}>{a.title}</MenuItem>)}
                </Select>
                <Button type="submit" variant="contained">Save</Button>
            </form>
        </Container>
    );
};
export default AddTrack;
