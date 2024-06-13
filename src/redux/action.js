export const AuthTypes = {
  LOGIN_REQUEST: "AUTH_REQUEST",
  LOGIN_SUCCESS: "AUTH_SUCCESS",
  LOGIN_FAILED: "AUTH_LOGIN",
  GET_USER: "AUTH_GET_USER",
  LOGOUT: "LOGOUT",
  SET_USER: "SET_USER",
};

export const CompanyTypes = {
  COMPANY_DATA: "COMPANY_DATA",
  ACCOUNT_DATA: "ACCOUNT_DATA",
  amount_data: "amountdata",
  account_view: "account_view",
  LEDGER_DATA: "LEDGER_DATA",
};

export const InwardTypes = {
  VEHICLE_DATA: "VEHICLE_DATA",
  MOTHER_COIL_DATA: "MOTHER_COIL_DATA",
  TEST_CERTI_DATA: "TEST_CERTIDATA",
  MOTHER_COIL_FILTER: "MOTHER_COIL_FILTER",
  SLITTED_COIL_DATA: "SLITTED_COIL_DATA",
  IND_SCRAP_DATA: "IND_SCRAP_DATA",
  IND_POLISH_DATA: "IND_POLISH_DATA",
  IND_NON_POLISH_DATA: "IND_NON_POLISH_DATA",
  InwardData: "Inward_Data",
};

export const PlanningTypes = {
  PlanningCoil: "Plan_Coil_Data",
  PlanningPipe: "Plan_Pipe_Data",
  Planning_ViewCoil: "Plan_CoilView_Data",
  PlanningView_Pipe: "Plan_PipeView_Data",
  Planningstatus_Pipe: "Planningstatus_Pipe",
  PolishPlan_Pipe: "PolishPlan_Data",
};

export const SlittingTypes = {
  slittingData: "slit_data",
  slittedData: "slitted_data",
  slittedData1: "slitted_data1",
  slittedData2: "slitted_data2",
  slittedMoveData: "slittMove_data",
  otherdata: "other_data",
  slitingData: "slitingView_Data",
};

export const PipeTypes = {
  PipeData: "Pipe_Data",
  InprocessData: "Inprocess_Data",
  PolishInspData: "PolishInsp_Data",
  TubemillData: "Tubemill_Data",
  TubemillShiftViewData: "TubemillShiftViewData",
  TubemillVerifyViewData: "TubemillVerifyViewData",
  MovementVerifyViewData: "MovementVerifyViewData",
  PolishVerifyViewData: "PolishVerifyViewData",
  ScrapData: "ScrapData",
  ShortData: "ShortData",
  HoleData: "HoleData",
  TubemoveData: "Tubemove_Data",
  PolishInsData: "PolishIns_Data",
  PolishData: "Polish_Data",
  TubeData: "Tube_Data",
  shiftdata: "Shift_list_Data",
};

export const DispatchTypes = {
  coil_dispatch: "Coil_data",
  pipe_dis_dispatch: "pipe_dis_dispatch_data",
  pipedispatch: "pipedispatch",
  coil_dis_dispatch: "coil_dis_dispatch_data",
  coil_extra: "Coil_extra_data",
  pipe_stock: "pipe_stock_data",
  duromax_stock: "duromax_stock_data",
  without_stock: "without_stock_data",
  entity_coil: "Entitycoil_Data",
  vehicle_type: "vehicletype_Data",
  pipe_dispatch: "Pipe_Data",
  scrap_dispatch: "scrap_data",
  sales_scrap_dispatch: "sales_scrap_data",
  coil_sales: "coil_salesdata",
};

export const SalesTypes = {
  SalesData: "Sales_Data",
  DispatchSummary: "DispatchSummary",
  RetantionData: "Retantion_Data",
  summarysalesTeam: "summarysalesTeam",
  RetantData: "Retant_Data",
  Sales_data: "Salesdata",
  BookingviewData: "Bookingview_Data",
  BookingData: "Booking_Data",
  OrderviewData: "Orderview_Data",
  OrderData: "Order_Data",
  coil_assign: "coilassign_Data",
  pipe_assign: "pipe_assign",
  pipeorderdata: "PipeOrder_Data",
  PipeAssignviewData: "Pipe_Assign_Data",
  CoilAssignviewData: "Coil_Assign_Data",
};

export const AccountTypes = {
  AccountData: "Account_User_Data",
  user_manage: "user_manage_data",
};

export const Storeypes = {
  VendorData: "Vendor_list_Data",
  ItemlistData: "Item_list_Data",
  ItemlistHData: "Item_listH_Data",
  ItemlistViewData: "Item_listView_Data",
  ItemlisthViewData: "Item_listhView_Data",
  BudgetlistData: "Budgetlist_Data",
  PurchaseData: "Purchase_list_Data",
  EaData: "EA_list_Data",
  EahData: "EAH_list_Data",
  ADMData: "ADM_list_Data",
  ADMHData: "ADMH_list_Data",
  GOODData: "GOOD_Data",
  GOODHData: "GOODH_Data",
  OTHERPURData: "OTHERPUR_list_Data",
  OTHERPURHData: "OTHERPURH_list_Data",
  PurchaseViewData: "Purchase_View_Data",
  VendorViewData: "VendorView_Data",
  POEntityData: "POEntity_Data",
  POEntData: "POEnt_Data",
  POEntyData: "POEnty_Data",
  POPaidData: "POPaid_Data",
  StoretrackViewData: "StoretrackView_Data",
  storeverifydata: "Storeverify_Data",
  storeenlistData: "storeenlistData",
  storeViewData: "Store_View_Data",
  IssueListData: "Issue_list_Data",
  IssueViewData: "Issue_View_Data",
  demandData: "Demand_list_Data",
  DemandViewData: "Demand_View_Data",
  storelistsData: "storelist_Data",
  PaymentlistData: "PaymentlistDatas",
  devicelistdata: "devicelist_Data",
  deviceissuedata: "deviceissue_Data",
  devicereturndata: "devicereturn_Data",
};

export const Data_ProcessTypes = {
  // Data_ProcessData: "Data_Process_Data",
  Vehicle_Entry: "VehicleEntry_Data",
  Inward_Process: "Inward_Process_Data",
  Failed_Challan: "Failed_Data",
  Production_Process: "Production_Data",
  Slitting_Process: "SlittingProcess_Data",
  Dispatch_Process: "DispatchProcess_Data",
  Booking_Process: "BookingProcess_Data",
  Sales_DispatchP: "SalesProcess_Data",
};

export const ChallanTypes = {
  SourceData: "SouceView_Data",
  GoodData: "GoodView_Data",
  ChalanData: "ChalanView_Data",
  ChallanlistData: "ChalanViewlist_Data",
  chalanviewdata: "chalanview__data",
  chalansviewdata: "chalanviews__data",
};

export const ModalTypes = {
  MODEL_ID: "open",
};
