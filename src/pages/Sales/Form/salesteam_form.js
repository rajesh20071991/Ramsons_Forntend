import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { api } from "../../../services/api";

export const SalesTeam_form = () => {
  const [form_data, setforms] = useState([
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

  const [company, setCompany] = useState([]);

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

  function handleAddForm(key) {
    if (form_data[key].company === "") {
      return;
    }
    const newKey = form_data[form_data.length - 1].key + 1;
    const newForm = {
      key: newKey,
      company: "",
      executive: "",
      manager: "",
      counter: "",
      plan: "",
      reorder: "",
    };
    setforms([...form_data, newForm]);
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  function handleCompanyChange(selectedOption, key) {
    const selectedCompany = company.find(
      (c) => c.value === selectedOption.value
    );
    const updatedForm = form_data.map((form) => {
      if (form.key === key) {
        return {
          ...form,
          company: selectedOption.value,
          executive: selectedCompany.executive,
          manager: selectedCompany.manager,
        };
      }
      return form;
    });
    setforms(updatedForm);
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
                            style={{ "--bs-gutter-x": "0rem" }}>
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-12 row">
                                  <div className="col-md-3">
                                    <label className="control-label">
                                      Company Name
                                    </label>
                                    <Select
                                      onChange={(e) =>
                                        handleCompanyChange(e, data.key)
                                      }
                                      options={company}
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Executive Name
                                    </label>
                                    <input
                                      type="text"
                                      value={data.executive}
                                      onChange={(e) => {
                                        const updatedForm = form_data.map(
                                          (form) =>
                                            form.key === data.key
                                              ? {
                                                  ...form,
                                                  executive: e.target.value,
                                                }
                                              : form
                                        );
                                        setforms(updatedForm);
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
                                      value={data.manager}
                                      placeholder="Manager Name"
                                      onChange={(e) => {
                                        const updatedForm = form_data.map(
                                          (form) =>
                                            form.key === data.key
                                              ? {
                                                  ...form,
                                                  manager: e.target.value,
                                                }
                                              : form
                                        );
                                        setforms(updatedForm);
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
                                      value={data.counter}
                                      onChange={(e) => {
                                        const updatedForm = form_data.map(
                                          (form) =>
                                            form.key === data.key
                                              ? {
                                                  ...form,
                                                  counter: e.target.value,
                                                }
                                              : form
                                        );
                                        setforms(updatedForm);
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
                                      value={data.plan}
                                      onChange={(e) => {
                                        const updatedForm = form_data.map(
                                          (form) =>
                                            form.key === data.key
                                              ? {
                                                  ...form,
                                                  plan: e.target.value,
                                                }
                                              : form
                                        );
                                        setforms(updatedForm);
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
                                      value={data.reorder}
                                      onChange={(e) => {
                                        const updatedForm = form_data.map(
                                          (form) =>
                                            form.key === data.key
                                              ? {
                                                  ...form,
                                                  reorder: e.target.value,
                                                }
                                              : form
                                        );
                                        setforms(updatedForm);
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
