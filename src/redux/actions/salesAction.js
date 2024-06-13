import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { SalesTypes } from "../action";

const endpoint_SalesData = "/api/coil_assign/";
export const GetSalesData = (request) => (dispatch) => {
  var url =
    endpoint_SalesData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SalesTypes.Sales_data, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_PipeData = "/api/pipeorder/";
export const GetPipeData = (request) => (dispatch) => {
  var url =
    endpoint_PipeData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SalesTypes.pipeorderdata, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetPipeAssignviewData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SalesTypes.PipeAssignviewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetCoilAssignviewData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SalesTypes.CoilAssignviewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_OrderSalesData = "/api/order/";
export const GetOrderSalesData = (request) => (dispatch) => {
  var url =
    endpoint_OrderSalesData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SalesTypes.SalesData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

// const endpoint_DispatchSummaryData = "/get_salesdispatch/";
// export const GetDispatchSumamryData = (request) => (dispatch) => {
//   var url =
//     endpoint_DispatchSummaryData +
//     GenrateQuery({
//       filter: request.filter,
//     });
//   api({ api: url })
//     .then((data) => {
//       dispatch({ type: SalesTypes.DispatchSummary, payload: data });
//     })
//     .catch(({ message }) => {
//       console.log(message);
//     });
// };

// export const GetDispatchSumamryData = (endpoint) => (dispatch) => {
//   api({ api: endpoint })
//     .then((data) => {
//       dispatch({ type: SalesTypes.DispatchSummary, payload: data });
//     })
//     .catch(({ message }) => {
//       console.log(message);
//     });
// };

const endpoint_Retantion = "/api/rentation/";
export const GetRetantionData = (request) => (dispatch) => {
  var url =
    endpoint_Retantion +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SalesTypes.RetantionData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_SummarySalesteam = "/api/salesteam/";
export const GetSummarySalesTeamData = (request) => (dispatch) => {
  var url =
    endpoint_SummarySalesteam +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SalesTypes.summarysalesTeam, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_Retant = "/api/rentat/";
export const GetRetantData = (request) => (dispatch) => {
  var url =
    endpoint_Retant +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SalesTypes.RetantData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetBookingviewData = (endpoint) => (dispatch) => {
  // const dispatch = useDispatch();
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SalesTypes.BookingviewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_BookingData = "/api/booking/";
export const GetBookingData = (request) => (dispatch) => {
  var url =
    endpoint_BookingData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: SalesTypes.BookingData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetOrderviewData = (endpoint) => (dispatch) => {
  // const dispatch = useDispatch();
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SalesTypes.OrderviewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetOrderData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SalesTypes.OrderData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetCoilAssignData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SalesTypes.coil_assign, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetPipeAssignData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: SalesTypes.pipe_assign, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
