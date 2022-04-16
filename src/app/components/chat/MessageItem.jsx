import React from 'react';

function MessageItem({ message }) {
  return (
    <div className="text-break mb-2">
      <b>{message.username}</b>
      :
      {' '}
      {message.value}
    </div>
  );
}

export default MessageItem;
