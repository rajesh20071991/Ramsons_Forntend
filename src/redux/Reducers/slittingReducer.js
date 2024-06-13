import { SlittingTypes } from "../action";

let initialState = {};

const SlittingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SlittingTypes.slittingData:
      return { ...state, slit_data: action.payload };
    case SlittingTypes.slittedData:
      return { ...state, slitted_data: action.payload };
    case SlittingTypes.slittedData1:
      return { ...state, slitted_v_data1: action.payload };
    case SlittingTypes.slittedData2:
      return { ...state, slitted_data2: action.payload };
    case SlittingTypes.slittedMoveData:
      return { ...state, slittMove_data: action.payload };
    case SlittingTypes.otherdata:
      return { ...state, other_data: action.payload };
    case SlittingTypes.slitingData:
        return { ...state, Sliting_Data: action.payload };
    default:
      return state;
  }
};
export default SlittingReducer;
