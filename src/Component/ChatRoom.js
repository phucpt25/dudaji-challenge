import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Container, TextField, Button, Typography, List, ListItem, Box, IconButton } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker  from 'emoji-picker-react';
import { BASE_URL } from '../Asset/Enviroment';

const socket = io(BASE_URL,{ 
    transports: ['websocket'], 
    withCredentials: true 
});

const ChatRoom = () => {
    const {room} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    socket.emit('joinRoom', room);

    socket.on('existingRoomMessages', (messages) => {
        setMessages(messages);
    });

    socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    })
    
    useEffect(() => {
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


    const handleShowEmojiPicker = (emojiObject, event) => {
        setNewMessage(prevData => prevData + emojiObject.emoji);
        setShowEmojiPicker(false);
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
            <Box mt={2} display="flex" flexDirection="row" alignItems="center">    

                {/* Emoji Picker  */}
                <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <EmojiEmotionsIcon />
                </IconButton>
                {showEmojiPicker && (
                    <EmojiPicker  onEmojiClick={handleShowEmojiPicker} />
                )}
                {/* END Emoji Picker  */}

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
                style={{ marginTop: '8px', marginLeft: '10px' }}
                >
                Send
                </Button>
            </Box>
        </Container>
    );
}
export default ChatRoom;