import { Avatar, IconButton } from '@mui/material'; // updated material-ui import
import React, { useEffect, useState } from 'react';
import './Chat.css';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import db from './Firebase';
import { useStateValue } from './StateProvider';

function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      // Get room name
      const roomRef = doc(db, "rooms", roomId);
      onSnapshot(roomRef, (snapshot) => {
        setRoomName(snapshot.data()?.name || "");
      });

      // Get messages
      const messagesRef = collection(db, "rooms", roomId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      onSnapshot(q, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim() || !roomId) return;

  try {
    await addDoc(collection(db, "rooms", roomId, "messages"), {
      message: input,
      name: user?.displayName || "Unknown",
      timestamp: serverTimestamp(),
    });
    setInput('');
  } catch (err) {
    console.error("SendMessage error:", err);
  }
};


  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {messages.length > 0 &&
              new Date(messages[messages.length - 1]?.timestamp?.toDate?.())
                .toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton><SearchIcon /></IconButton>
          <IconButton><AttachFileIcon /></IconButton>
          <IconButton><MoreVertIcon /></IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat_message ${
              message.name === user.displayName && 'chat_receiver'
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {message.timestamp?.toDate
                ? new Date(message.timestamp.toDate()).toUTCString()
                : ""}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <IconButton><InsertEmoticonIcon /></IconButton>
        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit">Send a message</button>
        </form>
        <IconButton><MicIcon /></IconButton>
      </div>
    </div>
  );
}

export default Chat;
