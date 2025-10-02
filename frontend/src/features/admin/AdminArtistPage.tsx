import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import axiosApi from "../../../axiosApi";
import {
    Container,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from "@mui/material";
import {Artist} from "../../app/types";

const ArtistsAdminPage: React.FC = () => {
    const user = useAppSelector(selectUser);
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            const response = await axiosApi.get("/artists", {
                headers: { Authorization: user?.token },
            });
            setArtists(response.data);
        } catch (e) {
            console.error("Failed to fetch artists", e);
        }
    };

    const handleDelete = async (id: string) => {
        if (!user) return;
        if (!window.confirm("Are you sure you want to delete this artist?")) return;

        try {
            await axiosApi.delete(`/artists/${id}`, {
                headers: { Authorization: user.token },
            });
            setArtists((prev) => prev.filter((a) => a._id !== id));
        } catch (e) {
            alert("Failed to delete artist. Only admin can perform this action.");
            console.error(e);
        }
    };

    const handlePublish = async (id: string) => {
        if (!user) return;

        try {
            await axiosApi.patch(
                `/artists/${id}`,
                { isPublished: true },
                { headers: { Authorization: user.token } }
            );
            setArtists((prev) =>
                prev.map((a) => (a._id === id ? { ...a, isPublished: true } : a))
            );
        } catch (e) {
            alert("Failed to publish artist. Only admin can perform this action.");
            console.error(e);
        }
    };

    if (!user || user.role !== "admin") {
        return <Typography>You are not authorized to view this page.</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Admin: Artists
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {artists.map((artist) => (
                        <TableRow key={artist._id}>
                            <TableCell>{artist.name}</TableCell>
                            <TableCell>
                                {artist.isPublished ? "Published" : "неопубликовано"}
                            </TableCell>
                            <TableCell>
                                <Button
                                    color="error"
                                    onClick={() => handleDelete(artist._id)}
                                >
                                    Delete
                                </Button>
                                {!artist.isPublished && (
                                    <Button
                                        color="primary"
                                        onClick={() => handlePublish(artist._id)}
                                    >
                                        Publish
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default ArtistsAdminPage;
