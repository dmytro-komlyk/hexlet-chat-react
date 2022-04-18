import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';

import { showModal } from '../../slices/modalsSlice.js';
import { setCurrentChannel } from '../../slices/channelsSlice.js';

function ChannelItem({ channel }) {
  const dispatch = useDispatch();
  const selectedChannelId = useSelector((state) => state.channels.selectedChannel);

  const handleRemoveChannel = () => {
    dispatch(showModal({ type: 'removeChannel', item: channel }));
  };

  const handleRenameChannel = () => {
    dispatch(showModal({ type: 'renameChannel', item: channel }));
  };

  const handleChangeChannel = () => {
    dispatch(setCurrentChannel(channel.id));
  };

  const renderButton = () => (
    <Button
      type="button"
      variant={channel.id === selectedChannelId ? 'secondary' : 'light'}
      className="w-100 text-start text-truncate"
      onClick={handleChangeChannel}
    >
      <span className="me-1">#</span>
      { channel.name }
    </Button>
  );

  return (
    <Nav.Item as="li" className="w-100">
      { channel.removable
        ? (
          <Dropdown className="w-100" as={ButtonGroup}>
            { renderButton() }
            <Dropdown.Toggle
              split
              variant={channel.id === selectedChannelId ? 'secondary' : 'light'}
              id="dropdown-split-basic"
            />
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={handleRemoveChannel}
              >
                Удалить
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleRenameChannel}
              >
                Переименовать
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : renderButton()}
    </Nav.Item>
  );
}

export default ChannelItem;
