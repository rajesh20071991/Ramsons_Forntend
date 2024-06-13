import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";

const EditDuromaxStockForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);
  const dispatch = useDispatch();
  var [common_data, setcommon_data] = useState({
    grade: data.data.grade,
    thickness: data.data.thickness,
    size: data.data.size,
    pweight: data.data.pweight,
    nweight: data.data.nweight,
    status: data.data.status,
    length: data.data.length,
    width: data.data.width,
    max: data.data.max,
    single: data.data.single,
    ppipe: data.data.ppipe,
    npipe: data.data.npipe,
    id: data.data.id,
    modal: data.data.id + "-" + data.data.size,
  });

  const status = [
    { value: "Regular", label: "Regular" },
    { value: "On Order", label: "On Order" },
  ];

  function updatesubmit(event) {
    event.preventDefault();
    api({
      api: "/api/stock/",
      method: "post",
      body: {
        common: common_data,
        post: 4,
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
        <Sweet_Modal show={true} title="Edit Pipe Stock">
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <label className="control-label text-left">Size</label>
                <input
                  type="text"
                  className="form-control"
                  value={common_data.size}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      size: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="control-label text-left">Thickness</label>
                <input
                  type="text"
                  className="form-control"
                  value={common_data.thickness}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      thickness: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="control-label text-left">Grade</label>
                <input
                  type="text"
                  className="form-control"
                  value={common_data.grade}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      grade: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Status</label>
                <Select
                  value={{
                    label: common_data.status,
                    value: common_data.status,
                  }}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      status: e.value,
                    })
                  }
                  options={status}
                  require
                />
              </div>
              <div className="col-md-3">
                <label className="control-label text-left">Length</label>
                <input
                  type="number"
                  className="form-control"
                  value={common_data.length}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      length: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="control-label text-left">Width</label>
                <input
                  type="number"
                  className="form-control"
                  value={common_data.width}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      width: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label text-left">
                  Per Pipe Weight
                </label>
                <input
                  type="number"
                  step="0.001"
                  className="form-control"
                  value={common_data.single}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      single: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label text-left">Max Level</label>
                <input
                  type="number"
                  step="0.001"
                  className="form-control"
                  value={common_data.max}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      max: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="control-label text-left">Polish Pipe</label>
                <input
                  type="number"
                  step="0.001"
                  className="form-control"
                  value={common_data.ppipe}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      ppipe: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label text-left">
                  Non Polish Pipe
                </label>
                <input
                  type="number"
                  step="0.001"
                  className="form-control"
                  value={common_data.npipe}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      npipe: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label text-left">Polish Weight</label>
                <input
                  type="number"
                  step="0.001"
                  className="form-control"
                  value={common_data.pweight}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      pweight: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label text-left">
                  Non Polish Weight
                </label>
                <input
                  type="number"
                  step="0.001"
                  className="form-control"
                  value={common_data.nweight}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      nweight: e.target.value,
                    })
                  }
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
        Edit
      </button>
    </>
  );
};

export default EditDuromaxStockForm;
