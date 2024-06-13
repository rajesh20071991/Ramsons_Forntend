import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { Data_ProcessTypes } from "../action";

var endpoint_vehicle = "/api/entry_vehicle/";
export const GetVehicleProcessData = (request) => (dispatch) => {
  var url =
    endpoint_vehicle +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Data_ProcessTypes.Vehicle_Entry, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

var endpoint_inward = "/api/inward_data/";
export const GetInwardProcessData = (request) => (dispatch) => {
  var url =
    endpoint_inward +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Data_ProcessTypes.Inward_Process, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

var endpoint_failed = "/tracking_process/failed_challan/";
export const GetFailedProcessData = (user, name, id) => (dispatch) => {
  if (user === undefined) {
    endpoint_failed += localStorage.getItem("username");
  } else {
    endpoint_failed += user;
  }
  api({ api: endpoint_failed })
    .then((data) => {
      dispatch({ type: Data_ProcessTypes.Failed_Challan, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

var endpoint_production = "/api/production_data/";
export const GetProductProcessData = (request) => (dispatch) => {
  var url =
    endpoint_production +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Data_ProcessTypes.Production_Process, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

var endpoint_slitprocess = "/api/slit_data/";
export const GetSlitProcessData = (request) => (dispatch) => {
  var url =
    endpoint_slitprocess +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Data_ProcessTypes.Slitting_Process, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

var endpoint_dispatch = "/api/jobwork_dispatch/";
export const GetdispatchProcessData = (request) => (dispatch) => {
  var url =
    endpoint_dispatch +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Data_ProcessTypes.Dispatch_Process, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

var endpoint_booking = "/tracking_process/booking /";
export const GetbookingProcessData = (user, name, id) => (dispatch) => {
  if (user === undefined) {
    endpoint_booking += localStorage.getItem("username");
  } else {
    endpoint_booking += user;
  }
  api({ api: endpoint_booking })
    .then((data) => {
      dispatch({ type: Data_ProcessTypes.Booking_Process, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

var endpoint_salesprocess = "/tracking_process/sales_dispatch/";
export const GetsalesProcessData = (user) => (dispatch) => {
  if (user === undefined) {
    endpoint_salesprocess += localStorage.getItem("username");
  } else {
    endpoint_salesprocess += user;
  }
  api({ api: endpoint_salesprocess })
    .then((data) => {
      dispatch({ type: Data_ProcessTypes.Sales_DispatchP, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
