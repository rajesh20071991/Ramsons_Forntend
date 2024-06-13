import React, { useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { useEffect } from "react";

export const Order_Create_form = () => {
  let { id, type } = useParams();
  const brand = [
    { value: "Ramsons Stainless", label: "Ramsons Stainless" },
    { value: "Duromax", label: "Duromax" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const stamp = [
    { value: "With Stamp", label: "With Stamp" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const status = [
    { value: "Polish", label: "Polish" },
    { value: "Non Polish", label: "Non Polish" },
    { value: "Mat Polish", label: "Mat Polish" },
  ];

  const shape = [
    { value: "Circle", label: "Circle" },
    { value: "Square", label: "Square" },
    { value: "Rectangle", label: "Rectangle" },
  ];

  var [form_data, setforms] = useState([
    {
      key: 0,
      id: id,
      size: "",
      thickness: "",
      grade: "",
      weight: 0,
      discount: 0,
      rate: 0,
      stamp: "",
      status: "",
      shape: "",
      brand: "",
      length: "20",
      type: type,
    },
  ]);
  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/order/",
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

  const [GradeOptions, setGradeOptions] = useState("");
  const [Thicknessoptions, setThicknessOptions] = useState("");
  const [SizeOptions, setSizeOptions] = useState("");
  const [PipeThickness, setpipethickness] = useState("");
  const [gradepipe, setgradepipe] = useState("");

  useEffect(() => {
    api({ api: "/storeitem/thicknesslist/" }).then((data) => {
      setThicknessOptions(data);
    });
    api({ api: "/storeitem/gradelist/" }).then((data) => {
      setGradeOptions(data);
    });
    api({ api: "/storeitem/sizelist/" }).then((data) => {
      setSizeOptions(data);
    });
    api({ api: "/storeitem/pipegradelist/" }).then((data) => {
      setgradepipe(data);
    });
    api({ api: "/storeitem/pipethicknesslist/" }).then((data) => {
      setpipethickness(data);
    });
  }, []);

  console.log(form_data);
  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        id: id,
        size: "",
        type: type,
        thickness: "",
        grade: "",
        weight: 0,
        discount: 0,
        rate: 0,
        stamp: "",
        status: "",
        shape: "",
        brand: "",
        length: "20",
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
                Order Create
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
                {type === "Coil" &&
                  form_data.length > 0 &&
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
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Size
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Size"
                                      value={form_data[data.key].size}
                                      onChange={(e) => {
                                        form_data[data.key].size =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Thickness
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].thickness,
                                        value: form_data[data.key].thickness,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].thickness = e.value;
                                        setforms([...form_data]);
                                      }}
                                      options={Thicknessoptions}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Grade
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].grade,
                                        value: form_data[data.key].grade,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].grade = e.value;
                                        setforms([...form_data]);
                                      }}
                                      options={GradeOptions}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Weight
                                    </label>
                                    <input
                                      type="number"
                                      id="weight"
                                      value={form_data[data.key].weight}
                                      placeholder="Weight"
                                      onChange={(e) => {
                                        form_data[data.key].weight =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
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
                                      id="rate"
                                      placeholder="Rate"
                                      value={form_data[data.key].rate}
                                      onChange={(e) => {
                                        form_data[data.key].rate =
                                          e.target.value;
                                        setforms([...form_data]);
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
                                      id="discount"
                                      placeholder="Discount"
                                      value={form_data[data.key].discount}
                                      onChange={(e) => {
                                        form_data[data.key].discount =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
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
                {type === "Sheet" &&
                  form_data.length > 0 &&
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
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Size
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Size"
                                      value={form_data[data.key].size}
                                      onChange={(e) => {
                                        form_data[data.key].size =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Thickness
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].thickness,
                                        value: form_data[data.key].thickness,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].thickness = e.value;
                                        setforms([...form_data]);
                                      }}
                                      options={Thicknessoptions}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Grade
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].grade,
                                        value: form_data[data.key].grade,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].grade = e.value;
                                        setforms([...form_data]);
                                      }}
                                      options={GradeOptions}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Weight
                                    </label>
                                    <input
                                      type="number"
                                      id="weight"
                                      value={form_data[data.key].weight}
                                      placeholder="Weight"
                                      onChange={(e) => {
                                        form_data[data.key].weight =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
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
                                      id="rate"
                                      placeholder="Rate"
                                      value={form_data[data.key].rate}
                                      onChange={(e) => {
                                        form_data[data.key].rate =
                                          e.target.value;
                                        setforms([...form_data]);
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
                                      id="discount"
                                      placeholder="Discount"
                                      value={form_data[data.key].discount}
                                      onChange={(e) => {
                                        form_data[data.key].discount =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
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
                {type === "Pipe" &&
                  form_data.length > 0 &&
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
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Size
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].size,
                                        value: form_data[data.key].size,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].size = e.value;
                                        setforms([...form_data]);
                                      }}
                                      options={SizeOptions}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Thickness
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].thickness,
                                        value: form_data[data.key].thickness,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].thickness = e.value;
                                        setforms([...form_data]);
                                      }}
                                      options={PipeThickness}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Grade
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].grade,
                                        value: form_data[data.key].grade,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].grade = e.value;
                                        setforms([...form_data]);
                                      }}
                                      options={gradepipe}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Stamp
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].stamp,
                                        value: form_data[data.key].stamp,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].stamp = e.label;
                                        setforms([...form_data]);
                                      }}
                                      options={stamp}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Status
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].status,
                                        value: form_data[data.key].status,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].status = e.label;
                                        setforms([...form_data]);
                                      }}
                                      options={status}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Shap
                                    </label>
                                    <Select
                                      value={{
                                        label: form_data[data.key].shape,
                                        value: form_data[data.key].shape,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].shape = e.label;
                                        setforms([...form_data]);
                                      }}
                                      options={shape}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-3">
                                    <label className="control-label">
                                      Brand
                                    </label>
                                    <Select
                                      onChange={(e) => {
                                        form_data[data.key].brand = e.label;
                                        setforms([...form_data]);
                                      }}
                                      options={brand}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Weight
                                    </label>
                                    <input
                                      type="number"
                                      step="any"
                                      id="weight"
                                      placeholder="Weight"
                                      onChange={(e) => {
                                        form_data[data.key].weight =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
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
                                      step="any"
                                      id="rate"
                                      placeholder="Rate"
                                      onChange={(e) => {
                                        form_data[data.key].rate =
                                          e.target.value;
                                        setforms([...form_data]);
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
                                      id="discount"
                                      placeholder="Discount"
                                      onChange={(e) => {
                                        form_data[data.key].discount =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Length
                                    </label>
                                    <input
                                      type="number"
                                      step="any"
                                      value="20"
                                      placeholder="Length"
                                      onChange={(e) => {
                                        form_data[data.key].length =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
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
                {type === "Scrap" &&
                  form_data.length > 0 &&
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
                                  <label className="control-label">Grade</label>
                                  <Select
                                    value={{
                                      label: form_data[data.key].grade,
                                      value: form_data[data.key].grade,
                                    }}
                                    onChange={(e) => {
                                      form_data[data.key].grade = e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={gradepipe}
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Weight
                                  </label>
                                  <input
                                    type="number"
                                    id="weight"
                                    value={form_data[data.key].weight}
                                    placeholder="Weight"
                                    onChange={(e) => {
                                      form_data[data.key].weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">Rate</label>
                                  <input
                                    type="number"
                                    id="rate"
                                    placeholder="Rate"
                                    value={form_data[data.key].rate}
                                    onChange={(e) => {
                                      form_data[data.key].rate = e.target.value;
                                      setforms([...form_data]);
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
                                    id="discount"
                                    placeholder="Discount"
                                    value={form_data[data.key].discount}
                                    onChange={(e) => {
                                      form_data[data.key].discount =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
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
                {type === "Short Length" &&
                  form_data.length > 0 &&
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
                                  <label className="control-label">Grade</label>
                                  <Select
                                    value={{
                                      label: form_data[data.key].grade,
                                      value: form_data[data.key].grade,
                                    }}
                                    onChange={(e) => {
                                      form_data[data.key].grade = e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={gradepipe}
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Weight
                                  </label>
                                  <input
                                    type="number"
                                    id="weight"
                                    value={form_data[data.key].weight}
                                    placeholder="Weight"
                                    onChange={(e) => {
                                      form_data[data.key].weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">Rate</label>
                                  <input
                                    type="number"
                                    id="rate"
                                    placeholder="Rate"
                                    value={form_data[data.key].rate}
                                    onChange={(e) => {
                                      form_data[data.key].rate = e.target.value;
                                      setforms([...form_data]);
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
                                    id="discount"
                                    placeholder="Discount"
                                    value={form_data[data.key].discount}
                                    onChange={(e) => {
                                      form_data[data.key].discount =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
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
