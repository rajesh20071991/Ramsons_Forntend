import React, { useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import { statelist } from "../../../services/constant";

export const Source_Form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      person_name: "",
      company_name: "",
      gst_no: "",
      emailid: "",
      phone_no: "",
      alternate_no: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  ]);

  console.log(form_data);
  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/source/",
      method: "post",
      body: { post: 1, form: form_data },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        person_name: "",
        company_name: "",
        gst_no: "",
        emailid: "",
        phone_no: "",
        alternate_no: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  return (
    <div className="company_details">
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Company Create
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div
              className="modal-body"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="main-form">
                {/* inner forms */}
                {form_data.length > 0 &&
                  form_data.map((data) => {
                    return (
                      <div key={data.key}>
                        <form
                          key={data.key}
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddForm(data.key);
                          }}
                        >
                          <div className="row">
                            <div
                              className="col-md-1"
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <div className="mt-4">
                                <div
                                  className="btn-group"
                                  role="group"
                                  aria-label="First group"
                                >
                                  <label className="btn btn-sm btn-outline-secondary">
                                    {data.key}
                                  </label>
                                  <button
                                    type="submit"
                                    className="btn btn-sm btn-outline-secondary"
                                  >
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/128/1828/1828819.png"
                                      width="15"
                                      height="15"
                                      alt="+"
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => handleRemoveForm(data.key)}
                                  >
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/128/5974/5974771.png"
                                      width="15"
                                      height="15"
                                      alt="-"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-11 row">
                              <div className="col-md-2">
                                <label className="control-label">
                                  Person Name
                                </label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].person_name =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].company_name =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">GST No.</label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].gst_no = e.target.value;
                                  }}
                                  className="form-control"
                                  minLength="15"
                                  maxLength="15"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Email ID
                                </label>
                                <input
                                  type="email"
                                  onChange={(e) => {
                                    form_data[data.key].emailid =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Phone No.
                                </label>
                                <input
                                  type="number"
                                  onChange={(e) => {
                                    form_data[data.key].phone_no =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                  minLength="10"
                                  maxLength="10"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Alternate No.
                                </label>
                                <input
                                  type="number"
                                  onChange={(e) => {
                                    form_data[data.key].alternate_no =
                                      e.target.value;
                                  }}
                                  maxLength="10"
                                  minLength="10"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-2">
                                <label className="control-label">Address</label>
                                <input
                                  rows="5"
                                  onChange={(e) => {
                                    form_data[data.key].address =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">City</label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].city = e.target.value;
                                  }}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">State</label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].state =
                                      e.value;
                                  }}
                                  options={statelist}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Pin Code
                                </label>
                                <input
                                  type="number"
                                  onChange={(e) => {
                                    form_data[data.key].pincode =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                  required
                                  minLength="6"
                                  maxLength="6"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    );
                  })}

                {/* end inner forms */}
                <br />
                <center>
                  <>
                    <input
                      id="submit"
                      type="submit"
                      className="btn btn-success border-secondary"
                      onClick={Senddata}
                      value="Submit"
                    />
                  </>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
