import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Container, Box } from '@mui/material';
import axiosApi from "../../../axiosApi.ts";

interface TrackHistoryItem {
    track: {
        title: string;
        performer: string;
    };
    dateTime: string;
}

const TrackHistory: React.FC = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const [history, setHistory] = useState<TrackHistoryItem[]>([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchHistory = async () => {
            try {
                const response = await axiosApi.get('/track-history', {
                    headers: { Authorization: user.token},
                });
                setHistory(response.data);
            } catch (error) {
                console.error('Error to fetch track history:', error);
            }
        };
        fetchHistory();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <Container maxWidth="md">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Track History
                </Typography>
                <List>
                    {history
                        .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
                        .map((item, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                primary={item.track.title}
                                secondary={`Performed by: ${item.track.performer} | Played At: ${new Date(item.dateTime).toLocaleString()}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default TrackHistory;
