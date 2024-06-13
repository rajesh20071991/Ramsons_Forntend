import React, { useState } from "react";
import { toast } from "react-toastify";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { api } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";

const EditPurchaseAccForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);
  const dispatch = useDispatch();

  var [common_data, setcommon_data] = useState({
    code: data.data.code,
    amount: data.data.amount,
    final: data.data.final,
    verified: "",
    id: data.data.id,
    modal: data.data.id + "-" + data.data.budget_id.type,
  });

  function handelsubmit(e) {
    e.preventDefault();
    api({
      api: "/api/poentyview/",
      method: "post",
      body: { common: common_data, post: 1 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  function closeModal() {
    dispatch(SetModelId(0));
  }
  return (
    <>
      {modal_id === common_data.modal && (
        <Sweet_Modal show={true} title="Submit Amount">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <label className="control-label">PO Number</label>
                <input
                  className="form-control"
                  value={common_data.code}
                  onChange={(e) => {
                    common_data.type = e.value;
                    common_data.subtype = "";
                    setcommon_data({ ...common_data });
                  }}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={common_data.amount}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      amount: e.target.value,
                    })
                  }
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      verified: e.target.value,
                    })
                  }
                />
                {common_data.amount === "" ? <></> : <></>}
              </div>
            </div>
            <br />
            {/* bottom */}
            <center>
              <button
                className="btn btn-warning btn-sm m-1"
                onClick={() => closeModal()}
              >
                Close
              </button>
              <button
                className="btn btn-primary btn-sm m-1"
                onClick={handelsubmit}
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

export default EditPurchaseAccForm;
