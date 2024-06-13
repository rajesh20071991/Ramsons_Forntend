import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowNarrowRight, HiMenu } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import "../../App.css";
const Nav_Items = () => {
  const state = useSelector((state) => state.authData);
  var isLoggedin = state.isLogged;
  var key = localStorage.getItem("AuthToken");
  if (key !== null) {
    isLoggedin = true;
  } else {
    isLoggedin = false;
  }

  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);
  const [summaryArrowRotation, setSummaryArrowRotation] = useState(0);

  const handleSummaryCollapse = () => {
    setIsSummaryCollapsed(!isSummaryCollapsed);
    setSummaryArrowRotation(isSummaryCollapsed ? 0 : -90);
  };

  // Planning Collapse
  const [isPlanningCollapsed, setIsPlanningCollapsed] = useState(false);
  const [planningArrowRotation, setPlanningArrowRotation] = useState(0);

  const handlePlanningCollapse = () => {
    setIsPlanningCollapsed(!isPlanningCollapsed);
    setPlanningArrowRotation(isPlanningCollapsed ? 0 : -90);
  };

  const [isInwardCollapsed, setIsInwardCollapsed] = useState(false);
  const [InwardArrowRotation, setInwardArrowRotation] = useState(0);

  const handleInwardCollapse = () => {
    setIsInwardCollapsed(!isInwardCollapsed);
    setInwardArrowRotation(isInwardCollapsed ? 0 : -90);
  };

  const [isSlittingCollapsed, setIsSlittingCollapsed] = useState(false);
  const [SlittingArrowRotation, setSlittingArrowRotation] = useState(0);

  const handleSlittingCollapse = () => {
    setIsSlittingCollapsed(!isSlittingCollapsed);
    setSlittingArrowRotation(isSlittingCollapsed ? 0 : -90);
  };

  const [isStockCollapsed, setIsStockCollapsed] = useState(false);
  const [StockArrowRotation, setStockArrowRotation] = useState(0);

  const handleStockCollapse = () => {
    setIsStockCollapsed(!isStockCollapsed);
    setStockArrowRotation(isStockCollapsed ? 0 : -90);
  };

  const [isPipeCollapsed, setIsPipeCollapsed] = useState(false);
  const [PipeArrowRotation, setPipeArrowRotation] = useState(0);

  const handlePipeCollapse = () => {
    setIsPipeCollapsed(!isPipeCollapsed);
    setPipeArrowRotation(isPipeCollapsed ? 0 : -90);
  };

  const [isPipeVerifyCollapsed, setIsPipeVerifyCollapsed] = useState(false);
  const [PipeVerifyArrowRotation, setPipeVerifyArrowRotation] = useState(0);

  const handlePipeVerifyCollapse = () => {
    setIsPipeVerifyCollapsed(!isPipeVerifyCollapsed);
    setPipeVerifyArrowRotation(isPipeVerifyCollapsed ? 0 : -90);
  };

  const [isDispatchCollapsed, setIsDispatchCollapsed] = useState(false);
  const [DispatchArrowRotation, setDispatchArrowRotation] = useState(0);

  const handleDispatchCollapse = () => {
    setIsDispatchCollapsed(!isDispatchCollapsed);
    setDispatchArrowRotation(isDispatchCollapsed ? 0 : -90);
  };

  const [isFmsCollapsed, setIsFmsCollapsed] = useState(false);
  const [FmsArrowRotation, setFmsArrowRotation] = useState(0);

  const handleFmsCollapse = () => {
    setIsFmsCollapsed(!isFmsCollapsed);
    setFmsArrowRotation(isFmsCollapsed ? 0 : -90);
  };

  const [isSalesteamCollapsed, setIsSalesteamCollapsed] = useState(false);

  const handleSalesteamCollapse = () => {
    setIsFmsCollapsed(!isSalesteamCollapsed);
    setFmsArrowRotation(isSalesteamCollapsed ? 0 : -90);
  };

  const [isSalesCollapsed, setIsSalesCollapsed] = useState(false);
  const [SalesArrowRotation, setSalesArrowRotation] = useState(0);

  const handleSalesCollapse = () => {
    setIsSalesCollapsed(!isSalesCollapsed);
    setSalesArrowRotation(isSalesCollapsed ? 0 : -90);
  };

  const [isStoreCollapsed, setIsStoreCollapsed] = useState(false);
  const [StoreArrowRotation, setStoreArrowRotation] = useState(0);

  const handleStoreCollapse = () => {
    setIsStoreCollapsed(!isStoreCollapsed);
    setStoreArrowRotation(isStoreCollapsed ? 0 : -90);
  };

  const [isApprovalCollapsed, setIsApprovalCollapsed] = useState(false);
  const [ApprovalArrowRotation, setApprovalArrowRotation] = useState(0);

  const handleApprovalCollapse = () => {
    setIsApprovalCollapsed(!isApprovalCollapsed);
    setApprovalArrowRotation(isApprovalCollapsed ? 0 : -90);
  };

  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);
  const [HistoryArrowRotation, setHistoryArrowRotation] = useState(0);

  const handleHistoryCollapse = () => {
    setIsHistoryCollapsed(!isHistoryCollapsed);
    setHistoryArrowRotation(isHistoryCollapsed ? 0 : -90);
  };

  const [isChallanCollapsed, setIsChallanCollapsed] = useState(false);
  const [ChallanArrowRotation, setChallanArrowRotation] = useState(0);

  const handleChallanCollapse = () => {
    setIsChallanCollapsed(!isChallanCollapsed);
    setChallanArrowRotation(isChallanCollapsed ? 0 : -90);
  };

  const [isHrmsCollapsed, setIsHrmsCollapsed] = useState(false);
  const [HrmsArrowRotation, setHrmsArrowRotation] = useState(0);

  const handleHrmsCollapse = () => {
    setIsHrmsCollapsed(!isHrmsCollapsed);
    setHrmsArrowRotation(isHrmsCollapsed ? 0 : -90);
  };

  return (
    <div className="container" style={{ marginTop: "0.5rem" }}>
      {isLoggedin ? (
        <>
          {/* 1st tab */}
          {localStorage.getItem("company") === "true" && (
            <>
              {localStorage.getItem("company_table") === "true" && (
                <>
                  <Link to="/company">
                    <HiMenu size={30} />
                    <span style={{ marginLeft: "0.5rem" }}>Party List</span>
                  </Link>
                  <br />
                </>
              )}
            </>
          )}
          {localStorage.getItem("msummary") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#accountCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="accountCollapse"
                style={{ alignItems: "center" }}
                onClick={handleSummaryCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Summary</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${summaryArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "25px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isSummaryCollapsed ? "show" : ""
                }`}
                id="accountCollapse">
                <div className="ms-3">
                  {localStorage.getItem("summarysd") === "true" && (
                    <>
                      <Link to="/summarysd">
                        <AiOutlineCheckCircle size={18} colour="black" />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Details
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("asummary") === "true" && (
                    <>
                      <Link to="/asummary">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Summary
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}

          {localStorage.getItem("inward") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#inwardCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="inwardCollapse"
                style={{ alignItems: "center" }}
                onClick={handleInwardCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Inward</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${InwardArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "25px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isInwardCollapsed ? "show" : ""
                }`}
                id="inwardCollapse">
                <div className="ms-3">
                  {localStorage.getItem("vehicle_entry") === "true" && (
                    <>
                      <Link to="/vehicle_entry">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Vehicle Entry
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("mother_table") === "true" && (
                    <>
                      <Link to="/widerInstock">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Instock
                        </span>
                      </Link>
                      <br />
                      <Link to="/mother_coil">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Mother Coil
                        </span>
                      </Link>
                      <br />
                      <Link to="/tc_create">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Test Certificate
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("editmother") === "true" && (
                    <>
                      <Link to="/edit_inward">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          (E)Inward
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("slitted_table") === "true" && (
                    <>
                      <Link to="/slitted_coil">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Slitted Coil
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("pipe_inward") === "true" && (
                    <>
                      <Link to="/ind_non_polish">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Pipe
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {/* 2nd tab */}
          {localStorage.getItem("planning") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#planningCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="planningCollapse"
                style={{ alignItems: "center" }}
                onClick={handlePlanningCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Planning</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${planningArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isPlanningCollapsed ? "show" : ""
                }`}
                id="planningCollapse">
                <div className="ms-3">
                  {localStorage.getItem("coil_plan") === "true" && (
                    <>
                      <Link to="/coil_planning">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Coil
                        </span>
                      </Link>
                      <br />{" "}
                    </>
                  )}
                  {localStorage.getItem("pipe_planning") === "true" && (
                    <>
                      <Link to="/pipe_planning">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Pipe
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("plan_status") === "true" && (
                    <>
                      <Link to="/planning">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Planning Status
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {/* 3rd */}
          {localStorage.getItem("slitting") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#slittingCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="slittingCollapse"
                style={{ alignItems: "center" }}
                onClick={handleSlittingCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Slitting</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${SlittingArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isSlittingCollapsed ? "show" : ""
                }`}
                id="slittingCollapse">
                <div className="ms-3">
                  <Link to="/slitting">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Slitting
                    </span>
                  </Link>
                  <br />
                  <Link to="/slitted_view_coil">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Slitted Coil
                    </span>
                  </Link>
                  <br />
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("stock") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#stockCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="stockCollapse"
                style={{ alignItems: "center" }}
                onClick={handleStockCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Stock</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${StockArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isStockCollapsed ? "show" : ""
                }`}
                id="stockCollapse">
                <div className="ms-3">
                  <Link to="/pipestock">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Ramsons
                    </span>
                  </Link>
                  <br />
                  <Link to="/duromaxstock">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Duromax
                    </span>
                  </Link>
                  <br />
                  <Link to="/outstock">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Without Stamp
                    </span>
                  </Link>
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("salesteam") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#SalesTeamCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="SalesTeamCollapse"
                style={{ alignItems: "center" }}
                onClick={handleSalesteamCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Sales Team</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${StockArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isSalesteamCollapsed ? "show" : ""
                }`}
                id="SalesTeamCollapse">
                <div className="ms-3">
                  {localStorage.getItem("summaryTeam") === "true" && (
                    <>
                      <Link to="/salessummary">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Summary
                        </span>
                      </Link>
                      <br />
                      <Link to="/salescompany">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Company Details
                        </span>
                      </Link>
                      <br />
                      <Link to="/salesteam">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Sales Target
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("visitteam") === "true" && (
                    <>
                      <Link to="/visitteam">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Visit
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("dealervisit") === "true" && (
                    <>
                      <Link to="/dealervisit">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Dealer Visit
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {/* 4th tab */}
          {localStorage.getItem("pipe") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#pipeCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="pipeCollapse"
                style={{ alignItems: "center" }}
                onClick={handlePipeCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Pipe</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${PipeArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isPipeCollapsed ? "show" : ""
                }`}
                id="pipeCollapse">
                <div className="ms-3">
                  {localStorage.getItem("tubemill") === "true" && (
                    <>
                      <Link to="/pipe_summarys">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Summary
                        </span>
                      </Link>
                      <br />
                      <Link to="/tubemill_shift">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Tubemill
                        </span>
                      </Link>
                      <br />
                      <Link to="/tubemilldata">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Non Polish
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("tubemill_movement") === "true" && (
                    <>
                      <Link to="/tubemill_movement">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          NP Movement
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("polish_inspection") === "true" && (
                    <>
                      <Link to="/polish_inspection">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Polish Inspection
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("polish_movement") === "true" && (
                    <>
                      <Link to="/polish_movement">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Polish Instock
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("scrap_pipe") === "true" && (
                    <>
                      <Link to="/scrap_pipe">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Scrap
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("short_pipe") === "true" && (
                    <>
                      <Link to="/short_pipe">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Short Length
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("hole_pipe") === "true" && (
                    <>
                      <Link to="/hole_pipe">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Hole Pipe
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("pipe_verify") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#pipeVerifyCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="pipeVerifyCollapse"
                style={{ alignItems: "center" }}
                onClick={handlePipeVerifyCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Pipe Verify </span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${PipeVerifyArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isPipeVerifyCollapsed ? "show" : ""
                }`}
                id="pipeVerifyCollapse">
                <div className="ms-3">
                  <>
                    <Link to="/Tubemill_verify">
                      <AiOutlineCheckCircle size={18} />
                      <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                        Tubemill
                      </span>
                    </Link>
                    <br />
                    <Link to="/pipeverify">
                      <AiOutlineCheckCircle size={18} />
                      <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                        Non Polish
                      </span>
                    </Link>
                    <br />
                    <Link to="/movementverify">
                      <AiOutlineCheckCircle size={18} />
                      <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                        Movement
                      </span>
                    </Link>
                    <br />
                    <Link to="/polishInsverify">
                      <AiOutlineCheckCircle size={18} />
                      <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                        Polish
                      </span>
                    </Link>
                    <br />
                  </>
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("dispatch") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#dispatchCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="dispatchCollapse"
                style={{ alignItems: "center" }}
                onClick={handleDispatchCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Dispatch</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${DispatchArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isDispatchCollapsed ? "show" : ""
                }`}
                id="dispatchCollapse">
                <div className="ms-3">
                  {localStorage.getItem("coil_dispatch") === "true" && (
                    <>
                      <Link to="/coil_dispatch">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Coil (JW)
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("scrap_data") === "true" && (
                    <>
                      <Link to="/scrap_data">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Scrap (JW)
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("pipe_sales") === "true" && (
                    <>
                      <Link to="/pipe_data">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Pipe
                        </span>
                      </Link>
                      <br />
                      <Link to="/pipeTrack">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Pipe Recieve
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("coil_sales") === "true" && (
                    <>
                      <Link to="/coil_sales">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Coil
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("sales_scrap") === "true" && (
                    <>
                      <Link to="/sales_scrap">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Scrap & S/L
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("data_process") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#fmsCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="fmsCollapse"
                style={{ alignItems: "center" }}
                onClick={handleFmsCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Data FMS</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${FmsArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isFmsCollapsed ? "show" : ""
                }`}
                id="fmsCollapse">
                <div className="ms-3">
                  {localStorage.getItem("entry_vehicle") === "true" && (
                    <>
                      <Link to="/entry_vehicle">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Vehicle
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("process_inward") === "true" && (
                    <>
                      <Link to="/process_inward">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Inward
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("production") === "true" && (
                    <>
                      <Link to="/production">
                        <HiMenu size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Production
                        </span>
                      </Link>
                      <br />{" "}
                    </>
                  )}
                  {localStorage.getItem("slitting_process") === "true" && (
                    <>
                      <Link to="/slitting_process">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Slitting
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("failed_challan") === "true" && (
                    <>
                      <Link to="/failed_challan">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Failed Challan
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("process_dispatch") === "true" && (
                    <>
                      <Link to="/process_dispatch">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          JW Dispatch
                        </span>
                      </Link>
                      <br />{" "}
                    </>
                  )}
                  {localStorage.getItem("process_booking") === "true" && (
                    <>
                      <Link to="/process_booking">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Booking
                        </span>
                      </Link>
                      <br />{" "}
                    </>
                  )}
                  {localStorage.getItem("process_sales_dispatch") ===
                    "true" && (
                    <>
                      <Link to="/process_sales_dispatch">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Sales Dispatch
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("sales") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#salesCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="salesCollapse"
                style={{ alignItems: "center" }}
                onClick={handleSalesCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Sales</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${SalesArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isSalesCollapsed ? "show" : ""
                }`}
                id="salesCollapse">
                <div className="ms-3">
                  {localStorage.getItem("booking_sales") === "true" && (
                    <>
                      <Link to="/order_summary">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Summary
                        </span>
                      </Link>
                      <br />
                      <Link to="/booking_sales">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Booking
                        </span>
                      </Link>
                      <br />{" "}
                    </>
                  )}
                  {localStorage.getItem("order") === "true" && (
                    <>
                      <Link to="/order">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Order
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("retantion") === "true" && (
                    <>
                      <Link to="/retantion">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Retantion
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("store_mana") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#storeCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="storeCollapse"
                style={{ alignItems: "center" }}
                onClick={handleStoreCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Store Mgt.</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${StoreArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isStoreCollapsed ? "show" : ""
                }`}
                id="storeCollapse">
                <div className="ms-3">
                  {localStorage.getItem("venderlist") === "true" && (
                    <>
                      <Link to="/vendor_list">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Vendor List
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("budget") === "true" && (
                    <>
                      <Link to="/budget">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Budget
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("purchase") === "true" && (
                    <>
                      <Link to="/purchase">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Purchase
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("itemlist") === "true" && (
                    <>
                      <Link to="/stocklist">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Stock List
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("stocklist") === "true" && (
                    <>
                      <Link to="/storelist">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Stock In
                        </span>
                      </Link>
                      <br />
                    </>
                  )}

                  {localStorage.getItem("issue") === "true" && (
                    <>
                      <Link to="/issuelist">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Issue Item
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("popayment") === "true" && (
                    <>
                      <Link to="/popayment">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          PO Payment
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("approval_sys") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#approvalCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="approvalCollapse"
                style={{ alignItems: "center" }}
                onClick={handleApprovalCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Approval</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${ApprovalArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isApprovalCollapsed ? "show" : ""
                }`}
                id="approvalCollapse">
                <div className="ms-3">
                  <Link to="/approve">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Approve
                    </span>
                  </Link>
                  <br />
                  {localStorage.getItem("poapproved") === "true" && (
                    <>
                      <Link to="/finalapprove">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Final Approve
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("itemapprove") === "true" && (
                    <>
                      <Link to="/itemapproval">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Item Approval
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("history") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#histryCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="histryCollapse"
                style={{ alignItems: "center" }}
                onClick={handleHistoryCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>History</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${HistoryArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isHistoryCollapsed ? "show" : ""
                }`}
                id="histryCollapse">
                <div className="ms-3">
                  <Link to="/history">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      History
                    </span>
                  </Link>
                  <br />
                  {localStorage.getItem("itemapprove") === "true" && (
                    <>
                      <Link to="/itemhistory">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Item
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("warehouse") === "true" && (
            <>
              {localStorage.getItem("warehouse") === "true" && (
                <>
                  <Link to="/mothercoil">
                    <HiMenu size={30} />
                    <span style={{ marginLeft: "0.5rem" }}>Job Work Stock</span>
                  </Link>
                  <br />
                </>
              )}
            </>
          )}
          {localStorage.getItem("hrms") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#hrsmCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="hrsmCollapse"
                style={{ alignItems: "center" }}
                onClick={handleHrmsCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>HRMS</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${HrmsArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isHrmsCollapsed ? "show" : ""
                }`}
                id="hrsmCollapse">
                <div className="ms-3">
                  {localStorage.getItem("devicelist") === "true" && (
                    <>
                      <Link to="/devicelist">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Device List
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("deviceissue") === "true" && (
                    <>
                      <Link to="/deviceissue">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Issue
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                  {localStorage.getItem("devicereturn") === "true" && (
                    <>
                      <Link to="/devicereturn">
                        <AiOutlineCheckCircle size={18} />
                        <span
                          style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                          Return
                        </span>
                      </Link>
                      <br />
                    </>
                  )}
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("challan") === "true" && (
            <>
              <Link
                data-bs-toggle="collapse"
                to="#challanCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="challanCollapse"
                style={{ alignItems: "center" }}
                onClick={handleChallanCollapse}>
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.5rem" }}>Challan</span>
                <HiArrowNarrowRight
                  style={{
                    transform: `rotate(${ChallanArrowRotation}deg)`,
                    transition: "transform 0.3s",
                    marginLeft: "18px",
                    fontSize: "30px",
                    color: "while",
                  }}
                />
              </Link>
              <div
                className={`collapse multi-collapse ${
                  isChallanCollapsed ? "show" : ""
                }`}
                id="challanCollapse">
                <div className="ms-3">
                  <Link to="/source">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Source
                    </span>
                  </Link>
                  <br />
                  <Link to="/good_data">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Good Create
                    </span>
                  </Link>
                  <br />
                  <Link to="/chalan_details">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Challan Details
                    </span>
                  </Link>
                  <br />
                  <Link to="/chalan">
                    <AiOutlineCheckCircle size={18} />
                    <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                      Challan
                    </span>
                  </Link>
                </div>
              </div>
              <br />
            </>
          )}
          {localStorage.getItem("ledger") === "true" && (
            <>
              <Link to="/accounts">
                <HiMenu size={30} />
                <span style={{ marginLeft: "0.2rem", fontSize: "18px" }}>
                  Accounts
                </span>
              </Link>
              <br />
            </>
          )}
        </>
      ) : (
        <a href="/login" style={navBar}>
          Login
        </a>
      )}
    </div>
  );
};

export default Nav_Items;

const navBar = {
  color: "white",
  fontFamily: "Arial",
};
