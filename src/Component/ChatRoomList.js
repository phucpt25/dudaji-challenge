import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        <div>
            <h1>Dudaji Challenge ChatRoom</h1>
            <div>
                <input
                 type='text'
                 placeholder='Create your own new'
                 value={newRoom}
                 onChange={(e) => setNewRoom(e.target.value)}
                />
                <button onClick={handleCreateRoom}>Create</button>
            </div>
            <ul>
                {rooms.map((room) => (
                    <li key={room} onClick={() => navigate(`/chat/${room}`)}>
                        {room}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default ChatRoomList;