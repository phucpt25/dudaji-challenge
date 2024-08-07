import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ChatRoomList from './Component/ChatRoomList';
import ChatRoom from './Component/ChatRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={ChatRoomList}></Route>
        <Route path="/chat/:room" Component={ChatRoom}></Route>
      </Routes>
    </Router>
   );
}

export default App;
