import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
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
        }

    }, [room]);

    const handleSendMessage = () => {
        socket.emit('message', {room, message: newMessage});
        setNewMessage('');
    }

    return (
        <div>
            <h1>Room name: {room}</h1>
            <div>
                {messages.map((m, index) => (
                    <div key={index}>
                        <strong>{m.id}: </strong>{m.message}
                    </div>
                ))}
            </div>
            <input
                type='text'
                placeholder='...'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}
export default ChatRoom;