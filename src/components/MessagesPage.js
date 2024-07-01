import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MessagesPage.css';  // Ensure you have a CSS file for styling
import { FaEnvelopeOpen, FaPaperPlane } from 'react-icons/fa';  // Import icons

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newNotification, setNewNotification] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get('/messages/');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users/');
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchMessages();
    fetchUsers();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const messageData = {
      sender_username: userData.username,
      sender_email: userData.email,
      content: newMessage,
    };

    try {
      const response = await axios.post('/messages/', messageData);
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="messages-page">
      <h2>Messages</h2>
      <div className="messages-container">
        <div className="send-message-section">
          <h3>Send Message</h3>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="" disabled>Select user to message</option>
            {allUsers.map((user) => (
              <option key={user.email} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage}>
            <FaPaperPlane /> Send
          </button>
        </div>
        <div className="new-messages-section">
          <h3>New Messages</h3>
          {messages.map((message, index) => (
            <div key={index} className="message">
              <strong>{message.sender_username}:</strong> {message.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

