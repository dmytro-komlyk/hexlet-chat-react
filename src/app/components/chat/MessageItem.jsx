import React from 'react';
import filter from 'leo-profanity';

function MessageItem({ message }) {
  const { username, value } = message;
  const cleanedValue = filter.clean(value);

  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      :
      {' '}
      {cleanedValue}
    </div>
  );
}

export default MessageItem;
