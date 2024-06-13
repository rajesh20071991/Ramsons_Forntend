import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { AccountTypes } from "../action";

export const GetAccountData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: AccountTypes.AccountData, payload: data.results });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const endpoint_dispatch = "/api/userview/";
export const GetUserManagementData = (request) => (dispatch) => {
  var url =
    endpoint_dispatch +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: AccountTypes.user_manage, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
