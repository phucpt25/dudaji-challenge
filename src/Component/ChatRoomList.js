import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, List, ListItem, Container } from '@mui/material';
import {BASE_URL} from '../Asset/Enviroment';

const ChatRoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(BASE_URL+'/rooms')
        .then(res => setRooms(res.data))
        .catch(err => console.error(err))
    }, []);

    const handleCreateRoom = () => {
        axios.post(BASE_URL+'/rooms', {room: newRoom})
        .then(() => {
            setRooms((prevData) => [...prevData, newRoom]);
            setNewRoom('');
        })
        .catch(err => console.error(err));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dudaji Challenge ChatRoom</Typography>
            <Box mt={2} display="flex" flexDirection="row" alignItems="center"> 
                <TextField
                    label="Create new room"
                    variant="outlined"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleCreateRoom} style={{ marginTop: '8px', marginLeft: '10px' }}>
                    Create Room
                </Button>
            </Box>
            <List>
                {rooms.map(room => (
                <ListItem key={room} onClick={() => navigate(`/chat/${room}`)}>
                    {room}
                </ListItem>
                ))}
            </List>
        </Container>
    )
};

export default ChatRoomList;