import React, { useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const DetailsFill_form = () => {
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

  function Senddata() {
    api({
      api: "/api/saccounts/",
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
      sub_type: "",
      quantity: "",
      amount: "",
      date: "",
    },
  ]);

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        type: "",
        sub_type: "",
        quantity: "",
        amount: "",
        date: "",
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
                Details Form
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
                                  <label className="control-label">Date</label>
                                  <input
                                    type="date"
                                    placeholder="Date"
                                    onChange={(e) => {
                                      form_data[data.key].date = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">Type</label>
                                  <Select
                                    // value={form_data[data.key].status}
                                    onChange={(e) => {
                                      form_data[data.key].status = e.value;
                                      form_data[data.key].final_status = "";
                                      setforms([...form_data]);
                                    }}
                                    options={Type}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Sub Type
                                  </label>
                                  <Select
                                    value={{
                                      label: form_data[data.key].final_status,
                                      value: form_data[data.key].final_status,
                                    }}
                                    onChange={(e) => {
                                      form_data[data.key].final_status =
                                        e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={Sub_Type.filter(
                                      (item) =>
                                        item.parent ===
                                        form_data[data.key].status
                                    )}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Quantity
                                  </label>
                                  <input
                                    type="number"
                                    step="0.001"
                                    placeholder="Quantity"
                                    onChange={(e) => {
                                      form_data[data.key].quantity =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Amount
                                  </label>
                                  <input
                                    type="number"
                                    step="0.001"
                                    placeholder="Amount"
                                    onChange={(e) => {
                                      form_data[data.key].amount =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
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
