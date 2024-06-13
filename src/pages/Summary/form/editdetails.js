import React, { useState } from "react";
import { toast } from "react-toastify";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { api } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const EditDetailsFrom = (data) => {
  var modal_id = useSelector((state) => state.model.id);
  const dispatch = useDispatch();
  const Type = [
    { value: "Purchase", label: "Purchase" },
    { value: "Sales", label: "Sales" },
    { value: "Store", label: "Store" },
    { value: "Job Work", label: "Job Work" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Office", label: "Office" },
  ];

  const Sub_Type = [
    { parent: "Purchase", value: "Purchase", label: "Purchase" },
    { parent: "Sales", value: "Sales", label: "Sales" },
    { parent: "Job Work", value: "Job Work", label: "Job Work" },
    { parent: "Store", value: "TubeMill", label: "TubeMill" },
    { parent: "Store", value: "Slitting", label: "Slitting" },
    { parent: "Store", value: "Polish", label: "Polish" },
    { parent: "Store", value: "Gas", label: "Gas" },
    { parent: "Maintenance", value: "TubeMill", label: "TubeMill" },
    { parent: "Maintenance", value: "Slitting", label: "Slitting" },
    { parent: "Maintenance", value: "Polish", label: "Polish" },
    { parent: "Maintenance", value: "Electricity", label: "Electricity" },
    { parent: "Office", value: "Frieght", label: "Frieght" },
    { parent: "Office", value: "Salary", label: "Salary" },
    { parent: "Office", value: "Expense", label: "Expense" },
    { parent: "Office", value: "Marketing", label: "Marketing" },
    { parent: "Office", value: "Interset", label: "Interset" },
  ];

  var [common_data, setcommon_data] = useState({
    id: data.data.id,
    date: data.data.date,
    quantity: data.data.quantity,
    subtype: data.data.subtype,
    type: data.data.type,
    amount: data.data.amount,
    modal: data.data.id + "-" + data.data.date,
  });

  function updatesubmit(e) {
    e.preventDefault();
    api({
      api: "/api/saccounts/",
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

  return (
    <>
      {modal_id === common_data.modal && (
        <Sweet_Modal show={true} title="Edit Company">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <label className="control-label">Date</label>
                <input
                  type="date"
                  value={common_data.date}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      date: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">Type</label>
                <Select
                  value={{
                    label: common_data.type,
                    value: common_data.type,
                  }}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      type: e.value,
                    })
                  }
                  options={Type}
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">Sub Type</label>
                <Select
                  value={{
                    label: common_data.subtype,
                    value: common_data.subtype,
                  }}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      subtype: e.value,
                    })
                  }
                  options={Sub_Type}
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">Quantity</label>
                <input
                  type="number"
                  step="0.01"
                  value={common_data.quantity}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      quantity: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={common_data.amount}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      amount: e.target.value,
                    })
                  }
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
        Edit
      </button>
    </>
  );
};

export default EditDetailsFrom;
