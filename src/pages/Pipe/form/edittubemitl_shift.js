import React, { useState } from "react";
import { toast } from "react-toastify";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { api } from "../../../services/api";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
const EditTubemillshiftForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);

  const dispatch = useDispatch();

  var [common_data, setcommon_data] = useState({
    plan_id: data.data.planId,
    start_time: data.data.start_time,
    end_time: data.data.end_time,
    shift: data.data.shift,
    crane_weight: data.data.crane_weight,
    pipe_weight: data.data.pipe_weight,
    total_pipe: data.data.total_pipe,
    hole_pipe: data.data.hole_pipe,
    scrap_weight: data.data.scrap_weight,
    hweight: data.data.hweight,
    short_length: data.data.short_length,
    short_weight: data.data.short_weight,
    stopage_reasons: data.data.stopage_reasons,
    operator: data.data.operator_name,
    helper: data.data.helper_name,
    running_hrs: data.data.running_hrs,
    other_reasons: data.data.other_reasons,
    stoppage: data.data.stoppage,
    power_cut: data.data.power_cut,
    planning: data.data.planning,
    manpower: data.data.manpower,
    id: data.data.id,
    modal: data.data.id + "-" + "100",
  });

  function handelsubmit(e) {
    e.preventDefault();
    api({
      api: "/api/tubeshiftdata/",
      method: "post",
      body: { common: common_data, post: 2 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  const shift = [
    { value: "Shift A", label: "Shift A" },
    { value: "Shift B", label: "Shift B" },
  ];

  function closeModal() {
    dispatch(SetModelId(0));
  }
  return (
    <>
      {modal_id === common_data.modal && (
        <Sweet_Modal show={true} title="Edit Tubemill Shift">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <label className="control-label">Start Time</label>
                <input
                  type="date"
                  value={common_data.start_time}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      start_time: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">End Time</label>
                <input
                  type="date"
                  value={common_data.end_time}
                  onChange={(e) => {
                    common_data.endtime = e.target.value;
                    setcommon_data([...common_data]);
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Shift</label>
                <Select
                  value={{
                    label: common_data.shift,
                    value: common_data.shift,
                  }}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      shift: e.value,
                    });
                  }}
                  options={shift}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Actual Weight</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="Weight"
                  value={common_data.crane_weight}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      crane_weight: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Pipe Weight</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="Pipe Weight"
                  value={common_data.pipe_weight}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      pipe_weight: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Total Pipe</label>
                <input
                  type="number"
                  step="0.001"
                  value={common_data.total_pipe}
                  placeholder="No of Pipe"
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      total_pipe: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Scrap Weight</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="Scrap Weight"
                  value={common_data.scrap_weight}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      scrap_weight: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Hole Pipe</label>
                <input
                  type="number"
                  placeholder="Hole Pipe"
                  value={common_data.hole_pipe}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      hole_pipe: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Hole Weight</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="Hole Weight"
                  value={common_data.hweight}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      hweight: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Short Length</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="Short Length"
                  value={common_data.short_length}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      short_length: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">S/L Weight</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="Short Length Weight"
                  value={common_data.short_weight}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      short_weight: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Stoppage Time</label>
                <input
                  type="text"
                  placeholder="Stoppage Reasons Time"
                  value={common_data.stoppage}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      stoppage: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Stoppage Reasons</label>
                <input
                  type="text"
                  placeholder="Stoppage Reasons"
                  value={common_data.stopage_reasons}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      stopage_reasons: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label"> Manpower Short</label>
                <input
                  type="text"
                  placeholder=" Manpower Short"
                  value={common_data.manpower}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      manpower: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">No Planning Time</label>
                <input
                  type="text"
                  placeholder="No Planning Time"
                  value={common_data.planning}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      planning: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Power cut</label>
                <input
                  type="text"
                  placeholder="Power cut"
                  value={common_data.power_cut}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      power_cut: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Running Hours</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="Running Hours"
                  value={common_data.running_hrs}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      running_hrs: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Operator Name</label>
                <input
                  type="text"
                  placeholder="Operator Name"
                  className="form-control"
                  value={common_data.operator}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      operator: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Helper Name</label>
                <input
                  type="text"
                  placeholder="Helper Name"
                  className="form-control"
                  value={common_data.helper}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      helper: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <br />
            {/* bottom */}
            <center>
              <button
                className="btn btn-warning btn-sm m-1"
                onClick={() => closeModal()}>
                Close
              </button>
              <button
                className="btn btn-primary btn-sm m-1"
                onClick={handelsubmit}>
                Save
              </button>
            </center>
          </div>
        </Sweet_Modal>
      )}
      <button onClick={() => dispatch(SetModelId(common_data.modal))}>
        <AiFillEdit size={30} />
      </button>
    </>
  );
};

export default EditTubemillshiftForm;
