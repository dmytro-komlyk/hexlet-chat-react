import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Col, Form, Button, InputGroup, FormControl,
} from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';

import { selectors as selectorsMessages } from '../../slices/messagesSlice.js';
import { selectors as selectorsChannel } from '../../slices/channelsSlice.js';

import MessageItem from './MessageItem.jsx';

function Messages() {
  const selectedChannel = useSelector((state) => {
    const id = state.channels.selectedChannel;
    return selectorsChannel.selectById(state, id);
  });
  const messages = useSelector((state) => {
    const data = selectorsMessages.selectAll(state);
    return data.filter((message) => message.id === selectedChannel.id);
  });

  return (
    <Col className="h-100 p-0">
      <div className="d-flex flex-column h-100">
        <div className="mb-4 p-3 shadow-sm small bg-light">
          <p className="m-0">
            <b>
              #
              { selectedChannel && selectedChannel.name }
            </b>
          </p>
          <span className="text-muted">
            { messages.length }
          </span>
        </div>
        <div id="messages-box" className="overflow-auto px-5">
          { messages && messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            onSubmit={console.log}
            initialValues={{
              newmessage: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
            }) => (
              <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
                <InputGroup>
                  <FormControl
                    className="border-0 p-0 ps-2"
                    type="text"
                    id="newmessage"
                    name="newmessage"
                    placeholder="Введите сообщение..."
                    onChange={handleChange}
                    value={values.newmessage}
                  />
                  <Button
                    className="d-flex py-1"
                    type="submit"
                    variant="tranparent"
                    size="lg"
                    disabled={!values.newmessage}
                  >
                    <BsArrowRightSquare size={20} />
                  </Button>
                </InputGroup>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Col>
  );
}

export default Messages;
