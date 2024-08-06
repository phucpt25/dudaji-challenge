import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:5001')

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(['123']);

  useEffect(() => {
    socket.on('message', (m) => {
      setMessages((oldMessages) => [...oldMessages, m]);
    })

    return () => {
      socket.off('message');
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessage('');
  }
  return (
    <div className='App'>
      <h1>Dudaji challenge</h1>
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='...'
          value={message}
          onChange={(event) => {setMessage(event.target.value)}}
        />
        <button type="submit">Sent</button>
      </form>
    </div>
   );
}

export default App;
