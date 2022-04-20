import * as yup from 'yup';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';
import { toast as notify } from 'react-toastify';

import useSocket from '../../hooks/useSocket.jsx';
import { hideModal } from '../../slices/modalsSlice.js';
import { selectors } from '../../slices/channelsSlice.js';

function RenameChannel() {
  const { t } = useTranslation();
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
        .required(t('form.feedback.invalid.required'))
        .min(3, t('form.feedback.invalid.minMax', { min: '3', max: '20' }))
        .max(20, t('form.feedback.invalid.minMax', { min: '3', max: '20' }))
        .notOneOf(channels, t('form.feedback.invalid.notOneOf')),
    }),
    onSubmit: async ({ channelname }) => {
      renameChannel({ id: item.id, name: channelname }, ({ status }) => {
        if (status === 'ok') {
          closeModal();
          notify.success(t('notify.success.renameChannel'));
        } else {
          notify.war(t('notify.failed.network'));
        }
      });
    },
  });

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="channelname" visuallyHidden="true">{t('modal.add.input')}</Form.Label>
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
              {t('btn.cancel')}
            </Button>
            <Button type="submit" variant="primary">{t('btn.submit')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannel;
