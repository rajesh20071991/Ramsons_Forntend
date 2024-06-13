import { SalesTypes } from "../action";

let initialState = {
  orders: {},
};

const SalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SalesTypes.SalesData:
      return { ...state, data: action.payload };
    case SalesTypes.Sales_data:
      return { ...state, data_coil: action.payload };
    case SalesTypes.BookingviewData:
      return { ...state, Bookingview_Data: action.payload };
    case SalesTypes.BookingData:
      return { ...state, bo_data: action.payload };
    case SalesTypes.OrderviewData:
      return { ...state, orderview_data: action.payload };
    case SalesTypes.OrderData:
      return { ...state, order_data: action.payload };
    case SalesTypes.coil_assign:
      return { ...state, coil_assign_Data: action.payload };
    case SalesTypes.pipeorderdata:
      return { ...state, Pipe_Order_Data: action.payload };
    case SalesTypes.PipeAssignviewData:
      return { ...state, PipeAssign_Data: action.payload };
    case SalesTypes.CoilAssignviewData:
      return { ...state, CoilAssign_Data: action.payload };
    case SalesTypes.RetantionData:
      return { ...state, retantionsdata: action.payload };
    case SalesTypes.RetantData:
      return { ...state, retantsdata: action.payload };
    case SalesTypes.DispatchSummary:
      return { ...state, dispatchsSummary: action.payload };
    case SalesTypes.pipe_assign:
      return { ...state, Pipeassign: action.payload };
    case SalesTypes.summarysalesTeam:
      return { ...state, SummarySales_Team: action.payload };
    default:
      return state;
  }
};
export default SalesReducer;
