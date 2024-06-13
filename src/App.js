import "./App.css";
import React from "react";
import Nav from "./components/Navbar/navbar";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//For routes
import VehicleEntry from "./pages/Inward/vehical_entry";
import Home from "./pages/home";
import Login from "./pages/Login/login";
import MotherCoil from "./pages/Inward/mother_coil";
import Ind_NonPolish from "./pages/Inward/ind_non_polish";
import Ind_Polish from "./pages/Inward/ind_polish";
import Planning_Pipe from "./pages/Planning/pipe_planning";
import Planning_Coil from "./pages/Planning/coil_planning";
import Slitting from "./pages/Slitting/Slitting";
import TubemillData from "./pages/Pipe/tubemilldata";
import Tubemill_Movement from "./pages/Pipe/tubemill_movement";
import Polish_Inspection from "./pages/Pipe/polish_inspection";
import Polish_Movement from "./pages/Pipe/polish_movement";
import Coil_Dispatch from "./pages/Dispatch/coil_dispatch";
import Pipe_Dispatch from "./pages/Dispatch/Pipe_data";
import Entry_Vehicle from "./pages/Data_Process/entry_vehicle";
import Inward_Data from "./pages/Data_Process/process_inward";
import Production from "./pages/Data_Process/production";
import Slitting_Process from "./pages/Data_Process/slitting_process";
import Failed_Challan from "./pages/Data_Process/failed_challan";
import Dispatch_Process from "./pages/Data_Process/process_dispatch";
import Booking_Process from "./pages/Data_Process/process_booking";
import Sales_Dispatch from "./pages/Data_Process/process_sales_dispatch";
import Booking_Data from "./pages/Sales/booking_sales";
import MotherCoilW from "./pages/Warehouse/mothercoil";
import ScrapData_Dispatch from "./pages/Dispatch/scrap_data";
import Scrap_Sales_Dispatch from "./pages/Dispatch/sales_scrap";
import Company_List_Data from "./pages/Company/company";
import Coil_Assign from "./pages/Sales/coil_assign";
import Coil_Sales from "./pages/Dispatch/coil_sales";
import Slitted_Coil_Slitting from "./pages/Slitting/slitted_view_coil";
import TubeMillShift from "./pages/Pipe/tubemill_shift";
import { useDispatch } from "react-redux";
import { SetUser } from "./redux/actions/auth._Action";
import Vendor_List_Data from "./pages/storeitem/vendor_list";
import Purchaselist from "./pages/storeitem/purchase";
import Storelist from "./pages/storeitem/storelist";
import Issuelist from "./pages/storeitem/issuelist";
import Stocklist from "./pages/storeitem/stocklist";
import StockList_view from "./pages/storeitem/stock_view";
import Test_certi from "./pages/Inward/tc_create";
import Company_view from "./pages/storeitem/vendorlistview";
import Budgetlist from "./pages/storeitem/budget";
import Source_type from "./pages/Challan/source";
import Gooddata from "./pages/Challan/good_data";
import EditInwardCoil from "./pages/Challan/edit_inward";
import ChallanDetails from "./pages/Challan/chalan_details";
import Challanlist from "./pages/Challan/chalan";
import ChalanViewData from "./pages/Challan/chalanview";
import DeviceList from "./pages/HRMS/devicelist";
import DeviceIssue from "./pages/HRMS/deviceissue";
import DeviceReturn from "./pages/HRMS/devicereturn";
import ItemList_View from "./pages/storeitem/itemapproval";
import Production_Table from "./pages/Pipe/pcproduction";
import Pipe_Stock from "./pages/stock/pipestock";
import Duromax_Stock from "./pages/stock/duromaxstock";
import Without_Stock from "./pages/stock/outstock";
import Scanner from "./pages/Company/item";
import ASummary_Data from "./pages/Summary/summarysd";
import AutoLogout from "./components/Common/logout";
import ASummary from "./pages/Summary/asummary";
import Accounts_Model from "./pages/Accounts/accounts";
import Account_View from "./pages/Accounts/account_view";
import Vendor_Approve_Data from "./pages/storeitem/vendorapprove";
import Retantion from "./pages/Sales/retantion";
import Planning_Status from "./pages/Planning/planning";
import Profile from "./pages/profile/profile";
import UserManagementTable from "./pages/profile/user_mamagement";
import ScrapViewData from "./pages/Pipe/scrap_pipe";
import ShortViewData from "./pages/Pipe/short_pipe";
import HoleViewData from "./pages/Pipe/hole_pipe";
import SlittedCoil from "./pages/Inward/slitted_coil";
import Order_JS from "./pages/Sales/order";
import DispatchTab from "./pages/Sales/dashboard/order_summary";
import Pipe_Assign from "./pages/Sales/sales_pipe";
import Pipe_Reciever from "./pages/Dispatch/pipeTrack";
import PipeSTubSummary from "./pages/Pipe/pipe_summarys";
import TubemillVerify_data from "./pages/Pipe/Tubmill_verify";
import SummaryTeamMember from "./pages/Sales/salesteam";
import Sales_Summary from "./pages/Sales/dashboard/salessummary";
import PipeNonPolishVerify_data from "./pages/Pipe/pipeverify";
import PipeMovementVerify_data from "./pages/Pipe/movementverify";
import PipePolishVerify_data from "./pages/Pipe/polishInsverify";
import Wider_Instock from "./pages/Inward/widerInstock";
import EAPURlist from "./pages/storeitem/approve";
import Final_Approve from "./pages/storeitem/finalapprove";
import History_ListPO from "./pages/storeitem/history";
import ItemView_History from "./pages/storeitem/itemhistory";
import PaymentViewlist from "./pages/storeitem/popayment";

function App() {
  var currentclass = "";

  function RequireAuth() {
    let auth = localStorage.getItem("AuthToken");
    var dispatch = useDispatch();
    if (auth === null) {
      return <Navigate to="/login" />;
    } else {
      dispatch(SetUser());
    }
    return <Outlet />;
  }

  if (window.location.pathname === "/login") {
    currentclass = "col-md-12"; // set currentclass to "col-md-12" if pathname is "/login"
  } else {
    currentclass = "table-striped"; // set currentclass to a custom style with margin if pathname is not "/login"
  }

  return (
    <div className="container-fluid App" style={{ padding: "inherit" }}>
      <ToastContainer />
      {window.location.pathname !== "/login" && (
        <div className="col-md-2 NavBar  text-light" id="nav_side">
          <Nav />
        </div>
      )}
      <div className={currentclass}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user_mamagement" element={<UserManagementTable />} />
            <Route path="/pipeverify" element={<PipeNonPolishVerify_data />} />
            <Route path="/widerinstock" element={<Wider_Instock />} />
            <Route
              path="/movementverify"
              element={<PipeMovementVerify_data />}
            />
            <Route path="/short_pipe" element={<ShortViewData />} />
            <Route path="/salesteam" element={<SummaryTeamMember />} />
            <Route
              path="/polishInsverify"
              element={<PipePolishVerify_data />}
            />
            <Route path="/salessummary" element={<Sales_Summary />} />
            <Route path="/finalapprove" element={<Final_Approve />} />
            <Route path="/scrap_pipe" element={<ScrapViewData />} />
            <Route path="/hole_pipe" element={<HoleViewData />} />
            <Route path="/history" element={<History_ListPO />} />
            <Route path="/itemhistory" element={<ItemView_History />} />
            <Route path="/planning" element={<Planning_Status />} />
            <Route path="/vehicle_entry" element={<VehicleEntry />} />
            <Route path="/retantion" element={<Retantion />} />
            <Route path="/slitted_coil" element={<SlittedCoil />} />
            <Route path="/order_summary" element={<DispatchTab />} />
            <Route path="/vendorapprove" element={<Vendor_Approve_Data />} />
            <Route path="/duromaxstock" element={<Duromax_Stock />} />
            <Route path="/asummary" element={<ASummary />} />
            <Route path="/outstock" element={<Without_Stock />} />
            <Route path="/pipestock" element={<Pipe_Stock />} />
            <Route path="/tc_create" element={<Test_certi />} />
            <Route path="/itemapproval" element={<ItemList_View />} />
            <Route path="/vendor_list" element={<Vendor_List_Data />} />
            <Route path="/purchase" element={<Purchaselist />} />
            <Route path="/approve" element={<EAPURlist />} />
            <Route path="/accounts" element={<Accounts_Model />} />
            <Route path="/pipe_data" element={<Pipe_Dispatch />} />
            <Route path="/pipeTrack" element={<Pipe_Reciever />} />
            <Route path="/storelist" element={<Storelist />} />
            <Route path="/summarysd" element={<ASummary_Data />} />
            <Route path="/item" element={<Scanner />} />
            <Route path="/pipe_summarys" element={<PipeSTubSummary />} />
            <Route path="/issuelist" element={<Issuelist />} />
            <Route path="/Tubemill_verify" element={<TubemillVerify_data />} />
            <Route path="/devicelist" element={<DeviceList />} />
            <Route path="/deviceissue" element={<DeviceIssue />} />
            <Route path="/devicereturn" element={<DeviceReturn />} />
            <Route path="/pcproduction" element={<Production_Table />} />
            <Route path="/stocklist" element={<Stocklist />} />
            <Route path="/mother_coil" element={<MotherCoil />} />
            <Route path="/ind_non_polish" element={<Ind_NonPolish />} />
            <Route path="/ind_polish" element={<Ind_Polish />} />
            <Route path="/source" element={<Source_type />} />
            <Route path="/edit_inward" element={<EditInwardCoil />} />
            <Route path="/good_data" element={<Gooddata />} />
            <Route path="/chalan_details" element={<ChallanDetails />} />
            <Route
              path="/Slitted_view_coil"
              element={<Slitted_Coil_Slitting />}
            />
            <Route path="/tubemill_shift" element={<TubeMillShift />} />
            <Route path="/Sales/sales_pipe/:id" element={<Pipe_Assign />} />
            <Route
              path="/Challan/chalanview/:id"
              element={<ChalanViewData />}
            />
            <Route
              path="/Accounts/account_view/:id"
              element={<Account_View />}
            />
            <Route path="/coil_planning" element={<Planning_Coil />} />
            <Route path="/pipe_planning" element={<Planning_Pipe />} />
            <Route path="/Slitting" element={<Slitting />} />
            <Route path="/tubemilldata" element={<TubemillData />} />
            <Route path="/tubemill_movement" element={<Tubemill_Movement />} />
            <Route path="/Sales/coil_assign/:id" element={<Coil_Assign />} />
            <Route path="/coil_sales" element={<Coil_Sales />} />
            <Route path="/polish_inspection" element={<Polish_Inspection />} />
            <Route path="/polish_movement" element={<Polish_Movement />} />
            <Route path="/coil_dispatch" element={<Coil_Dispatch />} />
            <Route
              path="/storeitem/vendorlistview/:id"
              element={<Company_view />}
            />
            <Route
              path="/storeitem/stock_view/:id"
              element={<StockList_view />}
            />
            <Route path="/scrap_data" element={<ScrapData_Dispatch />} />
            <Route path="/budget" element={<Budgetlist />} />
            <Route path="/sales_scrap" element={<Scrap_Sales_Dispatch />} />
            <Route path="/entry_vehicle" element={<Entry_Vehicle />} />
            <Route path="/chalan" element={<Challanlist />} />
            <Route path="/process_inward" element={<Inward_Data />} />
            <Route path="/production" element={<Production />} />
            <Route path="/slitting_process" element={<Slitting_Process />} />
            <Route path="/failed_challan" element={<Failed_Challan />} />
            <Route path="/process_dispatch" element={<Dispatch_Process />} />
            <Route path="/process_booking" element={<Booking_Process />} />
            <Route
              path="/process_sales_dispatch"
              element={<Sales_Dispatch />}
            />
            <Route path="/booking_sales" element={<Booking_Data />} />
            <Route path="/order" element={<Order_JS />} />
            <Route path="/mothercoil" element={<MotherCoilW />} />
            <Route path="/company" element={<Company_List_Data />} />
            <Route path="/popayment" element={<PaymentViewlist />} />
          </Route>
        </Routes>
        <AutoLogout />
      </div>
    </div>
  );
}

export default App;
