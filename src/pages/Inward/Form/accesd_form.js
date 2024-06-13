import React, { useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const Accessories_form = () => {
  const status = [
    { value: "Grade", label: "Grade" },
    { value: "Thickness", label: "Thickness" },
    { value: "Mill", label: "Mill" },
    { value: "Operator", label: "Operator" },
    { value: "Helper", label: "Helper" },
    { value: "Remarks", label: "Remarks" },
  ];

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/account/",
      method: "post",
      body: { form: form_data },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }
  var [form_data, setforms] = useState([
    {
      key: 0,
      name: "",
      status: "",
    },
  ]);

  console.log(form_data);

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        name: "",
        status: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }
  return (
    <div className="Item-form">
      <div
        className="modal fade"
        id="exampleModalToggle1"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Item Add
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
              {form_data.length > 0 &&
                form_data.map((data) => {
                  return (
                    <div key={data.key}>
                      <form
                        key={data.key}
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddForm(data.key);
                        }}>
                        <div
                          className="row"
                          style={{ "--bs-gutter-x": " 0rem" }}>
                          <div className="col-md-10">
                            <div className="row">
                              <div className="col-md-6">
                                <label className="control-label">Name</label>
                                <input
                                  rows="5"
                                  onChange={(e) => {
                                    form_data[data.key].name = e.target.value;
                                  }}
                                  placeholder="Item Name"
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-5">
                                <label className="control-label">Status</label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].status = e.value;
                                  }}
                                  options={status}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-md-1"
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                            <div className="mt-4">
                              <div
                                className="btn-group"
                                role="group"
                                aria-label="First group">
                                <label className="btn btn-sm btn-outline-secondary">
                                  {data.key}
                                </label>
                                <button
                                  type="submit"
                                  className="btn btn-sm btn-outline-secondary">
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
                                  onClick={() => handleRemoveForm(data.key)}>
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
                        </div>
                      </form>
                    </div>
                  );
                })}
              <br />
              <input
                id="submit"
                type="submit"
                className="btn btn-success"
                onClick={Senddata}
                value="Submit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Accessories2_form = () => {
  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/account/",
      method: "post",
      body: { form: form_data, status: "Reference" },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }
  var [form_data, setforms] = useState([
    {
      key: 0,
      name: "",
    },
  ]);

  console.log(form_data);

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        name: "",
        status: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }
  return (
    <div className="Item-form">
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Item Add
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
              {form_data.length > 0 &&
                form_data.map((data) => {
                  return (
                    <div key={data.key}>
                      <form
                        key={data.key}
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddForm(data.key);
                        }}>
                        <div
                          className="row"
                          style={{ "--bs-gutter-x": " 0rem" }}>
                          <div className="col-md-10">
                            <div className="row">
                              <div className="col-md-10">
                                <label className="control-label">Name</label>
                                <input
                                  rows="5"
                                  onChange={(e) => {
                                    form_data[data.key].name = e.target.value;
                                  }}
                                  placeholder="Item Name"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-md-1"
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                            <div className="mt-4">
                              <div
                                className="btn-group"
                                role="group"
                                aria-label="First group">
                                <label className="btn btn-sm btn-outline-secondary">
                                  {data.key}
                                </label>
                                <button
                                  type="submit"
                                  className="btn btn-sm btn-outline-secondary">
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
                                  onClick={() => handleRemoveForm(data.key)}>
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
                        </div>
                      </form>
                    </div>
                  );
                })}
              <br />
              <input
                id="submit"
                type="submit"
                className="btn btn-success"
                onClick={Senddata}
                value="Submit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
