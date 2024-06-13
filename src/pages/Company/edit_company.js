import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { statelist } from "../../services/constant";
import { api } from "../../services/api";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";

const EditCompanyViewForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);
  const dispatch = useDispatch();
  var [common_data, setcommon_data] = useState({
    person_name: data.data.person_name,
    company_name: data.data.company_name,
    gst_no: data.data.gst_no,
    emailid: data.data.emailid,
    phone_no: data.data.phone_no,
    alternate_no: data.data.alternate_no,
    address: data.data.address,
    city: data.data.city,
    state: data.data.state,
    pincode: data.data.pincode,
    id: data.data.id,
    modal: data.data.id + "-" + data.data.person_name,
  });

  function updatesubmit(event) {
    event.preventDefault();
    api({
      api: "/api/company/",
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
              <div className="col-md-4">
                <label className="control-label">Person Name</label>
                <input
                  type="text"
                  value={common_data.person_name}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      person_name: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">Company Name</label>
                <input
                  type="text"
                  value={common_data.company_name}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      company_name: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">GST No.</label>
                <input
                  type="text"
                  value={common_data.gst_no}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      gst_no: e.target.value,
                    })
                  }
                  className="form-control"
                  minLength="15"
                  maxLength="15"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">Email ID</label>
                <input
                  type="email"
                  value={common_data.emailid}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      emailid: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label className="control-label">Phone No.</label>
                <input
                  type="number"
                  value={common_data.phone_no}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      phone_no: e.target.value,
                    })
                  }
                  className="form-control"
                  minLength="10"
                  maxLength="10"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Alternate No.</label>
                <input
                  type="number"
                  value={common_data.alternate_no}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      alternate_no: e.target.value,
                    })
                  }
                  maxLength="10"
                  minLength="10"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <label className="control-label">Address</label>
                <input
                  rows="5"
                  value={common_data.address}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      address: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">City</label>
                <input
                  type="text"
                  value={common_data.city}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      city: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">State</label>
                <Select
                  value={{
                    label: common_data.state,
                    value: common_data.state,
                  }}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      state: e.value,
                    })
                  }
                  options={statelist}
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Pin Code</label>
                <input
                  type="number"
                  value={common_data.pincode}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      pincode: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                  minLength="6"
                  maxLength="6"
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

export default EditCompanyViewForm;
