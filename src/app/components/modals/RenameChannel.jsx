import * as yup from 'yup';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';

import useSocket from '../../hooks/useSocket.jsx';
import { hideModal } from '../../slices/modalsSlice.js';
import { selectors } from '../../slices/channelsSlice.js';

function RenameChannel() {
  const dispatch = useDispatch();
  const { renameChannel } = useSocket();
  const inputRef = useRef();
  const { show, item } = useSelector((state) => state.modals);
  const channels = useSelector(selectors.selectAll).map(({ name }) => name);

  const closeModal = () => dispatch(hideModal());

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelname: item.name,
    },
    validationSchema: yup.object({
      channelname: yup.string().trim()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(channels, 'Канал с таким именем уже существует'),
    }),
    onSubmit: async ({ channelname }) => {
      renameChannel({ id: item.id, name: channelname }, ({ status }) => {
        if (status === 'ok') {
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

export default RenameChannel;
