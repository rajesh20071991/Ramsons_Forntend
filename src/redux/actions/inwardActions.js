import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { InwardTypes } from "../action";

const endpoint_vehicledata = "/api/store/";
export const GetVehicleData = (request) => (dispatch) => {
  var url =
    endpoint_vehicledata +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.VEHICLE_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_mothercoil = "/api/storecoil/";
export const GetMotherCoilData = (request) => (dispatch) => {
  var url =
    endpoint_mothercoil +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.MOTHER_COIL_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_inwardcoil =
  "/api/storecoil/?entity_type=Coil&job_type=Job Work";
export const GetInwardCoilData = (request) => (dispatch) => {
  var url =
    endpoint_inwardcoil +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.MOTHER_COIL_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_testcerti = "/api/tc_data/";
export const GettestcertiData = (request) => (dispatch) => {
  var url =
    endpoint_testcerti +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.TEST_CERTI_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_mothercoilS = "/api/storecoil/?job_type=Job Work&status=Slitted";
export const GetMotherCoilDataS = (request) => (dispatch) => {
  var url =
    endpoint_mothercoilS +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.MOTHER_COIL_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_mothercoilV = "/api/storecoil/?status=Planning";
export const GetMotherCoilDataV = (request) => (dispatch) => {
  var url =
    endpoint_mothercoilV +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.MOTHER_COIL_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_mothercoilW = "/api/coildispatch/";
export const GetMotherCoilDataW = (request) => (dispatch) => {
  var url =
    endpoint_mothercoilW +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.MOTHER_COIL_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_slittedcoildata = "/api/storeslit/";
export const GetSlittedCoilData = (request) => async (dispatch) => {
  try {
    const url =
      endpoint_slittedcoildata +
      GenrateQuery({
        page: request.page,
        size: request.size,
        filter: request.filter,
      });
    const data = await api({ api: url });
    console.log(data);
    dispatch({ type: InwardTypes.SLITTED_COIL_DATA, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const GetIndScrapData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: InwardTypes.IND_SCRAP_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_inpolishdata = "/api/store_polish/";
export const GetIndPolishData = (request) => (dispatch) => {
  var url =
    endpoint_inpolishdata +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  url += "&pipe_type=Polish";
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.IND_POLISH_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_innonpolish = "/api/store_pipe/";
export const GetIndNonPolishData = (request) => (dispatch) => {
  var url =
    endpoint_innonpolish +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.IND_NON_POLISH_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_inwarddata = "/api/company/";
export const GetInwardData = (request) => (dispatch) => {
  var url =
    endpoint_inwarddata +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.VEHICLE_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_inwarddara1 = "/api/store_coil/";
export const GetInwardData1 = (request) => (dispatch) => {
  var url =
    endpoint_inwarddara1 +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.MOTHER_COIL_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_inplanpolish =
  "/api/store_pipe/?weight_status=true&status=Instock";
export const GetIndPlanPolishData = (request) => (dispatch) => {
  var url =
    endpoint_inplanpolish +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: InwardTypes.IND_NON_POLISH_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetFilterInward = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: InwardTypes.MOTHER_COIL_FILTER, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
