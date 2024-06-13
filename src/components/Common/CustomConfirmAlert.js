import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CustomConfirmAlert = ({ title, message, onConfirm, onCancel }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onCancel();
  };

  const handleConfirm = () => {
    setShow(false);
    onConfirm();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomConfirmAlert;
