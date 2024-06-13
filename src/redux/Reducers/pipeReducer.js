import { PipeTypes } from "../action";

let initialState = {};

const PipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case PipeTypes.PipeData:
      return { ...state, data: action.payload };
    case PipeTypes.InprocessData:
      return { ...state, in_data: action.payload };
    case PipeTypes.TubemillData:
      return { ...state, tub_data: action.payload };
    case PipeTypes.TubemoveData:
      return { ...state, tubm_data: action.payload };
    case PipeTypes.PolishInsData:
      return { ...state, pol_data: action.payload };
    case PipeTypes.PolishData:
      return { ...state, polm_data: action.payload };
    case PipeTypes.TubeData:
      return { ...state, tubeshift_data: action.payload };
    case PipeTypes.shiftdata:
      return { ...state, shift_data: action.payload };
    case PipeTypes.PolishInspData:
      return { ...state, Polish_Insp_Data: action.payload };
    case PipeTypes.ScrapData:
      return { ...state, scrap_data: action.payload };
    case PipeTypes.ShortData:
      return { ...state, short_length: action.payload };
    case PipeTypes.HoleData:
      return { ...state, hole_pipe: action.payload };
    case PipeTypes.TubemillShiftViewData:
      return { ...state, TubemillShift_Data: action.payload };
    case PipeTypes.TubemillVerifyViewData:
      return { ...state, TubemillVerify_Data: action.payload };
    case PipeTypes.MovementVerifyViewData:
      return { ...state, MovementVerify_Data: action.payload };
    case PipeTypes.PolishVerifyViewData:
      return { ...state, PolishVerify_Data: action.payload };
    default:
      return state;
  }
};
export default PipeReducer;
