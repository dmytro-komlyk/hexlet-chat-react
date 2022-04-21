import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  Col, Form, Button, InputGroup, FormControl,
} from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';

import { selectors as selectorsMessages } from '../../slices/messagesSlice.js';
import { selectors as selectorsChannel } from '../../slices/channelsSlice.js';

import useAuth from '../../hooks/useAuth.jsx';
import useSocket from '../../hooks/useSocket.jsx';

import MessageItem from './MessageItem.jsx';

function Messages() {
  const { t } = useTranslation();
  const { loggedIn } = useAuth();
  const { newMessage } = useSocket();
  const inputRef = useRef();

  const [isSubmiting, setSubmiting] = useState(false);

  const selectedChannel = useSelector((state) => {
    const id = state.channels.selectedChannel;
    const currentChannel = selectorsChannel.selectById(state, id);
    return currentChannel;
  });

  const messages = useSelector((state) => {
    const data = selectorsMessages.selectAll(state);
    const id = state.channels.selectedChannel;
    const currentMessages = data.filter((message) => message.channelId === id);
    return currentMessages;
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      setSubmiting(true);
      const msg = {
        channelId: selectedChannel.id,
        username: loggedIn.username,
        value: values.message,
      };
      newMessage(msg, ({ status }) => {
        if (status === 'ok') {
          resetForm();
          setSubmiting(false);
        }
      });
    },
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
          <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup>
              <FormControl
                className="border-0 p-0 ps-2"
                type="text"
                id="message"
                name="message"
                aria-label={t('form.message.label')}
                placeholder={t('form.message.input')}
                ref={inputRef}
                onChange={formik.handleChange}
                value={formik.values.message}
              />
              <Button
                className="d-flex py-1"
                type="submit"
                variant="tranparent"
                size="lg"
                disabled={formik.values.text === '' || isSubmiting}
              >
                <BsArrowRightSquare size={20} />
                <span className="visually-hidden">{t('btn.submit')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
}

export default Messages;
