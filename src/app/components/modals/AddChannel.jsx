import * as yup from 'yup';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';

import useSocket from '../../hooks/useSocket.jsx';

import { hideModal } from '../../slices/modalsSlice.js';
import { selectors, setCurrentChannel } from '../../slices/channelsSlice.js';

function AddChannel() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { newChannel } = useSocket();
  const channels = useSelector(selectors.selectAll).map(({ name }) => name);
  const { show } = useSelector((state) => state.modals);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const moveToChannel = (id) => dispatch(setCurrentChannel(id));

  const closeModal = () => dispatch(hideModal());

  const formik = useFormik({
    initialValues: {
      channelname: '',
    },
    validationSchema: yup.object({
      channelname: yup.string().trim()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(channels, 'Канал с таким именем уже существует'),
    }),
    onSubmit: async ({ channelname }) => {
      const channel = {
        name: channelname,
        removable: true,
      };
      newChannel(channel, ({ status, data }) => {
        if (status === 'ok') {
          moveToChannel(data.id);
          closeModal();
        }
      });
    },
  });

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="channelname" visuallyHidden="true">Имя канала</Form.Label>
            <Form.Control
              type="text"
              id="channelname"
              name="channelname"
              ref={inputRef}
              value={formik.values.channelname}
              onChange={formik.handleChange}
              isInvalid={formik.errors.channelname}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.channelname}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              variant="secondary"
              className="me-2"
              onClick={closeModal}
            >
              Отменить
            </Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannel;
