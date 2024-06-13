import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import { Formate_Date_Time } from "../../../components/Common/datetime";
import { Progress } from "antd";
export const Create_slitting_form = () => {
  var [vedorlistNames, setVendorlist] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  useEffect(() => {
    api({ api: "/storeitem/plancoil/" }).then((data) => {
      setVendorlist(data);
    });
  }, []);
  function Senddata() {
    setIsSubmitting(true);
    api({
      api: "/api/slitting/",
      method: "post",
      body: {
        form: form_data,
        post: 2,
        date: Formate_Date_Time,
        step: "Step-3",
      },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        setFormSubmitted(true);
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      })
      .finally(() => {
        setIsSubmitting(false); // Submitting finished
      });
  }

  var [form_data, setforms] = useState([
    {
      key: 0,
      plan_no: "",
      widths: "",
      comment: "",
      company: "",
      companyid: "",
      value: "",
      weight: 0,
      remai_weight: 0,
      remai_width: 0,
      status: "",
      scrap: 0,
      paper: 0,
      seelve: 0,
      actualweight: 0,
      coilid: 0,
      slitid: 0,
      coil_no: "",
      plan: 0,
    },
  ]);

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        plan_no: "",
        widths: "",
        comment: "",
        company: "",
        companyid: "",
        value: "",
        status: "",
        weight: 0,
        remai_weight: 0,
        remai_width: 0,
        scrap: 0,
        paper: 0,
        seelve: 0,
        actualweight: 0,
        coilid: 0,
        slitid: 0,
        coil_no: "",
        plan: 0,
      };
      setforms([...form_data, form_body]);
    }
  }

  // remove
  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  function handleFormCloseAndRefresh() {
    setFormSubmitted(false); // Reset formSubmitted state
    // Perform table refresh or any necessary actions
  }

  return (
    <div className="Purchase_form">
      {isSubmitting ? (
        <Progress percent={70} status="exception" />
      ) : formSubmitted ? (
        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  Planning Create
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Form submitted successfully!</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleFormCloseAndRefresh}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  Planning Create
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
                                      onClick={() =>
                                        handleRemoveForm(data.key)
                                      }>
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
                                        form_data[data.key].plan_no = e.label;
                                        form_data[data.key].plan = e.value;
                                        form_data[data.key].coilid = e.coilid;
                                        form_data[data.key].coil_no = e.coil;
                                        form_data[data.key].status = e.status;
                                        form_data[data.key].widths = e.widths;
                                        form_data[data.key].companyid =
                                          e.companyid;
                                        form_data[data.key].remarks = e.remarks;
                                        setforms([...form_data]);
                                      }}
                                      options={vedorlistNames}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-3">
                                    <label className="control-label">
                                      Coil No.
                                    </label>
                                    <input
                                      placeholder="Coil No."
                                      value={form_data[data.key].coil_no}
                                      onChange={(e) => {
                                        form_data[data.key].coil_no =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-3">
                                    <label className="control-label">
                                      Widths
                                    </label>
                                    <input
                                      id="widths"
                                      placeholder="157,157,157"
                                      value={form_data[data.key].widths}
                                      onChange={(e) => {
                                        form_data[data.key].widths =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Comment
                                    </label>
                                    <input
                                      id="comment"
                                      placeholder="Remarks"
                                      value={form_data[data.key].remarks}
                                      onChange={(e) => {
                                        form_data[data.key].comment =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      required
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Status
                                    </label>
                                    <input
                                      value={form_data[data.key].status}
                                      placeholder="Status"
                                      onChange={(e) => {
                                        form_data[data.key].status =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12 row">
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Slit Coil weight
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Slit Coil weight"
                                      onChange={(e) => {
                                        form_data[data.key].weight =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Scrap Weight
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Scrap Weight"
                                      onChange={(e) => {
                                        form_data[data.key].scrap =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Paper Weight
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Paper Weight"
                                      onChange={(e) => {
                                        form_data[data.key].paper =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Seleeve Weight
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Seleeve Weight"
                                      onChange={(e) => {
                                        form_data[data.key].seelve =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Remaining Weight
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Remaining Weight"
                                      onChange={(e) => {
                                        form_data[data.key].remai_weight =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Remaining Width
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Remaining Width"
                                      onChange={(e) => {
                                        form_data[data.key].remai_width =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      );
                    })}
                  <input
                    id="submit"
                    type="submit"
                    className="btn btn-success"
                    onClick={Senddata}
                    disabled={isSubmitting}
                    value="Submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
