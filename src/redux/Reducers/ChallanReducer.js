import { ChallanTypes } from "../action";

let initialState = {};

const challanReducer = (state = initialState, action) => {
  switch (action.type) {
    case ChallanTypes.SourceData:
      return { ...state, source_view: action.payload };
    case ChallanTypes.GoodData:
      return { ...state, good_view: action.payload };
    case ChallanTypes.ChalanData:
      return { ...state, chalan_view: action.payload };
    case ChallanTypes.ChallanlistData:
      return { ...state, chalanlist_view: action.payload };
    case ChallanTypes.chalansviewdata:
      return { ...state, chalanslist_view: action.payload };
    case ChallanTypes.chalanviewdata:
      return { ...state, chalandata_view: action.payload };
    default:
      return state;
  }
};
export default challanReducer;
