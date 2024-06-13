import React, { useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export const Account_forms = () => {
  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/amount/",
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
      invoice: "",
      date: "",
      amount: "",
    },
  ]);

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        invoice: "",
        date: "",
        amount: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  // remove
  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  return (
    <div className="Amount">
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Details Form
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
                            <div className="col-md-10">
                              <div className="row">
                                <div className="col-md-4">
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
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Invoice No.
                                  </label>
                                  <input
                                    placeholder="Inoice No."
                                    onChange={(e) => {
                                      form_data[data.key].invoice =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
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
