import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const ChallanCreate_Form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      challan: 0,
      company_id: "",
      stock_in: 0,
    },
  ]);

  function Senddata() {
    api({
      api: "/api/chalan_data/",
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

  var [vedorlistNames, setVendorlist] = useState([]);

  useEffect(() => {
    api({ api: "/storeitem/companyfilter/" }).then((data) => {
      setVendorlist(data);
    });
  }, []);

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        challan: 0,
        company_id: "",
        stock_in: 0,
      };
      setforms([...form_data, form_body]);
    }
  }

  // remove
  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  return (
    <div className="Challan_form">
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
                Challan Genrate
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
                        <div className="row">
                          <div className="col-md-11 row">
                            <div className="col-md-4">
                              <label className="control-label">
                                Challan No.
                              </label>
                              <input
                                type="text"
                                onChange={(e) => {
                                  form_data[data.key].challan = e.target.value;
                                  setforms([...form_data]);
                                }}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="control-label">
                                Company Name
                              </label>
                              <Select
                                onChange={(e) => {
                                  form_data[data.key].company_id = e.value;
                                  setforms([...form_data]);
                                }}
                                options={vedorlistNames}
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="control-label">Quantity</label>
                              <input
                                type="number"
                                step="0.001"
                                onChange={(e) => {
                                  form_data[data.key].stock_in = e.target.value;
                                  setforms([...form_data]);
                                }}
                                className="form-control"
                              />
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
                        </div>
                      </form>
                    </div>
                  );
                })}
              <br />
              <center>
                <input
                  id="submit"
                  type="submit"
                  className="btn btn-success"
                  onClick={Senddata}
                  value="Submit"
                />
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
