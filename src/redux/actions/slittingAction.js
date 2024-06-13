import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { SlittingTypes } from "../action";

export const GetSlittingData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SlittingTypes.slittingData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const sliitedcoil_endpoint = "/api/slitted_coil/";
export const GetSlittedData = (request) => (dispatch) => {
  var url =
    sliitedcoil_endpoint +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SlittingTypes.slittedData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetSlittedData1 = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SlittingTypes.slittedData1, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetSlittedData2 = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SlittingTypes.slittedData2, payload: data.results });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetSlittMoveData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SlittingTypes.slittedMoveData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_scrapdata = "/api/otherdata/";
export const GetOtherData = (request) => (dispatch) => {
  var url =
    endpoint_scrapdata +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SlittingTypes.otherdata, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_jobscrap = "/api/otherjobwork/";
export const Getjobworkscrap = (request) => (dispatch) => {
  var url =
    endpoint_jobscrap +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SlittingTypes.otherdata, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const slitt_endpoint = "/api/slitting/";
export const GetSlitViewData = (request) => (dispatch) => {
  var url =
    slitt_endpoint +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SlittingTypes.slitingData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const slitting_endpoint = "/api/slitting/";
export const GetSlittingViewData = (request) => (dispatch) => {
  var url =
    slitting_endpoint +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SlittingTypes.slitingData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
