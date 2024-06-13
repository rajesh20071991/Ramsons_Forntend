import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalTitle,
  ModalHeader,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SetModelId } from "../../redux/actions/modalAction";

const Sweet_Modal = (props) => {
  const dispatch = useDispatch();
  const { show } = props;
  return (
    <>
      <Modal show={show} centered onHide={() => dispatch(SetModelId(0))} >
        <ModalHeader closeButton>
          <ModalTitle style={{ fontSize: "18px" }}>{props.title}</ModalTitle>
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
      </Modal>
    </>
  );
};

export default Sweet_Modal;
