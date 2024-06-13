import React, { useState } from "react";
import { toast } from "react-toastify";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { api } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { IoIosAddCircle } from "react-icons/io";
const PaymentFrom = (data) => {
  var modal_id = useSelector((state) => state.model.id);
  const dispatch = useDispatch();
  var [common_data, setcommon_data] = useState({
    id: data.data.id,
    date: "",
    invoice: data.data.invoice,
    amount:
      Number(data.data.amount).toFixed(2) -
      Number(data.data.payment).toFixed(2),
    modal: data.data.id + "-" + data.data.date + "33",
  });

  function updatesubmit(e) {
    e.preventDefault();
    api({
      api: "/api/amount/",
      method: "post",
      body: { common: common_data, post: 3 },
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
        <Sweet_Modal show={true} title="Payment Update">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label className="control-label">Invoice No.</label>
                <input
                  type="text"
                  value={common_data.invoice}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      invoice: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                  disabled
                />
              </div>
              <div className="col-md-5">
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
                onClick={updatesubmit}>
                Save
              </button>
            </center>
          </div>
        </Sweet_Modal>
      )}
      <button onClick={() => dispatch(SetModelId(common_data.modal))}>
        <IoIosAddCircle size={30} />
      </button>
    </>
  );
};

export default PaymentFrom;
