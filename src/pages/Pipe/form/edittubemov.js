import React, { useState } from "react";
import { toast } from "react-toastify";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { api } from "../../../services/api";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
const EditTubemillMoveForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);

  const dispatch = useDispatch();

  var [common_data, setcommon_data] = useState({
    pipe: data.data.noofpipe,
    weight: data.data.weight,
    straightness: data.data.straightness,
    surface_quality: data.data.surface_quality,
    tagging: data.data.tagging,
    remarks: data.data.remarks,
    welding_quality: data.data.welding_quality,
    handling: data.data.handling,
    id: data.data.id,
    modal: data.data.id + "-" + "101",
  });

  function handelsubmit(e) {
    e.preventDefault();
    api({
      api: "/api/tubeshiftdata/",
      method: "post",
      body: { common: common_data, post: 5 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  const status1 = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const status2 = [
    { value: "Ok", label: "Ok" },
    { value: "Not Ok", label: "Not Ok" },
  ];

  function closeModal() {
    dispatch(SetModelId(0));
  }
  return (
    <>
      {modal_id === common_data.modal && (
        <Sweet_Modal show={true} title="Edit Movement">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <label className="control-label">Pipe Weight</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="Pipe Weight"
                  value={common_data.weight}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      weight: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Pipe</label>
                <input
                  type="number"
                  step="0.001"
                  value={common_data.pipe}
                  placeholder="No of Pipe"
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      pipe: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Remarks</label>
                <input
                  type="text"
                  value={common_data.remarks}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      remarks: e.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label"> Welding Quality</label>
                <Select
                  value={{
                    label: common_data.welding_quality,
                    value: common_data.welding_quality,
                  }}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      welding_quality: e.value,
                    });
                  }}
                  options={status2}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Surface Quality</label>
                <Select
                  value={{
                    label: common_data.surface_quality,
                    value: common_data.surface_quality,
                  }}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      surface_quality: e.value,
                    });
                  }}
                  options={status2}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Handling</label>
                <Select
                  value={{
                    label: common_data.handling,
                    value: common_data.handling,
                  }}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      handling: e.value,
                    });
                  }}
                  options={status2}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Straightness</label>
                <Select
                  value={{
                    label: common_data.straightness,
                    value: common_data.straightness,
                  }}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      straightness: e.value,
                    });
                  }}
                  options={status2}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Tagging</label>
                <Select
                  value={{
                    label: common_data.tagging,
                    value: common_data.tagging,
                  }}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      tagging: e.value,
                    });
                  }}
                  options={status1}
                  required
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

export default EditTubemillMoveForm;
