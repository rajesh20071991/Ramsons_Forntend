import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const Manpower_Form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      plan_id: 0,
      start_time: "",
      end_time: "",
      shift: "",
      stopage_reasons: "",
      operator: "",
      helper: "",
      running_hrs: "",
      other_reasons: "",
      stoppage: "",
      stamp: "",
      manpower: "",
      planning: "",
      power_cut: "",
    },
  ]);

  var [planninglist, setplanning] = useState([]);
  var [helperlist, sethelper] = useState([]);
  var [operatorlist, setoperator] = useState([]);

  useEffect(() => {
    api({ api: "/storeitem/tubemillman/" }).then((data) => {
      setplanning(data);
    });
    api({ api: "/storeitem/helperlist/" }).then((data) => {
      sethelper(data);
    });
    api({ api: "/storeitem/operatorlist/" }).then((data) => {
      setoperator(data);
    });
  }, []);

  function Senddata(e) {
    e.preventDefault();

    // Array to store error messages for each form entry
    const errorMessages = [];

    // Validate each form entry
    form_data.forEach((data) => {
      if (
        !data.start ||
        !data.end_time ||
        !data.stoppage ||
        !data.stopage_reasons ||
        !data.running_hrs ||
        !data.operator ||
        !data.helper ||
        !data.manpower ||
        !data.planning ||
        !data.power_cut
      ) {
        // Collect error messages for missing fields
        errorMessages.push(`Please fill in all fields for entry ${data.key}`);
      }
    });

    // If there are error messages, display them and prevent form submission
    if (errorMessages.length > 0) {
      errorMessages.forEach((errorMessage) => {
        toast(errorMessage, { autoClose: 2000 });
      });
      return;
    }

    // If the form is valid, proceed with the API call
    api({
      api: "/api/tubeshiftdata/",
      method: "post",
      body: { form: form_data, post: 9 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("Failed", { autoClose: 2000 });
      });
  }

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        plan_id: 0,
        start_time: "",
        end_time: "",
        shift: "",
        stopage_reasons: "",
        operator: "",
        helper: "",
        running_hrs: "",
        other_reasons: "",
        stoppage: "",
        stamp: "",
        manpower: "",
        planning: "",
        power_cut: "",
      };
      setforms([...form_data, form_body]);
    }
  }
  console.log("form_data:", form_data);

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  return (
    <div className="Purchase_form">
      <div
        className="modal fade"
        id="exampleModalToggle1"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                TubeMill Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div
              className="modal-body"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}>
              <div className="main-form">
                {" "}
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
                          }}>
                          <div
                            className="row"
                            style={{ "--bs-gutter-x": " 0rem" }}>
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Plan No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].plan_id = e.value;
                                      form_data[data.key].coil = e.coil;
                                      form_data[data.key].shift = e.Shift;
                                      form_data[data.key].sizes = e.Size;
                                      form_data[data.key].mill = e.mill;
                                      setforms([...form_data]);
                                    }}
                                    options={planninglist}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Shift</label>
                                  <input
                                    type="text"
                                    placeholder="Shift"
                                    className="form-control"
                                    value={form_data[data.key].shift}
                                    onChange={(e) => {
                                      form_data[data.key].shift =
                                        e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Coil No."
                                    className="form-control"
                                    value={form_data[data.key].coil}
                                    onChange={(e) => {
                                      form_data[data.key].coil = e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    className="form-control"
                                    value={form_data[data.key].sizes}
                                    onChange={(e) => {
                                      form_data[data.key].sizes =
                                        e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Mill No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Mill No."
                                    className="form-control"
                                    value={form_data[data.key].mill}
                                    onChange={(e) => {
                                      form_data[data.key].mill = e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 row">
                              <div className="col-md-2">
                                <label className="control-label">
                                  Start Time
                                </label>
                                <input
                                  type="date"
                                  onChange={(e) => {
                                    form_data[data.key].start = e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  End Time
                                </label>
                                <input
                                  type="date"
                                  onChange={(e) => {
                                    form_data[data.key].end_time =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Stoppage Re. Time
                                </label>
                                <input
                                  type="text"
                                  placeholder="Stoppage Reasons Time"
                                  onChange={(e) => {
                                    form_data[data.key].stoppage =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-3">
                                <label className="control-label">
                                  Stoppage Reasons
                                </label>
                                <input
                                  type="text"
                                  placeholder="Stoppage Reasons"
                                  onChange={(e) => {
                                    form_data[data.key].stopage_reasons =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Running Hours
                                </label>
                                <input
                                  type="number"
                                  step="0.001"
                                  placeholder="Running Hours"
                                  onChange={(e) => {
                                    form_data[data.key].running_hrs =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Operator Name
                                </label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].operator = e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={operatorlist}
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Helper Name
                                </label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].helper = e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={helperlist}
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Manpower Short
                                </label>
                                <input
                                  type="number"
                                  placeholder="Manpower Short"
                                  className="form-control"
                                  onChange={(e) => {
                                    form_data[data.key].manpower =
                                      e.target.value;
                                  }}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  No Planning Time
                                </label>
                                <input
                                  type="text"
                                  placeholder="No Planning Time"
                                  className="form-control"
                                  onChange={(e) => {
                                    form_data[data.key].planning =
                                      e.target.value;
                                  }}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Power cut
                                </label>
                                <input
                                  type="text"
                                  placeholder="Power cut"
                                  className="form-control"
                                  onChange={(e) => {
                                    form_data[data.key].power_cut =
                                      e.target.value;
                                  }}
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
                  <input
                    id="submit"
                    type="submit"
                    className="btn btn-success border-secondary"
                    onClick={Senddata}
                    value="Submit"
                  />
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
