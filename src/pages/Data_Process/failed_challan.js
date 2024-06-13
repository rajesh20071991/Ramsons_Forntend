import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Failed_Challan_Process_Col } from "../../components/Columns/tracking_process";
import { useSelector } from "react-redux";
import { GetFailedProcessData } from "../../redux/actions/data_processAction";
import { useDispatch } from "react-redux";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import { Formate_Date_Time } from "../../components/Common/datetime";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "react-select";

const Failed_Challan = () => {
  var data = useSelector((state) => state.DataProcessData.failedProcess_data);
  var modal_id = useSelector((state) => state.model.id);
  var userData = useSelector((state) => state.authData.user);

  const [filtr, setFilterModal] = useState({
    name: "",
    id: "",
  });
  function Apply() {
    dispatch(GetFailedProcessData(userData.username, filtr.name, filtr.id));
    closeModal();
  }

  const [refreshCount, refreshPage] = React.useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFailedProcessData(userData.username, filtr.name, filtr.id));
  }, [refreshCount]);

  const [modalData, setModalData] = React.useState({
    id: 0,
    step: "",
  });
  const [type, setType] = useState("Passed");

  function submitdata(e) {
    e.preventDefault();
    var id = modalData.id;
    var step = modalData.step;
    var coil = modalData.coil_id;
    var companyid = modalData.company;
    var inwardid = modalData.inward;
    if (modalData.step === "Step-3") {
      var singledata = {
        status: e.target.status.value,
        actual_time: Formate_Date_Time,
        status_h: e.target.status_h.value,
        remarks: e.target.remarks.value,
        challan_not_clear: e.target.challan_not_clear.value,
        weight_mismatch: e.target.weight_mismatch.value,
        grade_mismatch: e.target.grade_mismatch.value,
        coil_damage: e.target.coil_damage.value,
        thickness_mismatch: e.target.thickness_mismatch.value,
        store_id: coil,
        step: step,
        id: id,
        company_id: companyid,
        data: "passed",
        inward_id: inwardid,
      };
    } else if (step === "Step-1" || step === "Step-2") {
      var singledata = {
        status: e.target.status.value,
        actual_time: Formate_Date_Time,
        store_id: coil,
        company_id: companyid,
        id: id,
        inward_id: inwardid,
        data: "Inward",
        step: step,
      };
    }
    api({
      api: "/api/failed_challan/",
      method: "post",
      body: singledata,
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  function openModal(row) {
    setModalData({
      ...modalData,
      id: row.id,
      step: row.step,
      coil_id: row.store_id,
      company: row.company_id,
      inward: row.inward_id,
    });
    dispatch(SetModelId(2));
  }

  function closeModal() {
    dispatch(SetModelId(0));
    refreshPage(refreshCount + refreshCount);
  }

  return (
    <div className="Failed_Challan">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#Failed Challan</h4>
              <div className="ms-auto filter-component d-flex">
                <button
                  className="btn btn-danger ms-1"
                  size="15px"
                  onClick={(e) => {
                    dispatch(SetModelId(1));
                  }}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
          {data && (
            <DataTable
              columns={Failed_Challan_Process_Col}
              data={data}
              selectableRowsComponent={Checkbox}
              dense
              pointerOnHover
              selectableRows
              striped={true}
              persistTableHead
              responsive={true}
              onRowClicked={(row) => openModal(row)}
            />
          )}
        </div>
        <div>
          {modal_id === 2 && (
            <Sweet_Modal show={true} title="Submit">
              <form className="p-3" onSubmit={submitdata}>
                {/* <center>
                <samp className="text-primary">
                  <h4>Coil No-{modalData.ramId}</h4>
                </samp>
              </center> */}
                {modalData.step === "Step-1" && (
                  <div>
                    <div className="form-group">
                      <label className="control-label">Status</label>
                      <select className="form-control" id="status">
                        <option value="Done">Done</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                )}
                {modalData.step === "Step-2" && (
                  <div>
                    <div className="form-group">
                      <label className="control-label">Status</label>
                      <select className="form-control" id="status">
                        <option value="Done">Done</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                )}
                {modalData.step === "Step-3" && (
                  <div>
                    <div className="form-group">
                      <label className="control-label">Status</label>
                      <select className="form-control" id="status">
                        <option value="Done">Done</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Status</label>
                      <select
                        className="form-control"
                        id="status_h"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="Passed">Passed</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Remarks</label>
                      <input
                        type="text"
                        id="remarks"
                        placeholder="Remarks"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label">
                        Challan not clear/ descriptive enough
                      </label>
                      <select className="form-control" id="challan_not_clear">
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label">
                        Weight mismatch with challan weight
                      </label>
                      <select className="form-control" id="weight_mismatch">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label">
                        Grade mismatch with Challan grade
                      </label>
                      <select className="form-control" id="grade_mismatch">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Coil damaged</label>
                      <select className="form-control" id="coil_damage">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label">
                        hickness mismatch with challan thickness
                      </label>
                      <select className="form-control" id="thickness_mismatch">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                )}
                <center>
                  <button
                    onClick={closeModal}
                    className="btn btn-md btn-danger m-3"
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    value="Save"
                    className="btn btn-primary btn-md m-3"
                  />
                </center>
              </form>
            </Sweet_Modal>
          )}
          {modal_id === 1 && (
            <Sweet_Modal show={true} title="Apply filter">
              <Select
                className="form-control m-1"
                onChange={(e) => setFilterModal({ ...filtr, name: e.value })}
                // options={companyNames}
              />
              <div className="modal_bottom text-center">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() =>
                    setFilterModal({
                      name: "",
                      id: "",
                    })
                  }
                >
                  Reset
                </button>
                <button className="btn btn-primary btn-sm ms-2" onClick={Apply}>
                  Apply
                </button>
              </div>
            </Sweet_Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Failed_Challan;
