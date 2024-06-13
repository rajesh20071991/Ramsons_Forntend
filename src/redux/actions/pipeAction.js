import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { PipeTypes } from "../action";

const endpoint_PipeData = "/api/first_observation/";
export const GetPipeData = (page, page_size, id) => (dispatch) => {
  var url = endpoint_PipeData + "?page=" + page + "&page_size=" + page_size;
  if (id !== "") {
    url += "&plan_id__plan_no=" + id;
  }
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.PipeData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_InprocessData = "/api/inprocess/";
export const GetInprocessData = (page, page_size, name, id) => (dispatch) => {
  var url =
    endpoint_InprocessData + "?page=" + page + "&page_size=" + page_size;
  if (id !== "") {
    url += "&id=" + id;
  }
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.InprocessData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_tubeData = "/api/planningdatapipe/?plan_status=Pipe";
export const GetTubeData = (page, page_size, name, id) => (dispatch) => {
  var url = endpoint_tubeData + "&page=" + page + "&page_size=" + page_size;
  if (id !== "") {
    url += "&id=" + id;
  }
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.TubeData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_tube = "/api/tubeshiftdata/";
export const GetTube = (request) => (dispatch) => {
  var url =
    endpoint_tube +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.TubeData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetshiftData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: PipeTypes.shiftdata, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_tubemillPipeData = "/api/tubemill/";
export const GettubemillPipeData = (request) => (dispatch) => {
  var url =
    endpoint_tubemillPipeData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.TubemillData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_tubemillShiftData = "/api/tubemillsView/";
export const GettubemillShiftData = (request) => (dispatch) => {
  var url =
    endpoint_tubemillShiftData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.TubemillShiftViewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_tubemillVerifyData = "/api/tubemillVerify/";
export const GettubemillVerifyData = (request) => (dispatch) => {
  var url =
    endpoint_tubemillVerifyData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.TubemillVerifyViewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_movementverifyData = "/api/tubemillmoveVerify/";
export const GetmovementVerifyData = (request) => (dispatch) => {
  var url =
    endpoint_movementverifyData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.MovementVerifyViewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_polishverifyData = "/api/polishverify/";
export const GetPolishVerifyData = (request) => (dispatch) => {
  var url =
    endpoint_polishverifyData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.PolishVerifyViewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_ScrapPipeData = "/api/scrap/";
export const GetscrapPipeData = (request) => (dispatch) => {
  var url =
    endpoint_ScrapPipeData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.ScrapData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_ShortPipeData = "/api/shortlength/";
export const GetshortPipeData = (request) => (dispatch) => {
  var url =
    endpoint_ShortPipeData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.ShortData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_HolePipeData = "/api/hole/";
export const GetHolePipeData = (request) => (dispatch) => {
  var url =
    endpoint_HolePipeData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.HoleData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GettubemillviewData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      console.log(data);
      dispatch({ type: PipeTypes.TubemillData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const Getfaodataview = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      console.log(data);
      dispatch({ type: PipeTypes.PipeData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const Getinprocessdataview = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      console.log(data);
      dispatch({ type: PipeTypes.InprocessData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const Getpolishindataview = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      console.log(data);
      dispatch({ type: PipeTypes.PolishInspData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_tubemovePipeData = "/api/tubemill_movement/";
export const GettubemovePipeData = (request) => (dispatch) => {
  var url =
    endpoint_tubemovePipeData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.TubemoveData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_polishinsPipeData = "/api/polish_inspection/";
export const GetpolishinsPipeData = (request) => (dispatch) => {
  var url =
    endpoint_polishinsPipeData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.PolishInsData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_olishPipeData = "/api/polish/";
export const GetPolishPipeData = (request) => (dispatch) => {
  var url =
    endpoint_olishPipeData +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: PipeTypes.PolishData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
