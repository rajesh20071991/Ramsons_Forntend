import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { api } from "../../../services/api";

export const Testcertifi_form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      coil: 0,
      heat: "",
      cper: 0,
      niper: 0,
      nper: 0,
      cuper: 0,
      grade: "",
      temp_amount: 0,
    },
  ]);
  console.log(form_data);
  var [vedorlistNames, setVendorlist] = useState([]);

  useEffect(() => {
    api({ api: "/storeitem/mothercoil/" }).then((data) => {
      setVendorlist(data);
    });
  }, []);

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/tc_data/",
      method: "post",
      body: { form: form_data, post: 1 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  function cal_amount(key) {
    var amount =
      Number(form_data[key].cper) +
      Number(form_data[key].niper) +
      Number(form_data[key].nper) +
      Number(form_data[key].cuper);
    form_data[key].temp_amount = amount;
    setforms([...form_data]);
    console.log(amount);
  }

  console.log(form_data);
  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        coil: 0,
        heat: "",
        cper: 0,
        niper: 0,
        nper: 0,
        cuper: 0,
        grade: "",
        temp_amount: 0,
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
                Test Certificate
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
                                      Coil No.
                                    </label>
                                    <Select
                                      onChange={(e) => {
                                        form_data[data.key].coil = e.value;
                                        form_data[data.key].grade = e.grade;
                                        setforms([...form_data]);
                                      }}
                                      options={vedorlistNames}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Grade
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Grade"
                                      value={form_data[data.key].grade}
                                      onChange={(e) => {
                                        form_data[data.key].grade =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Heat
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Heat"
                                      onChange={(e) => {
                                        form_data[data.key].heat =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">%C</label>
                                    <input
                                      type="number"
                                      placeholder="%C"
                                      onChange={(e) => {
                                        form_data[data.key].cper =
                                          e.target.value;
                                        cal_amount(data.key);
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">%Ni</label>
                                    <input
                                      type="number"
                                      placeholder="%Ni"
                                      onChange={(e) => {
                                        form_data[data.key].niper =
                                          e.target.value;
                                        cal_amount(data.key);
                                      }}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">%N</label>
                                    <input
                                      type="number"
                                      placeholder="%N"
                                      onChange={(e) => {
                                        form_data[data.key].nper =
                                          e.target.value;
                                        cal_amount(data.key);
                                      }}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">%Cu</label>
                                    <input
                                      type="number"
                                      placeholder="%Cu"
                                      onChange={(e) => {
                                        form_data[data.key].cuper =
                                          e.target.value;
                                        cal_amount(data.key);
                                      }}
                                      className="form-control"
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
