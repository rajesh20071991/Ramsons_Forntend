import React, { useEffect, useState } from "react";
import { sizeListType } from "../../../services/constant";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const PipeStock_form = () => {
  const Brand = [
    { value: "Ramsons Stainless", label: "Ramsons Stainless" },
    { value: "Duromax", label: "Duromax" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const status = [
    { value: "Regular", label: "Regular" },
    { value: "On Order", label: "On Order" },
  ];

  function Senddata() {
    api({
      api: "/api/stock/",
      method: "post",
      body: {
        form: form_data,
        post: 1,
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

  var [form_data, setforms] = useState([
    {
      key: 0,
      type: "",
      size: "",
      brand: "",
      thickness: "",
      grade: "",
      status: "",
      max: "",
      width: "",
      single: "",
      length: 20,
      ppipe: "",
      npipe: "",
    },
  ]);

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        type: "",
        size: "",
        brand: "",
        thickness: "",
        grade: "",
        status: "",
        max: "",
        width: "",
        single: "",
        length: 20,
        ppipe: "",
        npipe: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  // remove
  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  return (
    <div className="Purchase_form">
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
                Pipe Stock
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
                {/* common form */}
                <br />
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
                          <div
                            className="row"
                            style={{ "--bs-gutter-x": " 0rem" }}
                          >
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-3">
                                  <label className="control-label">Type</label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].brand = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={Brand}
                                    required
                                  />
                                </div>
                                <div className="col-md-1">
                                  <label className="control-label">Size</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                      form_data[data.key].size = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    required
                                  />
                                </div>
                                <div className="col-md-1">
                                  <label className="control-label">
                                    Thickness
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                      form_data[data.key].thickness =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    required
                                  />
                                </div>
                                <div className="col-md-1">
                                  <label className="control-label">Grade</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                      form_data[data.key].grade =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    required
                                  />
                                </div>
                                <div className="col-md-1">
                                  <label className="control-label">
                                    Length
                                  </label>
                                  <input
                                    type="number"
                                    value={form_data[data.key].length || "20"}
                                    placeholder="Length"
                                    onChange={(e) => {
                                      form_data[data.key].length =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Status
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].status = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={status}
                                    require
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Max level
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Max Level"
                                    onChange={(e) => {
                                      form_data[data.key].max = e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-12 row">
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Width
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Width"
                                      onChange={(e) => {
                                        form_data[data.key].width =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Per Pipe Weight
                                    </label>
                                    <input
                                      type="number"
                                      step="0.01"
                                      placeholder="Per Pipe Weight"
                                      onChange={(e) => {
                                        form_data[data.key].single =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Polish Pipe
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Polish Pipe"
                                      onChange={(e) => {
                                        form_data[data.key].ppipe =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Non Polish Pipe
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Non Polish Pipe"
                                      onChange={(e) => {
                                        form_data[data.key].npipe =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
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
                          </div>
                        </form>
                      </div>
                    );
                  })}
                <br />
                {/* end inner forms */}

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
    </div>
  );
};
