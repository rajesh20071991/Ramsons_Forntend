import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { DispatchTypes } from "../action";

const endpoint_dispatch = "/api/coil_dispatch/";
export const GetCoilDispatchData = (request) => (dispatch) => {
  var url =
    endpoint_dispatch +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&type=Coil";
  api({ api: url })
    .then((data) => {
      dispatch({ type: DispatchTypes.coil_dispatch, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_pipedatadispatch = "/api/coil_dispatch/";
export const GetPipeDatDispatch = (request) => (dispatch) => {
  var url =
    endpoint_pipedatadispatch +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&type=Pipe";
  api({ api: url })
    .then((data) => {
      dispatch({ type: DispatchTypes.pipe_dis_dispatch, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_pipesdatadispatch = "/api/dispatch_r/";
export const GetPipesDatDispatch = (request) => (dispatch) => {
  var url =
    endpoint_pipesdatadispatch +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: DispatchTypes.pipedispatch, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_salescoildatadispatch = "/api/coil_dispatch/";
export const GetSalesCoilDispatch = (request) => (dispatch) => {
  var url =
    endpoint_salescoildatadispatch +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&type=Sales Coil";
  api({ api: url })
    .then((data) => {
      dispatch({ type: DispatchTypes.coil_dis_dispatch, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_scrapdatadispatch = "/api/coil_dispatch/";
export const GetScrapDatDispatch = (request) => (dispatch) => {
  var url =
    endpoint_scrapdatadispatch +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&type=Other";
  api({ api: url })
    .then((data) => {
      dispatch({ type: DispatchTypes.coil_dispatch, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
const endpoint_scrap_datadispatch = "/api/coil_dispatch/";
export const GetScrap_DatDispatch = (request) => (dispatch) => {
  var url =
    endpoint_scrap_datadispatch +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&type=Scrap";
  console.log(url);
  api({ api: url })
    .then((data) => {
      console.log("ddd", data);
      dispatch({ type: DispatchTypes.coil_dispatch, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_pipestock = "/api/stock/";
export const GetPipeStockData = (request) => (dispatch) => {
  var url =
    endpoint_pipestock +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&stock=Ramsons Stainless";
  api({ api: url })
    .then((data) => {
      dispatch({ type: DispatchTypes.pipe_stock, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_durostock = "/api/stock/";
export const GetDuromStockData = (request) => (dispatch) => {
  var url =
    endpoint_durostock +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&stock=Duromax";
  api({ api: url })
    .then((data) => {
      dispatch({ type: DispatchTypes.duromax_stock, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_withstock = "/api/stock/";
export const GetwithStockData = (request) => (dispatch) => {
  var url =
    endpoint_withstock +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&stock=Without Stamp";
  api({ api: url })
    .then((data) => {
      dispatch({ type: DispatchTypes.without_stock, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
