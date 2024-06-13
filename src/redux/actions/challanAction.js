import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { ChallanTypes } from "../action";

export const GetChallanData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: ChallanTypes.challanData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetDetailsData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: ChallanTypes.challan_details_Data, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetEntityData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: ChallanTypes.challan_entity_Data, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const SOURCE_ENDPOINT = "/api/source/";
export const GetSouceListData = (request) => (dispatch) => {
  var url =
    SOURCE_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: ChallanTypes.SourceData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const GOOD_ENDPOINT = "/api/entity/";
export const GetGoodListData = (request) => (dispatch) => {
  var url =
    GOOD_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: ChallanTypes.GoodData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const CHALANDET_ENDPOINT = "/api/chalan_data/";
export const GeChallanListData = (request) => (dispatch) => {
  var url =
    CHALANDET_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: ChallanTypes.ChalanData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const CHALANLIST_ENDPOINT = "/api/chalanentity/";
export const GeChalanListData = (request) => (dispatch) => {
  var url =
    CHALANLIST_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: ChallanTypes.ChallanlistData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetChalanviewData = (endpoint) => (dispatch) => {
  // const dispatch = useDispatch();
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: ChallanTypes.chalanviewdata, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetChalansviewData = (endpoint) => (dispatch) => {
  // const dispatch = useDispatch();
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: ChallanTypes.chalansviewdata, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
