import React, { useEffect } from "react";
import Axios from "axios";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { AuthTypes } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { EndPointApi } from "../../services/api";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.authData);
  const key = localStorage.getItem("AuthToken");

  function login(e) {
    e.preventDefault();
    dispatch({ type: AuthTypes.LOGIN_REQUEST });
    Axios.post(EndPointApi + "/auth/login/", {
      username: e.target.user.value,
      password: e.target.pass.value,
    })
      .then((res) => {
        dispatch({ type: AuthTypes.LOGIN_SUCCESS });
        localStorage.setItem("AuthToken", res.data.key);
        isLogged();
      })
      .catch((err) => {
        dispatch({ type: AuthTypes.LOGIN_FAILED, Error: err });
      });
  }

  const isLogged = useEffect(() => {
    if (key === null || key === undefined) {
    } else {
      axios(EndPointApi + "/auth/user/", {
        method: "GET",
        headers: {
          Authorization: "Token " + key,
        },
      }).then((data) => {
        console.log(data.data.id);
        axios(EndPointApi + "/account/" + data.data.id + "/", {
          method: "GET",
          headers: {
            Authorization: "Token " + key,
          },
        }).then((data) => {
          localStorage.setItem("user_access", data.data[0].user_access);
          localStorage.setItem("dashboard", data.data[0].dashboard);
          localStorage.setItem("msummary", data.data[0].msummary);
          localStorage.setItem("summarysd", data.data[0].summarysd);
          localStorage.setItem("asummary", data.data[0].asummary);
          localStorage.setItem("company", data.data[0].company);
          localStorage.setItem("company_table", data.data[0].company_table);
          localStorage.setItem("inward", data.data[0].inward);
          localStorage.setItem("vehicle_entry", data.data[0].vehicle_entry);
          localStorage.setItem("mother_table", data.data[0].mother_table);
          localStorage.setItem("editmother", data.data[0].editmother);
          localStorage.setItem("slitted_table", data.data[0].slitted_table);
          localStorage.setItem("pipe_inward", data.data[0].pipe_inward);
          localStorage.setItem("planning", data.data[0].planning);
          localStorage.setItem("coil_plan", data.data[0].coil_plan);
          localStorage.setItem("pipe_planning", data.data[0].pipe_planning);
          localStorage.setItem("plan_status", data.data[0].plan_status);
          localStorage.setItem("slitting", data.data[0].slitting);
          localStorage.setItem("pipe", data.data[0].pipe);
          localStorage.setItem("pipe_verify", data.data[0].pipe_verify);
          localStorage.setItem("tubemill", data.data[0].tubemill);
          localStorage.setItem(
            "tubemill_movement",
            data.data[0].tubemill_movement
          );
          localStorage.setItem(
            "polish_inspection",
            data.data[0].polish_inspection
          );
          localStorage.setItem("polish_movement", data.data[0].polish_movement);
          localStorage.setItem("scrap_pipe", data.data[0].scrap_pipe);
          localStorage.setItem("short_pipe", data.data[0].short_pipe);
          localStorage.setItem("hole_pipe", data.data[0].hole_pipe);
          localStorage.setItem("dispatch", data.data[0].dispatch);
          localStorage.setItem("coil_dispatch", data.data[0].coil_dispatch);
          localStorage.setItem("scrap_data", data.data[0].scrap_data);
          localStorage.setItem("pipe_sales", data.data[0].pipe_sales);
          localStorage.setItem("coil_sales", data.data[0].coil_sales);
          localStorage.setItem("sales_scrap", data.data[0].sales_scrap);
          localStorage.setItem("data_process", data.data[0].data_process);
          localStorage.setItem("entry_vehicle", data.data[0].entry_vehicle);
          localStorage.setItem("process_inward", data.data[0].process_inward);
          localStorage.setItem("production", data.data[0].production);
          localStorage.setItem(
            "slitting_process",
            data.data[0].slitting_process
          );
          localStorage.setItem("failed_challan", data.data[0].failed_challan);
          localStorage.setItem(
            "process_dispatch",
            data.data[0].process_dispatch
          );
          localStorage.setItem("process_booking", data.data[0].process_booking);
          localStorage.setItem(
            "process_sales_dispatch",
            data.data[0].process_sales_dispatch
          );
          localStorage.setItem("sales", data.data[0].sales);
          localStorage.setItem("booking_sales", data.data[0].booking_sales);
          localStorage.setItem(
            "edit_booking_sales",
            data.data[0].edit_booking_sales
          );
          localStorage.setItem("order", data.data[0].order);
          localStorage.setItem("edit_order", data.data[0].edit_order);
          localStorage.setItem("retantion", data.data[0].retantion);
          localStorage.setItem("retant", data.data[0].retant);
          localStorage.setItem("store_mana", data.data[0].store_mana);
          localStorage.setItem("venderlist", data.data[0].venderlist);
          localStorage.setItem("budget", data.data[0].budget);
          localStorage.setItem("purchase", data.data[0].purchase);
          localStorage.setItem("storetrack", data.data[0].storetrack);
          localStorage.setItem("itemlist", data.data[0].itemlist);
          localStorage.setItem("edititemlist", data.data[0].edititemlist);
          localStorage.setItem("stocklist", data.data[0].stocklist);
          localStorage.setItem("editstorelist", data.data[0].editstorelist);
          localStorage.setItem("issue", data.data[0].issue);
          localStorage.setItem("popayment", data.data[0].popayment);
          localStorage.setItem("editissueveri", data.data[0].editissueveri);
          localStorage.setItem("storeinv", data.data[0].storeinv);
          localStorage.setItem("demand", data.data[0].demand);
          localStorage.setItem("accstore", data.data[0].accstore);
          localStorage.setItem("approval_sys", data.data[0].approval_sys);
          localStorage.setItem("itemapprove", data.data[0].itemapprove);
          localStorage.setItem("poapproved", data.data[0].poapproved);
          localStorage.setItem("history", data.data[0].history);
          localStorage.setItem("popayment", data.data[0].popayment);
          localStorage.setItem("warehouse", data.data[0].warehouse);
          localStorage.setItem("mothercoil", data.data[0].mothercoil);
          localStorage.setItem("slittedcoil", data.data[0].slittedcoil);
          localStorage.setItem("hrms", data.data[0].hrms);
          localStorage.setItem("devicelist", data.data[0].devicelist);
          localStorage.setItem("deviceissue", data.data[0].deviceissue);
          localStorage.setItem("devicereturn", data.data[0].devicereturn);
          localStorage.setItem("challan", data.data[0].challan);
          localStorage.setItem("ledger", data.data[0].ledger);
          localStorage.setItem("stock", data.data[0].stock);
          localStorage.setItem("salesteam", data.data[0].salesteam);
          localStorage.setItem("summaryTeam", data.data[0].summaryTeam);
          localStorage.setItem("visitteam", data.data[0].visitteam);
          localStorage.setItem("dealervisit", data.data[0].dealervisit);
          window.location.reload();
        });
      });
      toast("login success", { autoClose: 2000 });
      dispatch({ type: AuthTypes.LOGIN_SUCCESS });
      navigate("../", { replace: true });
    }
  });

  return (
    <div className="containers">
      {state.loading ? (
        <div>
          <center>
            <ReactLoading type="spokes" color="red" className="m-5" />
          </center>
        </div>
      ) : (
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={login}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  id="user"
                  type="text"
                  className="login__input"
                  placeholder="User name"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  id="pass"
                  type="password"
                  className="login__input"
                  placeholder="Password"
                />
              </div>
              <label className="">{state.message}</label>
              <button className="S_login__submit">
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
