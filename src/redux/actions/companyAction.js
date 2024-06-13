import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { CompanyTypes } from "../action";

const COMPANY_ENDPOINT = "/api/company/";
export const GetCompanyData = (request) => (dispatch) => {
  var url =
    COMPANY_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: CompanyTypes.COMPANY_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const COMPANYSALES_ENDPOINT = "/api/companysales/";
export const GetCompanySalesData = (request) => (dispatch) => {
  var url =
    COMPANYSALES_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: CompanyTypes.COMPANY_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetCompanylist = (endpoint) => (dispatch) => {
  const url = endpoint;
  api({ api: url })
    .then((data) => {
      dispatch({ type: CompanyTypes.COMPANY_DATA, payload: data.results });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const Accotns_ENDPOINT = "/api/saccounts/";
export const GetAccountData = (request) => (dispatch) => {
  var url =
    Accotns_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: CompanyTypes.ACCOUNT_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const Amount_ENDPOINT = "/api/amount/";
export const GetAmountData = (request) => (dispatch) => {
  var url =
    Amount_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: CompanyTypes.amount_data, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetAccountView = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: CompanyTypes.account_view, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const Ledger_ENDPOINT = "/api/ledger/";
export const GetLedgerData = (request) => (dispatch) => {
  var url =
    Ledger_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: CompanyTypes.LEDGER_DATA, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
