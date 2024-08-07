import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Container, TextField, Button, Typography, List, ListItem, Box } from '@mui/material';
import { BASE_URL } from '../Asset/Enviroment';

const socket = io(BASE_URL);

const ChatRoom = () => {
    const {room} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.emit('joinRoom', room);

        socket.on('existingRoomMessages', (messages) => {
            setMessages(messages);
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        })

        return () => {
            socket.off('existingRoomMessages');
            socket.off('message');
            socket.disconnect();
          };
    }, [room]);

    const handleSendMessage = () => {
        socket.emit('message', {room, message: newMessage});
        setNewMessage('');
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Room name: {room}</Typography>
            <List>
            {messages.map((msg, index) => (
                <ListItem key={index}>
                <Typography variant="body1"><strong>{msg.id}:</strong> {msg.message}</Typography>
                </ListItem>
            ))}
            </List>
            <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                <TextField
                label="Typing here"
                variant="outlined"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                fullWidth
                margin="normal"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                }}
                />
                <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                style={{ marginTop: '8px' }}
                >
                Send
                </Button>
            </Box>
        </Container>
    );
}
export default ChatRoom;