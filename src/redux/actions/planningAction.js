import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { PlanningTypes } from "../action";

const endpoint_plancoil = "/api/planningcoilview/";
export const GetPlanCoilData = (request) => (dispatch) => {
  var url =
    endpoint_plancoil +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PlanningTypes.Planning_ViewCoil, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_planpipe = "/api/planningpipedata/";
export const GetPlanPipeData = (request) => (dispatch) => {
  var url =
    endpoint_planpipe +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PlanningTypes.PlanningView_Pipe, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_planstatus = "/api/planningview/";
export const GetPlanStatusData = (request) => (dispatch) => {
  var url =
    endpoint_planstatus +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PlanningTypes.Planningstatus_Pipe, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_slittcoil = "/api/planning/";
export const GetSlitCoilData = (request) => (dispatch) => {
  var url =
    endpoint_slittcoil +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&planning_status=Slitting";
  api({ api: url })
    .then((data) => {
      dispatch({ type: PlanningTypes.Planning_ViewCoil, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_produpipe = "/api/planning/?plan_status=Pipe";
export const GetProdPipeData = (request) => (dispatch) => {
  var url =
    endpoint_produpipe +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PlanningTypes.PlanningView_Pipe, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_polishpipe = "/api/planningPolish/";
export const GetpolishPipeData = (request) => (dispatch) => {
  var url =
    endpoint_polishpipe +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PlanningTypes.PolishPlan_Pipe, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetPlan_CoilData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: PlanningTypes.PlanningCoil, payload: data.results });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetPlan_PipeData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: PlanningTypes.PlanningPipe, payload: data.results });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
