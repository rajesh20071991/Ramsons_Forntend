import { ModalTypes } from "../action";

export const SetModelId = (id) => (dispatch) => {
  dispatch({ type: ModalTypes.MODEL_ID, payload: id });
};

export const OPEN_MODAL = "OPEN_MODAL";
export const SET_MODAL_DATA = "SET_MODAL_DATA";

export function openModal(modalType) {
  return {
    type: OPEN_MODAL,
    payload: modalType,
  };
}

export function setModalData(modalData) {
  return {
    type: SET_MODAL_DATA,
    payload: modalData,
  };
}
