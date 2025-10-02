import { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import axiosApi from "../../../axiosApi.ts";

const AddArtist = () => {
    const [name, setName] = useState("");
    const [info, setInfo] = useState("");
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        await axiosApi.post(
            "/artists",
            { name, information: info },
            { headers: { Authorization: user.token } }
        );
        navigate("/");
    };

    return (
        <Container>
            <Typography variant="h4">Add Artist</Typography>
            <form onSubmit={submit}>
                <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField fullWidth label="Info" value={info} onChange={(e) => setInfo(e.target.value)} />
                <Button type="submit" variant="contained">Save</Button>
            </form>
        </Container>
    );
};
export default AddArtist;
