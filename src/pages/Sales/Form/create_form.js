import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";

export const Create_form = () => {
  let { id } = useParams();

  const grade_type = [
    { value: "304", label: "304" },
    { value: "JT", label: "JT" },
  ];

  var [form_data, setforms] = useState([
    {
      key: 0,
      id: id,
      quantity: 0,
      rate: 0,
      discount: 0,
      grade: "",
    },
  ]);
  function Senddata(event) {
    event.preventDefault();
    api({
      api: "/api/booking/",
      method: "post",
      body: { form: form_data, post: 5 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  console.log(form_data);
  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        quantity: 0,
        id: id,
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
                                      options={grade_type}
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
