import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";
import { BiEditAlt } from "react-icons/bi";
const EditEntityViewForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);
  const dispatch = useDispatch();
  var [common_data, setcommon_data] = useState({
    description: data.data.description,
    unit: data.data.unit,
    hsncode: data.data.hsncode,
    id: data.data.id,
    modal: data.data.id + "-" + data.data.description,
  });

  const unit_type = [
    { value: "Kgs", label: "Kgs" },
    { value: "Meter", label: "Meter" },
  ];

  function updatesubmit(event) {
    event.preventDefault();
    api({
      api: "/api/entity/",
      method: "post",
      body: {
        common: common_data,
        post: 2,
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

  return (
    <>
      {modal_id === common_data.modal && (
        <Sweet_Modal show={true} title="Edit Company">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label className="control-label">Description of Goods</label>
                <input
                  type="text"
                  value={common_data.description}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      description: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">HSN Code</label>
                <input
                  type="text"
                  value={common_data.hsncode}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      hsncode: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">Unit</label>
                <Select
                  value={{
                    label: common_data.unit,
                    value: common_data.unit,
                  }}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      unit: e.value,
                    })
                  }
                  options={unit_type}
                />
              </div>
            </div>
            <br />
            <center>
              <button
                className="btn btn-primary btn-sm m-1"
                onClick={updatesubmit}>
                Save
              </button>
            </center>
          </div>
        </Sweet_Modal>
      )}
      <button onClick={() => dispatch(SetModelId(common_data.modal))}>
        <BiEditAlt size={30} />
      </button>
    </>
  );
};

export default EditEntityViewForm;
