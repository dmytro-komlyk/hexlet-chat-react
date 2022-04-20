import React from 'react';
import { filter } from '../../contexts/i18nContext.jsx';

function MessageItem({ message }) {
  const { username, value } = message;
  const cleanedValue = filter.check(value) ? filter.clean(value) : value;

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
