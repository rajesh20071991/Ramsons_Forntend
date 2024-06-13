import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const EditStatusENViewForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);
  const dispatch = useDispatch();
  var [common_data, setcommon_data] = useState({
    status: "",
    id: data.data.id,
    modal: data.data.id + "-" + data.data.description,
  });

  function updatesubmit(event) {
    event.preventDefault();
    api({
      api: "/api/source/",
      method: "post",
      body: {
        common: common_data,
        post: 6,
      },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  const status = [{ value: "Cancelled", label: "Cancelled" }];

  return (
    <>
      {modal_id === common_data.modal && (
        <Sweet_Modal show={true} title="Submit">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label className="control-label">Status</label>
                <Select
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      status: e.value,
                    })
                  }
                  options={status}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <br />
            <center>
              <button
                className="btn btn-primary btn-sm m-1"
                onClick={updatesubmit}
              >
                Save
              </button>
            </center>
          </div>
        </Sweet_Modal>
      )}
      <button
        className="btn btn-warning btn-sm"
        onClick={() => dispatch(SetModelId(common_data.modal))}
      >
        Status
      </button>
    </>
  );
};

export default EditStatusENViewForm;
