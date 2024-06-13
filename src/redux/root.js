import { combineReducers } from "redux";
import auth from "./Reducers/authReducer";
import InwardReducer from "./Reducers/inwardReducer";
import DispatchReducer from "./Reducers/dispatchReducer";
import SalesReducer from "./Reducers/salesReducer";
import PipeReducer from "./Reducers/pipeReducer";
import PlanningReducer from "./Reducers/planningReducer";
import SlittingReducer from "./Reducers/slittingReducer";
import DataProcessReducer from "./Reducers/data_Process_Reducer";
import CompanyReducer from "./Reducers/CompanyReducer";
import challanReducer from "./Reducers/ChallanReducer";
import AccountReducer from "./Reducers/accountReducer";
import ModalReducer from "./Reducers/modalReducer";
import StoreReducer from "./Reducers/storeReducer";

const rootReducer = combineReducers({
  authData: auth,
  inwardData: InwardReducer,
  DispatchData: DispatchReducer,
  SalesData: SalesReducer,
  PipeData: PipeReducer,
  PlanningData: PlanningReducer,
  SlittingData: SlittingReducer,
  DataProcessData: DataProcessReducer,
  CompanyData: CompanyReducer,
  ChallanData: challanReducer,
  account: AccountReducer,
  store: StoreReducer,
  model: ModalReducer,
});

export default rootReducer;
