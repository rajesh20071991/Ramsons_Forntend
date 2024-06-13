import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { api } from "../../../services/api";

export const SalesTeam_form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      company: "",
      executive: "",
      manager: "",
      counter: "",
      plan: "",
      reorder: "",
    },
  ]);

  const [company, setCompany] = React.useState([]);
  useEffect(() => {
    api({ api: "/storeitem/companysales/" })
      .then((data) => {
        setCompany(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
  }, []);
  function Senddata(event) {
    event.preventDefault();
    api({
      api: "/api/salesteam/",
      method: "post",
      body: { form: form_data, post: 2 },
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
        company: "",
        executive: "",
        manager: "",
        counter: "",
        plan: "",
        reorder: "",
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
                Sales Summary
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
                                <div className="col-md-12 row">
                                  <div className="col-md-3">
                                    <label className="control-label">
                                      Company Name
                                    </label>
                                    <Select
                                      onChange={(e) => {
                                        form_data[data.key].company = e.value;
                                      }}
                                      options={company}
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Executive Name
                                    </label>
                                    <input
                                      type="text"
                                      onChange={(e) => {
                                        form_data[data.key].executive =
                                          e.target.value;
                                      }}
                                      placeholder="Executive Name"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Manager Name
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Manager Name"
                                      onChange={(e) => {
                                        form_data[data.key].manager =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Counter(MT)
                                    </label>
                                    <input
                                      type="number"
                                      onChange={(e) => {
                                        form_data[data.key].counter =
                                          e.target.value;
                                      }}
                                      placeholder="Counter"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      NBD Plan (MT)
                                    </label>
                                    <input
                                      type="number"
                                      onChange={(e) => {
                                        form_data[data.key].plan =
                                          e.target.value;
                                      }}
                                      placeholder="NBD Plan(MT)"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      RE ORDER
                                    </label>
                                    <input
                                      type="number"
                                      onChange={(e) => {
                                        form_data[data.key].reorder =
                                          e.target.value;
                                      }}
                                      placeholder="RE ORDER"
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
