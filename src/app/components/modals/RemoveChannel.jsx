import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast as notify } from 'react-toastify';

import useSocket from '../../hooks/useSocket.jsx';

import { hideModal } from '../../slices/modalsSlice.js';

function RemoveChannel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useSocket();
  const { show, item } = useSelector((state) => state.modals);

  const closeModal = () => dispatch(hideModal());

  const generateOnRemove = async () => {
    removeChannel(item, ({ status }) => {
      if (status === 'ok') {
        closeModal();
        notify.success(t('notify.success.removeChannel'));
      } else {
        notify.war(t('notify.failed.network'));
      }
    });
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>{t('modal.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.remove.text')}</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary"
            className="me-2"
            onClick={closeModal}
          >
            {t('btn.cancel')}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={generateOnRemove}
          >
            {t('btn.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default RemoveChannel;
