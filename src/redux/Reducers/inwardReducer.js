import { InwardTypes } from "../action";

let initialState = {};

const InwardReducer = (state = initialState, action) => {
  switch (action.type) {
    case InwardTypes.VEHICLE_DATA:
      return { ...state, vehicle_data: action.payload };
    case InwardTypes.MOTHER_COIL_DATA:
      return { ...state, mother_coil_data: action.payload };
    case InwardTypes.SLITTED_COIL_DATA:
      return { ...state, slitted_coil_data: action.payload };
    case InwardTypes.IND_SCRAP_DATA:
      return { ...state, inward_scrap_data: action.payload };
    case InwardTypes.IND_POLISH_DATA:
      return { ...state, inward_polish_data: action.payload };
    case InwardTypes.IND_NON_POLISH_DATA:
      return { ...state, inward_non_polish_data: action.payload };
    case InwardTypes.MOTHER_COIL_FILTER:
      return { ...state, filter_inward: action.payload };
    case InwardTypes.TEST_CERTI_DATA:
      return { ...state, testcertificate: action.payload };
    default:
      return state;
  }
};
export default InwardReducer;
