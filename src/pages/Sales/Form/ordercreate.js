import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import CSV_READER from "../../../components/Common/csv_read";

export const Order_form = () => {
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

  var [vedorlistNames, setVendorlist] = useState([]);

  const [modalData, setModalData] = React.useState({
    id: 0,
    type: "",
  });

  var [common_data, setcommon_data] = useState({
    status: "",
    remarks: "",
    bod: 0,
  });

  const [GradeOptions, setGradeOptions] = useState("");
  const [SizeOptions, setSizeOptions] = useState("");
  const [Thicknessoptions, setThicknessOptions] = useState("");
  const [PipeThickness, setpipethickness] = useState("");
  const [gradepipe, setgradepipe] = useState("");

  useEffect(() => {
    api({ api: "/storeitem/bookingfilter/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/gradelist/" }).then((data) => {
      setGradeOptions(data);
    });
    api({ api: "/storeitem/thicknesslist/" }).then((data) => {
      setThicknessOptions(data);
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
  function Senddata() {
    api({
      api: "/api/order/",
      method: "post",
      body: {
        form: form_data,
        post: 2,
        modal: modalData,
        common: common_data,
      },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  const form_fields = {
    key: 0,
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
    bo_id: 0,
  };

  var [form_data, setforms] = useState([form_fields]);

  function handleAddForm() {
    setforms([...form_data, { ...form_fields }]);
  }

  const handleFileUpload = (e) => {
    CSV_READER(e).then((data) => {
      console.log(e);
      handleRemoveForm(0);
      for (var i = 0; i < data.length; i++) {
        var form_body = {
          size: data[i].size,
          thickness: data[i].thickness,
          grade: data[i].grade,
          weight: data[i].weight,
          discount: data[i].discount,
          rate: data[i].rate,
          stamp: data[i].stamp,
          status: data[i].status,
          shape: data[i].shape,
          brand: data[i].brand,
          length: data[i].length,
        };
        form_data.push(form_body);
        setforms([...form_data]);
      }
    });
  };

  console.log(form_data);
  // remove
  function handleRemoveForm(index) {
    form_data.splice(index, 1);
    setforms([...form_data]);
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
                {/* common form */}
                <div className="row">
                  <div className="col-md-2">
                    <label className="control-label">Booking ID</label>
                    <Select
                      onChange={(e) => {
                        common_data.bod = e.value;
                        common_data.type = e.status;
                        setcommon_data({ ...common_data });
                      }}
                      options={vedorlistNames}
                    />
                    {common_data.bod === 0 ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label className="control-label text-left">status</label>
                    <Select
                      options={[
                        { label: "Coil", value: "Coil" },
                        { label: "Pipe", value: "Pipe" },
                        { label: "Scrap", value: "Scrap" },
                        { label: "Short Length", value: "Short Length" },
                        { label: "Sheet", value: "Sheet" },
                      ]}
                      onChange={(e) =>
                        setModalData({ ...modalData, type: e.value })
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Remarks</label>
                    <input
                      type="text"
                      className="form-control"
                      value={common_data.remarks}
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          remarks: e.target.value,
                        })
                      }
                    />
                  </div>
                  <label className="control-label">Upload Excel File</label>
                  <input
                    type="file"
                    className="m-2 form-control text-danger w-25"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                </div>
                <br />
                {modalData.type === "Coil" &&
                  form_data.length > 0 &&
                  form_data.map((data, index) => {
                    return (
                      <div key={index}>
                        <form
                          key={index}
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddForm(index);
                          }}>
                          <div
                            className="row"
                            style={{ "--bs-gutter-x": " 0rem" }}>
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <input
                                    type="number"
                                    placeholder="Size"
                                    value={form_data[index].size}
                                    onChange={(e) => {
                                      form_data[index].size = e.target.value;
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
                                      label: form_data[index].thickness,
                                      value: form_data[index].thickness,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].thickness = e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={Thicknessoptions}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <Select
                                    value={{
                                      label: form_data[index].grade,
                                      value: form_data[index].grade,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].grade = e.value;
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
                                    value={form_data[index].weight}
                                    placeholder="Weight"
                                    onChange={(e) => {
                                      form_data[index].weight = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Rate</label>
                                  <input
                                    type="number"
                                    id="rate"
                                    placeholder="Rate"
                                    value={form_data[index].rate}
                                    onChange={(e) => {
                                      form_data[index].rate = e.target.value;
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
                                    value={form_data[index].discount}
                                    onChange={(e) => {
                                      form_data[index].discount =
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
                                    {index}
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
                        </form>
                      </div>
                    );
                  })}
                {modalData.type === "Sheet" &&
                  form_data.length > 0 &&
                  form_data.map((data, index) => {
                    return (
                      <div key={index}>
                        <form
                          key={index}
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddForm(index);
                          }}>
                          <div
                            className="row"
                            style={{ "--bs-gutter-x": " 0rem" }}>
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    value={form_data[index].size}
                                    onChange={(e) => {
                                      form_data[index].size = e.target.value;
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
                                      label: form_data[index].thickness,
                                      value: form_data[index].thickness,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].thickness = e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={Thicknessoptions}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <Select
                                    value={{
                                      label: form_data[index].grade,
                                      value: form_data[index].grade,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].grade = e.value;
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
                                    value={form_data[index].weight}
                                    placeholder="Weight"
                                    onChange={(e) => {
                                      form_data[index].weight = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Rate</label>
                                  <input
                                    type="number"
                                    id="rate"
                                    placeholder="Rate"
                                    value={form_data[index].rate}
                                    onChange={(e) => {
                                      form_data[index].rate = e.target.value;
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
                                    value={form_data[index].discount}
                                    onChange={(e) => {
                                      form_data[index].discount =
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
                                    {index}
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
                        </form>
                      </div>
                    );
                  })}
                {modalData.type === "Pipe" &&
                  form_data.length > 0 &&
                  form_data.map((data, index) => {
                    return (
                      <div key={index}>
                        <form
                          key={index}
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddForm(index);
                          }}>
                          <div
                            className="row"
                            style={{ "--bs-gutter-x": " 0rem" }}>
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <Select
                                    value={{
                                      label: form_data[index].size,
                                      value: form_data[index].size,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].size = e.value;
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
                                      label: form_data[index].thickness,
                                      value: form_data[index].thickness,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].thickness = e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={PipeThickness}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <Select
                                    value={{
                                      label: form_data[index].grade,
                                      value: form_data[index].grade,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].grade = e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={gradepipe}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Stamp</label>
                                  <Select
                                    value={{
                                      label: form_data[index].stamp,
                                      value: form_data[index].stamp,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].stamp = e.label;
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
                                      label: form_data[index].status,
                                      value: form_data[index].status,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].status = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={status}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Shape</label>
                                  <Select
                                    value={{
                                      label: form_data[index].shape,
                                      value: form_data[index].shape,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].shape = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={shape}
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">Brand</label>
                                  <Select
                                    value={{
                                      label: form_data[index].brand,
                                      value: form_data[index].brand,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].brand = e.label;
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
                                    value={form_data[index].weight}
                                    placeholder="Weight"
                                    onChange={(e) => {
                                      form_data[index].weight = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Rate</label>
                                  <input
                                    type="number"
                                    step="any"
                                    value={form_data[index].rate}
                                    placeholder="Rate"
                                    onChange={(e) => {
                                      form_data[index].rate = e.target.value;
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
                                    value={form_data[index].discount}
                                    placeholder="Discount"
                                    onChange={(e) => {
                                      form_data[index].discount =
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
                                    value={form_data[index].length || "20"}
                                    placeholder="Length"
                                    onChange={(e) => {
                                      form_data[index].length = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                              </div>
                              <br />
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
                                    {index}
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
                        </form>
                      </div>
                    );
                  })}
                {modalData.type === "Scrap" &&
                  form_data.length > 0 &&
                  form_data.map((data, index) => {
                    return (
                      <div key={index}>
                        <form
                          key={index}
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddForm(index);
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
                                      label: form_data[index].grade,
                                      value: form_data[index].grade,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].grade = e.value;
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
                                    value={form_data[index].weight}
                                    placeholder="Weight"
                                    onChange={(e) => {
                                      form_data[index].weight = e.target.value;
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
                                    value={form_data[index].rate}
                                    onChange={(e) => {
                                      form_data[index].rate = e.target.value;
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
                                    value={form_data[index].discount}
                                    onChange={(e) => {
                                      form_data[index].discount =
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
                                    {index}
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
                        </form>
                      </div>
                    );
                  })}
                {modalData.type === "Short Length" &&
                  form_data.length > 0 &&
                  form_data.map((data, index) => {
                    return (
                      <div key={index}>
                        <form
                          key={index}
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddForm(index);
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
                                      label: form_data[index].grade,
                                      value: form_data[index].grade,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].grade = e.value;
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
                                    value={form_data[index].weight}
                                    placeholder="Weight"
                                    onChange={(e) => {
                                      form_data[index].weight = e.target.value;
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
                                    value={form_data[index].rate}
                                    onChange={(e) => {
                                      form_data[index].rate = e.target.value;
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
                                    value={form_data[index].discount}
                                    onChange={(e) => {
                                      form_data[index].discount =
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
                                    {index}
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
