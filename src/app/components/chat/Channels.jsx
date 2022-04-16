import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Nav } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { selectors } from '../../slices/channelsSlice.js';
import { showModal } from '../../slices/modalsSlice.js';

import ChannelItem from './ChannelItem.jsx';

function Channels() {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);

  const openModal = () => dispatch(showModal({ type: 'addChannel' }));

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button
          type="button"
          size="sm"
          variant="outline-primary"
          className="p-0"
          onClick={openModal}
        >
          <BsPlus size={20} />
        </Button>
      </div>
      <Nav as="ul" fill variant="pills" className="flex-column px-2">
        { channels && channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
          />
        )) }
      </Nav>
    </Col>
  );
}

export default Channels;
