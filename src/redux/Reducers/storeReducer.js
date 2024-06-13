import { Storeypes } from "../action";

let initialState = {};

const StoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case Storeypes.VendorData:
      return { ...state, vendor_data: action.payload };
    case Storeypes.VendorViewData:
      return { ...state, vendor_view: action.payload };
    case Storeypes.BudgetlistData:
      return { ...state, budget_view: action.payload };
    case Storeypes.ItemlistData:
      return { ...state, ItemList_data: action.payload };
    case Storeypes.ItemlistViewData:
      return { ...state, ItemListview_data: action.payload };
    case Storeypes.ItemlisthViewData:
      return { ...state, ItemhListview_data: action.payload };
    case Storeypes.PurchaseData:
      return { ...state, purchase_data: action.payload };
    case Storeypes.EaData:
      return { ...state, eapurchase_data: action.payload };
    case Storeypes.EahData:
      return { ...state, eahpurchase_data: action.payload };
    case Storeypes.ADMData:
      return { ...state, adminpurchase_data: action.payload };
    case Storeypes.ADMHData:
      return { ...state, adminhpurchase_data: action.payload };
    case Storeypes.GOODData:
      return { ...state, goodpurchase_data: action.payload };
    case Storeypes.GOODHData:
      return { ...state, goodhpurchase_data: action.payload };
    case Storeypes.OTHERPURData:
      return { ...state, otherpurchase_data: action.payload };
    case Storeypes.OTHERPURHData:
      return { ...state, otherhpurchase_data: action.payload };
    case Storeypes.PurchaseViewData:
      return { ...state, purchaseview_data: action.payload };
    case Storeypes.storelistsData:
      return { ...state, storelist_data: action.payload };
    case Storeypes.storeViewData:
      return { ...state, storeview_data: action.payload };
    case Storeypes.IssueListData:
      return { ...state, issuelist_data: action.payload };
    case Storeypes.IssueViewData:
      return { ...state, issueview_data: action.payload };
    case Storeypes.demandData:
      return { ...state, demand_data: action.payload };
    case Storeypes.DemandViewData:
      return { ...state, demandview_data: action.payload };
    case Storeypes.StoretrackViewData:
      return { ...state, storetrackview: action.payload };
    case Storeypes.POEntityData:
      return { ...state, poentityData: action.payload };
    case Storeypes.POEntData:
      return { ...state, poentData: action.payload };
    case Storeypes.PaymentlistData:
      return { ...state, paymentlist: action.payload };
    case Storeypes.POEntyData:
      return { ...state, poentyData: action.payload };
    case Storeypes.devicelistdata:
      return { ...state, devicelist: action.payload };
    case Storeypes.deviceissuedata:
      return { ...state, deviceissue: action.payload };
    case Storeypes.storeenlistData:
      return { ...state, storeen_list: action.payload };
    case Storeypes.devicereturndata:
      return { ...state, devicereturn: action.payload };
    case Storeypes.POPaidData:
      return { ...state, popaid: action.payload };
    case Storeypes.storeverifydata:
      return { ...state, storeverify: action.payload };
    default:
      return state;
  }
};
export default StoreReducer;
