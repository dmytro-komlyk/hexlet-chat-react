import React from 'react';
import useMultiLanguage from '../../hooks/useMultiLanguage.jsx';

function MessageItem({ message }) {
  const { isProfanity, clean } = useMultiLanguage();
  const { username, value } = message;
  const cleanedValue = isProfanity(value) ? clean(value) : value;

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
