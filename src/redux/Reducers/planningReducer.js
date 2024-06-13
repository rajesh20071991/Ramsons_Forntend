import { PlanningTypes } from "../action";

let initialState = {};

const PlanningReducer = (state = initialState, action) => {
  switch (action.type) {
    case PlanningTypes.PlanningCoil:
      return { ...state, Plan_Coil_Data: action.payload };
    case PlanningTypes.Planning_ViewCoil:
      return { ...state, plan_viewcoil: action.payload };
    case PlanningTypes.PlanningPipe:
      return { ...state, plan_pipe_data: action.payload };
    case PlanningTypes.PlanningView_Pipe:
      return { ...state, plan_pipeview_data: action.payload };
    case PlanningTypes.PolishPlan_Pipe:
      return { ...state, polishlist_plan: action.payload };
    case PlanningTypes.Planningstatus_Pipe:
      return { ...state, PlanStatus_Pipe: action.payload };
    default:
      return state;
  }
};
export default PlanningReducer;
