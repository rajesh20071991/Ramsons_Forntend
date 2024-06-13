import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const DeviceAdd_form = () => {
  const [disable, setDisable] = useState(false);
  const [form_data, setFormData] = useState([{ key: 0, name: "" }]);

  const handleInputChange = (index, event) => {
    const values = [...form_data];
    values[index].name = event.target.value;
    setFormData(values);
  };

  const handleAddForm = () => {
    setFormData([
      ...form_data,
      { key: form_data[form_data.length - 1].key + 1, name: "" },
    ]);
  };

  const handleRemoveForm = (index) => {
    setFormData(form_data.filter((_, i) => i !== index));
  };

  const Senddata = (e) => {
    e.preventDefault();
    if (form_data.some((data) => data.name.trim() === "")) {
      toast("Form data cannot be blank", { autoClose: 2000 });
      return;
    }

    setDisable(true);
    api({
      api: "/api/devicelist/",
      method: "post",
      body: { form: form_data, post: 1 },
    })
      .then((data) => {
        toast("Success", { autoClose: 2000 });
        setDisable(false);
        window.location.reload();
      })
      .catch(() => {
        toast("Failed", { autoClose: 2000 });
        setDisable(false);
      });
  };

  return (
    <div className="Item-form">
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Item Add
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form onSubmit={Senddata}>
                {form_data.map((data, index) => (
                  <div
                    key={data.key}
                    className="row"
                    style={{ "--bs-gutter-x": " 0rem" }}>
                    <div className="col-md-10">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="control-label">Device Type</label>
                          <input
                            type="text"
                            value={data.name}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Item Name"
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
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={handleAddForm}>
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
                            onClick={() => handleRemoveForm(index)}>
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
                ))}
                <br />
                <button
                  type="submit"
                  disabled={disable}
                  className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Devicelist_form = () => {
  const [statevalue, setValue] = useState("");
  const [diable, setdisable] = useState(false);

  const status = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  useEffect(() => {
    api({ api: "/storeitem/devicefilter/" }).then((data) => {
      setValue(data);
    });
  }, []);
  console.log(diable);

  function Senddata(e) {
    e.preventDefault();
    setdisable(true);
    console.log(diable);
    api({
      api: "/api/devicelist/",
      method: "post",
      body: { form: form_data, post: 2 },
    })
      .then((data) => {
        toast("Success", { autoClose: 2000 });
        setdisable(false);
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
        setdisable(false);
      });
  }
  var [form_data, setforms] = useState([
    {
      key: 0,
      serial: "",
      model: "",
      device_type: "",
      billdate: "",
      warranty: "",
      bill: "",
    },
  ]);

  console.log(form_data);

  function handleAddForm(key) {
    var form_body = {
      key: form_data[form_data.length - 1].key + 1,
      serial: "",
      model: "",
      device_type: "",
      billdate: "",
      warranty: "",
      bill: "",
    };
    setforms([...form_data, form_body]);
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }
  return (
    <div className="Item-form">
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Device Add
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
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
                                <label className="control-label">
                                  Serial No.
                                </label>
                                <input
                                  rows="5"
                                  onChange={(e) => {
                                    form_data[data.key].serial = e.target.value;
                                  }}
                                  placeholder="Serial No."
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="control-label">
                                  Modal No.
                                </label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].model = e.target.value;
                                  }}
                                  placeholder=" Modal No."
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-3">
                                <label className="control-label">
                                  Device Type
                                </label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].device_type = e.value;
                                  }}
                                  options={statevalue}
                                />
                              </div>
                              <div className="col-md-3">
                                <label className="control-label">
                                  Bill No.
                                </label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].bill = e.target.value;
                                  }}
                                  placeholder="Bill No."
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-3">
                                <label className="control-label">
                                  Bill Date
                                </label>
                                <input
                                  type="date"
                                  onChange={(e) => {
                                    form_data[data.key].billdate =
                                      e.target.value;
                                  }}
                                  placeholder="Bill Date"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-3">
                                <label className="control-label">
                                  Warranty
                                </label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].warranty = e.value;
                                  }}
                                  options={status}
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
                disabled={diable}
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
  );
};

export const DeviceIssue_form = () => {
  const [statevalue, setValue] = useState("");
  var [descriptions, setDesc] = useState();

  const status = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  useEffect(() => {
    api({ api: "/storeitem/devicelistfilter/" }).then((data) => {
      setValue(data);
      var decs = [];
      data.map((item) => {
        decs.push({
          label: item.label,
          value: item.value,
          model: item.model,
          device: item.device,
        });
      });
      setDesc(decs);
    });
  }, []);

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/devicelist/",
      method: "post",
      body: { form: form_data, post: 3 },
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
      code: "",
      name: "",
      employeeid: "",
      mobileno: "",
      email_id: "",
      charger: "",
      remarks: "",
    },
  ]);

  function handle_set_Items_Data(select, key) {
    form_data[key].model = select.model;
    form_data[key].code = select.value;
    form_data[key].device = select.device;
    setforms([...form_data]);
  }
  console.log(form_data);

  function handleAddForm(key) {
    var form_body = {
      key: form_data[form_data.length - 1].key + 1,
      code: "",
      name: "",
      employeeid: "",
      mobileno: "",
      email_id: "",
      charger: "",
      remarks: "",
    };
    setforms([...form_data, form_body]);
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }
  return (
    <div className="Item-form">
      <div
        className="modal fade"
        id="exampleModalToggle3"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Device Add
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
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
                                  Serial No.
                                </label>
                                <Select
                                  onChange={(e) =>
                                    handle_set_Items_Data(e, data.key)
                                  }
                                  options={statevalue}
                                />
                              </div>
                              <div className="col-md-3">
                                <label className="control-label">
                                  Modal No.
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].model,
                                    value: form_data[data.key].model,
                                  }}
                                  isDisabled
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Device Type
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].device,
                                    value: form_data[data.key].device,
                                  }}
                                  isDisabled
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Name</label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].name = e.target.value;
                                  }}
                                  placeholder="Name"
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Employee ID
                                </label>
                                <input
                                  type="number"
                                  onChange={(e) => {
                                    form_data[data.key].employeeid =
                                      e.target.value;
                                  }}
                                  placeholder="Employee No."
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
                                  onChange={(e) => {
                                    form_data[data.key].email_id =
                                      e.target.value;
                                  }}
                                  placeholder="Employee Id"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Mobile No.
                                </label>
                                <input
                                  type="number"
                                  onChange={(e) => {
                                    form_data[data.key].mobileno =
                                      e.target.value;
                                  }}
                                  placeholder="Mobile No."
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="control-label">Remarks</label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].remarks =
                                      e.target.value;
                                  }}
                                  placeholder="Remarks"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  With Charger
                                </label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].charger = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={status}
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
  );
};

export const DeviceRetrun_form = () => {
  const [statevalue, setValue] = useState("");
  var [descriptions, setDesc] = useState();

  const status = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  useEffect(() => {
    api({ api: "/storeitem/deviceissuefilter/" }).then((data) => {
      setValue(data);
      var decs = [];
      data.map((item) => {
        decs.push({
          label: item.label,
          value: item.value,
          name: item.name,
          mobileno: item.mobileno,
          device: item.device,
          modal: item.modal,
          seri: item.seri,
          deviceid: item.deviceid,
          device: item.device,
        });
      });
      setDesc(decs);
    });
  }, []);

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/devicelist/",
      method: "post",
      body: { form: form_data, post: 4 },
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
      code: "",
      deviceid: "",
      device: "",
      damage: "",
      remarks: "",
    },
  ]);

  function handle_set_Items_Data(select, key) {
    form_data[key].modal = select.modal;
    form_data[key].code = select.value;
    form_data[key].name = select.name;
    form_data[key].mobileno = select.mobileno;
    form_data[key].device = select.device;
    form_data[key].seri = select.seri;
    form_data[key].deviceid = select.deviceid;

    setforms([...form_data]);
  }
  console.log(form_data);

  function handleAddForm(key) {
    var form_body = {
      key: form_data[form_data.length - 1].key + 1,
      code: "",
      deviceid: "",
      damage: "",
      damage: "",
      remarks: "",
    };
    setforms([...form_data, form_body]);
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }
  return (
    <div className="Item-form">
      <div
        className="modal fade"
        id="exampleModalToggle3"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Device Add
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
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
                                  Employee Id.
                                </label>
                                <Select
                                  onChange={(e) =>
                                    handle_set_Items_Data(e, data.key)
                                  }
                                  options={statevalue}
                                />
                              </div>
                              <div className="col-md-3">
                                <label className="control-label">
                                  Modal No.
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].modal,
                                    value: form_data[data.key].modal,
                                  }}
                                  isDisabled
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Device Type
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].device,
                                    value: form_data[data.key].device,
                                  }}
                                  isDisabled
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Name</label>
                                <input
                                  type="text"
                                  value={form_data[data.key].name}
                                  onChange={(e) => {
                                    form_data[data.key].name = e.target.value;
                                  }}
                                  placeholder="Name"
                                  className="form-control"
                                  disabled
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Mobile No.
                                </label>
                                <input
                                  type="number"
                                  value={form_data[data.key].mobileno}
                                  onChange={(e) => {
                                    form_data[data.key].mobileno =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                  disabled
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="control-label">Remarks</label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].remarks =
                                      e.target.value;
                                  }}
                                  placeholder="Remarks"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Damage</label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].damage = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={status}
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
  );
};
