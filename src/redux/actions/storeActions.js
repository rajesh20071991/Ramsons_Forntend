import GenrateQuery from "../../components/Common/generatequery";
import { api } from "../../services/api";
import { Storeypes } from "../action";

const VENDOR_ENDPOINT = "/api/vendorlist/";
export const GetVendorData = (request) => (dispatch) => {
  var url =
    VENDOR_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.VendorData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const VENDORA_ENDPOINT = "/api/vendorlist/";
export const GetVendorapproveData = (request) => (dispatch) => {
  var url =
    VENDORA_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  url += "&status=Pending";
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.VendorData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const ITEMLIST_ENDPOINT = "/api/itemlist/";
export const GetItemListData = (request) => (dispatch) => {
  var url =
    ITEMLIST_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.ItemlistData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const ITEMView_ENDPOINT = "/api/itemAppr/";
export const GetItemListViewData = (request) => (dispatch) => {
  var url =
    ITEMView_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.ItemlistViewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const ITEMViewh_ENDPOINT = "/api/itemApprh/";
export const GetItemhListViewData = (request) => (dispatch) => {
  var url =
    ITEMViewh_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.ItemlisthViewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const Bugetlist_ENDPOINT = "/api/budget/";
export const GetBudgetListData = (request) => (dispatch) => {
  var url =
    Bugetlist_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.BudgetlistData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const PURCHASE_ENDPOINT = "/api/polist/";
export const GetPurchaseListData = (request) => (dispatch) => {
  var url =
    PURCHASE_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.PurchaseData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const EAAP_ENDPOINT = "/api/poraw/";
export const GetEaapListData = (request) => (dispatch) => {
  var url =
    EAAP_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.EaData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const EAAPH_ENDPOINT = "/api/approvalview/";
export const GetApproveListData = (request) => (dispatch) => {
  var url =
    EAAPH_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.EahData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const ADMINPUR_ENDPOINT = "/api/historypolist/";
export const GetHistoryPOListData = (request) => (dispatch) => {
  var url =
    ADMINPUR_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.ADMData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const GoodPUR_ENDPOINT = "/api/poraw/";
export const GetGoodPurcListData = (request) => (dispatch) => {
  var url =
    GoodPUR_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.GOODData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const STORELIST_ENDPOINT = "/api/storelist/";
export const GetStoreListData = (request) => (dispatch) => {
  var url =
    STORELIST_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.storelistsData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const STOREView_ENDPOINT = "/api/storelist/";
export const GetStoreViewData = (request) => (dispatch) => {
  var url =
    STOREView_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.storelistsData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const Payment_ENDPOINT = "/api/payment/";
export const GetPaymentViewData = (request) => (dispatch) => {
  var url =
    Payment_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.PaymentlistData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetVendorviewData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: Storeypes.VendorViewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

export const GetstoreviewData = (endpoint) => (dispatch) => {
  api({ api: endpoint })
    .then((data) => {
      dispatch({ type: Storeypes.storeViewData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const ISSUELIST_ENDPOINT = "/api/issuelist/";
export const GetIssueListData = (request) => (dispatch) => {
  var url =
    ISSUELIST_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.IssueListData, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const DEVICE_ENDPOINT = "/api/devicelist/";
export const GetdeviceListData = (page, page_size, name, id) => (dispatch) => {
  var url = DEVICE_ENDPOINT + "?page=" + page + "&page_size=" + page_size;
  if (name !== "") {
    url += "&company_name=" + name;
  }
  if (id !== "") {
    url += "&id=" + id;
  }
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.devicelistdata, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const DEISSUE_ENDPOINT = "/api/deviceissue/";
export const GetdeviceissueData = (request) => (dispatch) => {
  var url =
    DEISSUE_ENDPOINT +
    GenrateQuery({
      page: request.page,
      size: request.size,
      filter: request.filter,
      order: request.order,
    });
  api({ api: url })
    .then((data) => {
      dispatch({ type: Storeypes.deviceissuedata, payload: data });
    })
    .catch(({ message }) => {
      console.log(message);
    });
};

const DERETURN_ENDPOINT = "/api/devicereturn/";
export const GetdevicereturnData =
  (page, page_size, name, id) => (dispatch) => {
    var url = DERETURN_ENDPOINT + "?page=" + page + "&page_size=" + page_size;
    if (name !== "") {
      url += "&company_name=" + name;
    }
    if (id !== "") {
      url += "&id=" + id;
    }
    api({ api: url })
      .then((data) => {
        dispatch({ type: Storeypes.devicereturndata, payload: data });
      })
      .catch(({ message }) => {
        console.log(message);
      });
  };
