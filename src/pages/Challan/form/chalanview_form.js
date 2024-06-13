import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";

export const ChallanView_form = ({ updateChallanList, onCloseForm }) => {
  let { id } = useParams();

  var [form_data, setforms] = useState([
    {
      key: 0,
      id: id,
      name_id: 0,
      hsn_code: 0,
      rate: 0,
      quantity: 0,
      job_charges: 0,
      challan: 0,
      stock_in: 0,
      balance: "",
    },
  ]);
  var [namelist, setnamelist] = useState();

  useEffect(() => {
    api({ api: "/storeitem/namelist/" }).then((data) => {
      setnamelist(data);
    });
  }, []);

  function Senddata(event) {
    event.preventDefault();
    api({
      api: "/api/chalanentity/",
      method: "post",
      body: { form: form_data, post: 6, id: id },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        updateChallanList();
        onCloseForm();
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
        id: 0,
        name_id: 0,
        hsn_code: 0,
        rate: 0,
        quantity: 0,
        job_charges: 0,
        challan: 0,
        stock_in: 0,
        balance: "",
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
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Goods Create
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Description
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].name_id = e.value;
                                      form_data[data.key].hsn_code = e.hsncode;
                                    }}
                                    options={namelist}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">
                                    HSN Code
                                  </label>
                                  <input
                                    type="text"
                                    value={form_data[data.key].hsn_code}
                                    onChange={(e) => {
                                      form_data[data.key].hsn_code =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Quantity
                                  </label>
                                  <input
                                    type="number"
                                    step="0.001"
                                    className="form-control"
                                    onChange={(e) =>
                                      (form_data[data.key].quantity =
                                        e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Job Charges
                                  </label>
                                  <input
                                    type="number"
                                    step="0.001"
                                    placeholder="Job Charges"
                                    onChange={(e) =>
                                      (form_data[data.key].job_charges =
                                        e.target.value)
                                    }
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Rate</label>
                                  <input
                                    type="number"
                                    step="0.001"
                                    placeholder="Rate"
                                    onChange={(e) =>
                                      (form_data[data.key].rate =
                                        e.target.value)
                                    }
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
    </div>
  );
};
