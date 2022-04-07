import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, Button } from 'react-bootstrap';

function ChannelItem({ channel }) {
  const id = useSelector((state) => state.channels.selectedChannel);

  return (
    <Nav.Item as="li" className="w-100">
      <Button
        type="button"
        variant={channel.id === id ? 'secondary' : 'light'}
        className="rounded-0 w-100 text-start"
      >
        <span className="me-1">#</span>
        { channel.name }
      </Button>
    </Nav.Item>
  );
}

export default ChannelItem;
