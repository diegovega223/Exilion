import React, { useEffect, useState } from 'react';

const MessageBox = ({ message, visible }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible && message) {
      setShow(true);
      const timeout = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timeout);
    } else {
      setShow(false);
    }
  }, [message, visible]);

  if (!show || !message) return null;

  return (
    <div className="message-box visible">
      <p>{message}</p>
    </div>
  );
};

export default MessageBox;