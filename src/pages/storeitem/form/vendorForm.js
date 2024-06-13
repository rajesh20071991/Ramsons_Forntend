import React, { useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import { statelist } from "../../../services/constant";

export const Vendor_forms = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      contact_name: "",
      company_name: "",
      email_id: "",
      mobile_no: "",
      shipping_add: "",
      gst_no: "",
      shipping_city: "",
      shipping_state: "",
      pin_code: "",
      country: "",
    },
  ]);

  const [pictures, setPictures] = useState([]);
  const handleImageChange = (e) => {
    const imageFiles = e.target.files;
    const pictureArray = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFiles[i]);
      reader.onload = () => {
        pictureArray.push(reader.result);
        setPictures(pictureArray);
      };
    }
  };

  console.log(form_data);
  function Senddata(e) {
    e.preventDefault();
    if (pictures.length === 0) {
      alert("Image upload is required");
      return;
    }
    api({
      api: "/api/vendorlist/",
      method: "post",
      body: { form: form_data, post: 1, picture: pictures },
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
        contact_name: "",
        company_name: "",
        email_id: "",
        mobile_no: "",
        shipping_add: "",
        gst_no: "",
        shipping_city: "",
        shipping_state: "",
        pin_code: "",
        country: "",
      };
      setforms([...form_data, form_body]);
    }
  }

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
                Company Create
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
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Person Name
                                  </label>
                                  <input
                                    rows="5"
                                    placeholder="Person Name"
                                    onChange={(e) => {
                                      form_data[data.key].contact_name =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Company Name
                                  </label>
                                  <input
                                    rows="5"
                                    placeholder="Company Name"
                                    onChange={(e) => {
                                      form_data[data.key].company_name =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Email ID
                                  </label>
                                  <input
                                    type="email"
                                    rows="5"
                                    onChange={(e) => {
                                      form_data[data.key].email_id =
                                        e.target.value;
                                    }}
                                    placeholder="Email ID"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Mobile No
                                  </label>
                                  <input
                                    type="number"
                                    maxLength="10"
                                    onChange={(e) => {
                                      form_data[data.key].mobile_no =
                                        e.target.value;
                                    }}
                                    placeholder="Mobile No"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Address
                                  </label>
                                  <input
                                    rows="5"
                                    placeholder="Address"
                                    onChange={(e) => {
                                      form_data[data.key].shipping_add =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    GST No.
                                  </label>
                                  <input
                                    rows="5"
                                    placeholder="GST No."
                                    onChange={(e) => {
                                      form_data[data.key].gst_no =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">City</label>
                                  <input
                                    rows="5"
                                    onChange={(e) => {
                                      form_data[data.key].shipping_city =
                                        e.target.value;
                                    }}
                                    placeholder="City"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="control-label">State</label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].shipping_state =
                                        e.value;
                                    }}
                                    options={statelist}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Pin Code
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Pin Code"
                                    onChange={(e) => {
                                      form_data[data.key].pin_code =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    County
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="County"
                                    onChange={(e) => {
                                      form_data[data.key].country =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="control-label">Image</label>
                                  <input
                                    type="file"
                                    multiple
                                    accept=".pdf, .jpg, .jpeg, .png"
                                    onChange={(e) => handleImageChange(e)}
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
