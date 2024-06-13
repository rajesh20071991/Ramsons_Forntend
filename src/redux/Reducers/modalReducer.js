import { ModalTypes } from "../action";

const initialState = { id: 0 };

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ModalTypes.MODEL_ID:
      return { ...state, id: action.payload };
    default:
      return state;
  }
};
export default ModalReducer;
