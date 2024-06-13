import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const Booking_Form = () => {
  const status = [
    { value: "Coil", label: "Coil" },
    { value: "Pipe", label: "Pipe" },
    { value: "Scrap", label: "Scrap" },
    { value: "Short Length", label: "Short Length" },
    { value: "Sheet", label: "Sheet" },
  ];

  const payment_mode = [
    {
      value: "To be Produced (Production Planning Needed)",
      label: "To be Produced (Production Planning Needed)",
    },
    {
      value: "Ready Stock (No Planning Needed)",
      label: "Ready Stock (No Planning Needed)",
    },
  ];

  const source_type = [
    { value: "Ramsons Stainless", label: "Ramsons Stainless" },
    { value: "Ramsons Steel", label: "Ramsons Steel" },
    { value: "N. S. Steel Industries", label: "N. S. Steel Industries" },
    { value: "Navee Steel", label: "Navee Steel" },
  ];

  const payment_type = [
    { value: "Advance Payment", label: "Advance Payment" },
    { value: "Non Advance Payment", label: "Non Advance Payment" },
  ];

  const factory_status = [
    { value: "F.O.R", label: "F.O.R" },
    { value: "Ex. Factory", label: "Ex. Factory" },
  ];

  var [vedorlistNames, setVendorlist] = useState([]);

  var [common_data, setcommon_data] = useState({
    company_id: 0,
    due_receipt: "",
    remarks: "",
    status: "",
    payment_mode: "",
    payment_type: "",
    factory_status: "",
    source_type: "",
  });


  var [form_data, setforms] = useState([
    {
      key: 0,
      quantity: 0,
      rate: 0,
      discount: 0,
      grade: "",
    },
  ]);

  const [gradepipe, setgradepipe] = useState("");
  useEffect(() => {
    api({ api: "/storeitem/companyfilter/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/pipegradelist/" }).then((data) => {
      setgradepipe(data);
    });
  }, []);

  function Senddata(event) {
    event.preventDefault();
    api({
      api: "/api/booking/",
      method: "post",
      body: { common: common_data, form: form_data, post: 2 },
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
        quantity: 0,
        rate: 0,
        discount: 0,
        grade: "",
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
                Booking Create
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
                <div className="row">
                  <div className="col-md-3">
                    <label className="control-label text-left">
                      Company Name
                    </label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, company_id: e.value })
                      }
                      options={vedorlistNames}
                    />
                    {common_data.company_id === 0 ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">Payment Mode</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          payment_mode: e.value,
                        })
                      }
                      options={payment_mode}
                    />
                    {common_data.payment_mode === "" ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">Source Type</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, source_type: e.value })
                      }
                      options={source_type}
                    />
                    {common_data.source_type === "" ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">Payment Type</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          payment_type: e.value,
                        })
                      }
                      options={payment_type}
                    />
                    {common_data.payment_type === "" ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Factory Status</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          factory_status: e.value,
                        })
                      }
                      options={factory_status}
                    />
                    {common_data.factory_status === "" ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Status</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, status: e.value })
                      }
                      options={status}
                    />
                    {common_data.status === "" ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">
                      Estimate Delivery Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={common_data.due_receipt}
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          due_receipt: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Remarks</label>
                    <input
                      type="text"
                      value={common_data.remarks}
                      className="form-control"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          remarks: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                {/* common form */}

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
                          <div
                            className="row"
                            style={{ "--bs-gutter-x": " 0rem" }}
                          >
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-12 row">
                                  <div className="col-md-3">
                                    <label className="control-label">
                                      Quantity
                                    </label>
                                    <input
                                      type="number"
                                      step="0.001"
                                      id="quantity"
                                      onChange={(e) => {
                                        form_data[data.key].quantity =
                                          e.target.value;
                                      }}
                                      placeholder="Quantity"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Rate
                                    </label>
                                    <input
                                      type="number"
                                      step="0.001"
                                      id="rate"
                                      placeholder="Rate"
                                      onChange={(e) => {
                                        form_data[data.key].rate =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Discount
                                    </label>
                                    <input
                                      type="number"
                                      step="0.001"
                                      id="discount"
                                      onChange={(e) => {
                                        form_data[data.key].discount =
                                          e.target.value;
                                      }}
                                      placeholder="Discount"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="control-label">
                                      Grade
                                    </label>
                                    <Select
                                    onChange={(e) => {
                                      form_data[data.key].grade = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={gradepipe}
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

                {common_data.status === "" ||
                common_data.company_id === 0 ||
                common_data.source_type === 0 ||
                common_data.ship_to === 0 ? (
                  <></>
                ) : (
                  <>
                    <center>
                      <input
                        id="submit"
                        type="submit"
                        className="btn btn-success"
                        onClick={Senddata}
                        value="Submit"
                      />
                    </center>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
