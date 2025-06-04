// src/components/Battles/MessageBox.js
import React, { useEffect, useState } from 'react';
import './MessageBox.scss';

const MessageBox = ({ message, visible }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timeout = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [message, visible]);

  return (
    <div className={`message-box ${show ? 'visible' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default MessageBox;
