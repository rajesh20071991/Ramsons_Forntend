import { Data_ProcessTypes } from "../action";

let initialState = {};

const DataProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case Data_ProcessTypes.Vehicle_Entry:
      return { ...state, vehicleProcess_data: action.payload };
    case Data_ProcessTypes.Inward_Process:
      return { ...state, inwardProcess_data: action.payload };
    case Data_ProcessTypes.Failed_Challan:
      return { ...state, failedProcess_data: action.payload };
    case Data_ProcessTypes.Production_Process:
      return { ...state, procductionProcess_data: action.payload };
    case Data_ProcessTypes.Slitting_Process:
      return { ...state, slittingProcess_data: action.payload };
    case Data_ProcessTypes.Dispatch_Process:
      return { ...state, dispatchProcess_data: action.payload };
    case Data_ProcessTypes.Booking_Process:
      return { ...state, bookingProcess_data: action.payload };
    case Data_ProcessTypes.Sales_DispatchP:
      return { ...state, salesProcess_data: action.payload };
    default:
      return state;
  }
};
export default DataProcessReducer;
