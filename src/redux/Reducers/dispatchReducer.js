import { DispatchTypes } from "../action";

let initialState = {};

const DispatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case DispatchTypes.coil_dispatch:
      return { ...state, Coil_data: action.payload };
    case DispatchTypes.pipe_dis_dispatch:
      return { ...state, Pipe_Sales: action.payload };
    case DispatchTypes.coil_dis_dispatch:
      return { ...state, Coil_sales_dispatch: action.payload };
    case DispatchTypes.entity_coil:
      return { ...state, Entitycoil_Data: action.payload };
    case DispatchTypes.vehicle_type:
      return { ...state, Vehicletype_Data: action.payload };
    case DispatchTypes.pipe_dispatch:
      return { ...state, Pipe_Data: action.payload };
    case DispatchTypes.scrap_dispatch:
      return { ...state, scrap_data: action.payload };
    case DispatchTypes.sales_scrap_dispatch:
      return { ...state, sales_scrap: action.payload };
    case DispatchTypes.coil_extra:
      return { ...state, Coil_extra_data: action.payload };
    case DispatchTypes.coil_sales:
      return { ...state, coilsales_data: action.payload };
    case DispatchTypes.pipe_stock:
      return { ...state, pipestock: action.payload };
    case DispatchTypes.without_stock:
      return { ...state, withoutstock: action.payload };
    case DispatchTypes.duromax_stock:
      return { ...state, duromaxstock: action.payload };
    case DispatchTypes.pipedispatch:
      return { ...state, PiepsDispatch: action.payload };
    default:
      return state;
  }
};
export default DispatchReducer;
