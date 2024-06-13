import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { api } from "../../../services/api";

export const Retantion_form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      id: 0,
    },
  ]);

  const [companydata, setcompany] = useState("");
  useEffect(() => {
    api({ api: "/storeitem/companyfilter/" }).then((data) => {
      setcompany(data);
    });
  }, []);

  function Senddata(event) {
    event.preventDefault();
    api({
      api: "/api/rentation/",
      method: "post",
      body: { form: form_data, post: 1 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message, { autoClose: 2000 });
        } else {
          toast("failed", { autoClose: 2000 });
        }
      });
  }

  console.log(form_data);
  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        id: 0,
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
                Booking Create
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
                                  <div className="col-md-4">
                                    <label className="control-label">
                                      Company Name
                                    </label>
                                    <Select
                                      onChange={(e) => {
                                        form_data[data.key].id = e.value;
                                        form_data[data.key].state = e.state;
                                        form_data[data.key].city = e.city;
                                        form_data[data.key].phone_no =
                                          e.phone_no;
                                        form_data[data.key].alternate_no =
                                          e.alternate_no;
                                        setforms([...form_data]);
                                      }}
                                      options={companydata}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Phone No.
                                    </label>
                                    <input
                                      type="number"
                                      value={form_data[data.key].phone_no}
                                      onChange={(e) => {
                                        form_data[data.key].phone_no =
                                          e.target.value;
                                      }}
                                      placeholder="Phone No."
                                      className="form-control"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Alternate No.
                                    </label>
                                    <input
                                      type="number"
                                      value={form_data[data.key].alternate_no}
                                      placeholder="Alternate No."
                                      onChange={(e) => {
                                        form_data[data.key].alternate_no =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      value={form_data[data.key].city}
                                      placeholder=" City"
                                      onChange={(e) => {
                                        form_data[data.key].city =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      State
                                    </label>
                                    <input
                                      type="text"
                                      value={form_data[data.key].state}
                                      placeholder="State"
                                      onChange={(e) => {
                                        form_data[data.key].state =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      disabled
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
