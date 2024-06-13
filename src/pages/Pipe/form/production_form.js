import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const ProductionForm = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      pipe_weight: "",
      total_pipe: "",
      hole_pipe: "",
      scrap_weight: "",
      hweight: "",
      short_length: "",
      short_weight: "",
      stopage_reasons: "",
      running_hrs: "",
      other_reasons: "",
      tube_id: 0,
      foa_id: "",
      edge_quality: "",
      crane_weight: "",
      shift: "",
      helper_name: "",
      operator_name: "",
      surface_quality: "",
      planid: "",
      coilid: "",
      slitid: "",
      mill: "",
      loose: "",
      no_pipe: "",
      bundle: "",
      loosepipe: "",
      rejected_weight: "",
      welding: "",
      type_of_rejection: "",
      lining: "",
      od: "",
      str: "",
      mark: "",
      stamp: "",
      finish: "",
    },
  ]);

  const [modalData, setModalData] = React.useState({
    id: 0,
    type: "",
  });

  var [vedorlistNames, setVendorlist] = useState([]);
  var [nonpolish, setnonpolishlist] = useState([]);
  var [polishlist, setpolishlist] = useState([]);
  var [polishinslist, setpolishinslist] = useState([]);
  var [scraplist, setscraplist] = useState([]);
  var [shortlengthlist, setshortlengthlist] = useState([]);

  useEffect(() => {
    api({ api: "/storeitem/tubemilllist/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/NonPolishlMist/" }).then((data) => {
      setnonpolishlist(data);
    });
    api({ api: "/storeitem/polishlist/" }).then((data) => {
      setpolishlist(data);
    });
    api({ api: "/storeitem/polishinslist/" }).then((data) => {
      setpolishinslist(data);
    });
    api({ api: "/storeitem/scraplist/" }).then((data) => {
      setscraplist(data);
    });
    api({ api: "/storeitem/shortlengthlist/" }).then((data) => {
      setshortlengthlist(data);
    });
  }, []);

  const status1 = [
    { value: "TubeMill Shift", label: "TubeMill Shift" },
    { value: "Non Polish Movement", label: "Non Polish Movement" },
    { value: "Polish Inspection", label: "Polish Inspection" },
    { value: "Polish Movement", label: "Polish Movement" },
    { value: "Scrap", label: "Scrap" },
    { value: "Short Length", label: "Short Length" },
  ];

  const stat = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  const shift = [
    { value: "Shift A", label: "Shift A" },
    { value: "Shift B", label: "Shift B" },
  ];

  const status2 = [
    { value: "Ok", label: "Ok" },
    { value: "Not Ok", label: "Not Ok" },
  ];

  const stamp = [
    { value: "Ok", label: "Ok" },
    { value: "Not Ok", label: "Not Ok" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const finesh = [
    { value: "Ok", label: "Ok" },
    { value: "Not Ok", label: "Not Ok" },
    { value: "Medium Quality", label: "Medium Quality" },
  ];

  const mark = [
    { value: "Flap", label: "Flap" },
    { value: "Roll", label: "Roll" },
    { value: "Minnor Roll Marking", label: "Minnor Roll Marking" },
    { value: "No Issue", label: "No Issue" },
  ];

  const rejected = [
    { value: "Hole", label: "Hole" },
    { value: "Wave", label: "Wave" },
    { value: "Deep Welding", label: "Deep Welding" },
    { value: "Open", label: "Open" },
    { value: "No Issue", label: "No Issue" },
  ];

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/tubeshiftdata/",
      method: "post",
      body: { form: form_data, type: modalData, post: 1 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("Failed", { autoClose: 2000 });
      });
  }
  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        pipe_weight: "",
        total_pipe: "",
        hole_pipe: "",
        scrap_weight: "",
        hweight: "",
        short_length: "",
        short_weight: "",
        stopage_reasons: "",
        running_hrs: "",
        other_reasons: "",
        tube_id: 0,
        foa_id: "",
        edge_quality: "",
        crane_weight: "",
        shift: "",
        helper_name: "",
        operator_name: "",
        surface_quality: "",
        planid: "",
        coilid: "",
        slitid: "",
        mill: "",
        no_pipe: "",
        bundle: "",
        loosepipe: "",
        rejected_weight: "",
        welding: "",
        type_of_rejection: "",
        lining: "",
        od: "",
        str: "",
        mark: "",
        stamp: "",
        finish: "",
      };
      setforms([...form_data, form_body]);
    }
  }
  console.log("form_data:", form_data);

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
                Polish
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
                <div className="row">
                  <div className="col-md-4">
                    <label className="control-label text-left">Type</label>
                    <Select
                      onChange={(e) =>
                        setModalData({ ...modalData, type: e.value })
                      }
                      options={status1}
                    />
                    {modalData.type === 0 ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <br />
                {/* inner forms */}
                {modalData.type === "TubeMill Shift" &&
                  form_data.length > 0 &&
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].tube_id = e.value;
                                      form_data[data.key].coil = e.label;
                                      form_data[data.key].pipe_weight =
                                        e.pipe_weight;
                                      form_data[data.key].total_pipe =
                                        e.total_pipe;
                                      form_data[data.key].hole_pipe =
                                        e.hole_pipe;
                                      form_data[data.key].scrap_weight =
                                        e.scrap_weight;
                                      form_data[data.key].hweight = e.hweight;
                                      form_data[data.key].short_length =
                                        e.short_length;
                                      form_data[data.key].short_weight =
                                        e.short_weight;
                                      form_data[data.key].stopage_reasons =
                                        e.stopage_reasons;
                                      form_data[data.key].running_hrs =
                                        e.running_hrs;
                                      form_data[data.key].foa_id = e.foa;
                                      form_data[data.key].edge_quality = e.edge;
                                      form_data[data.key].crane_weight =
                                        e.crane;
                                      form_data[data.key].shift = e.shift;
                                      form_data[data.key].helper_name =
                                        e.helper;
                                      form_data[data.key].operator_name =
                                        e.operator;
                                      form_data[data.key].surface_quality =
                                        e.surface;
                                      form_data[data.key].planno = e.plan;
                                      form_data[data.key].mill = e.mill;
                                      form_data[data.key].sizes = e.size;
                                      form_data[data.key].grade = e.grade;
                                      form_data[data.key].thickness =
                                        e.thickness;
                                      form_data[data.key].coilid = e.coilid;
                                      setforms([...form_data]);
                                    }}
                                    options={vedorlistNames}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Plan No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Coil No."
                                    className="form-control"
                                    value={form_data[data.key].planno}
                                    onChange={(e) => {
                                      form_data[data.key].planno =
                                        e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    className="form-control"
                                    value={form_data[data.key].sizes}
                                    onChange={(e) => {
                                      form_data[data.key].sizes =
                                        e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Mill No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Mill No."
                                    className="form-control"
                                    value={form_data[data.key].mill}
                                    onChange={(e) => {
                                      form_data[data.key].mill = e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Slit Weight
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Slit Weight"
                                    value={form_data[data.key].crane_weight}
                                    onChange={(e) => {
                                      form_data[data.key].crane_weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 row">
                              <div className="col-md-2">
                                <label className="control-label">
                                  Total Pipe
                                </label>
                                <input
                                  type="number"
                                  value={form_data[data.key].total_pipe}
                                  placeholder="Total Pipe"
                                  onChange={(e) => {
                                    form_data[data.key].total_pipe =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Pipe Weight
                                </label>
                                <input
                                  type="number"
                                  placeholder="Pipe Weight"
                                  value={form_data[data.key].pipe_weight}
                                  onChange={(e) => {
                                    form_data[data.key].pipe_weight =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Scrap Weight
                                </label>
                                <input
                                  type="number"
                                  placeholder="Scrap Weight"
                                  value={form_data[data.key].scrap_weight}
                                  onChange={(e) => {
                                    form_data[data.key].scrap_weight =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Hole Pipe
                                </label>
                                <input
                                  type="number"
                                  placeholder="Hole Pipe"
                                  value={form_data[data.key].hole_pipe}
                                  onChange={(e) => {
                                    form_data[data.key].hole_pipe =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Hole Weight
                                </label>
                                <input
                                  type="number"
                                  placeholder="Hole Weight"
                                  value={form_data[data.key].hweight}
                                  onChange={(e) => {
                                    form_data[data.key].hweight =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Short Length
                                </label>
                                <input
                                  type="number"
                                  placeholder="Short Length"
                                  value={form_data[data.key].short_length}
                                  onChange={(e) => {
                                    form_data[data.key].short_length =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  S/L Weight
                                </label>
                                <input
                                  type="number"
                                  placeholder="Short Length Weight"
                                  value={form_data[data.key].short_weight}
                                  onChange={(e) => {
                                    form_data[data.key].short_weight =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-3">
                                <label className="control-label">
                                  Stoppage Reasons
                                </label>
                                <input
                                  type="text"
                                  placeholder="Stoppage Reasons"
                                  value={form_data[data.key].stopage_reasons}
                                  onChange={(e) => {
                                    form_data[data.key].stopage_reasons =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Running Hours
                                </label>
                                <input
                                  type="number"
                                  placeholder="Running Hours"
                                  value={form_data[data.key].running_hrs}
                                  onChange={(e) => {
                                    form_data[data.key].running_hrs =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Shift</label>
                                <Select
                                  value={{
                                    label: form_data[data.key].shift,
                                    value: form_data[data.key].shift,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].shift = e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={shift}
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Edge Quality:
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].edge_quality,
                                    value: form_data[data.key].edge_quality,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].edge_quality = e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={status2}
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Surface Quality:
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].surface_quality,
                                    value: form_data[data.key].surface_quality,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].surface_quality =
                                      e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={status2}
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Operator Name:
                                </label>
                                <input
                                  type="text"
                                  placeholder="Operator Name:"
                                  value={form_data[data.key].operator_name}
                                  onChange={(e) => {
                                    form_data[data.key].operator_name =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Helper Name:
                                </label>
                                <input
                                  type="text"
                                  placeholder="Helper Name:"
                                  value={form_data[data.key].helper_name}
                                  onChange={(e) => {
                                    form_data[data.key].helper_name =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    );
                  })}
                {modalData.type === "Non Polish Movement" &&
                  form_data.length > 0 &&
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-5">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].tube_id = e.value;
                                      form_data[data.key].sizes = e.size;
                                      form_data[data.key].grade = e.grade;
                                      form_data[data.key].mill = e.mill;
                                      form_data[data.key].plan = e.plan;
                                      form_data[data.key].planid = e.planid;
                                      form_data[data.key].coilid = e.coilid;
                                      form_data[data.key].straightness =
                                        e.straightness;
                                      form_data[data.key].tagging = e.tagging;
                                      form_data[data.key].remarks = e.remarks;

                                      form_data[data.key].total_pipe =
                                        e.noofpipe;
                                      form_data[data.key].pipe_weight =
                                        e.weight;
                                      form_data[data.key].welding_quality =
                                        e.welding_quality;
                                      form_data[data.key].surface_quality =
                                        e.surface_quality;
                                      form_data[data.key].handling = e.handling;
                                      setforms([...form_data]);
                                    }}
                                    options={nonpolish}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <input
                                    type="text"
                                    placeholder="Coil No."
                                    className="form-control"
                                    value={form_data[data.key].grade}
                                    onChange={(e) => {
                                      form_data[data.key].grade =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    className="form-control"
                                    value={form_data[data.key].sizes}
                                    onChange={(e) => {
                                      form_data[data.key].sizes =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Mill No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Mill No."
                                    className="form-control"
                                    value={form_data[data.key].mill}
                                    onChange={(e) => {
                                      form_data[data.key].mill = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 row">
                              <div className="col-md-2">
                                <label className="control-label">
                                  Total Pipe
                                </label>
                                <input
                                  type="number"
                                  placeholder="Pipe"
                                  className="form-control"
                                  value={form_data[data.key].total_pipe}
                                  onChange={(e) => {
                                    form_data[data.key].total_pipe =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Pipe Weight
                                </label>
                                <input
                                  type="number"
                                  placeholder="Pipe Weight"
                                  className="form-control"
                                  value={form_data[data.key].pipe_weight}
                                  onChange={(e) => {
                                    form_data[data.key].pipe_weight =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Remarks</label>
                                <input
                                  type="text"
                                  value={form_data[data.key].remarks}
                                  onChange={(e) => {
                                    form_data[data.key].remarks =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Welding Quality
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].welding_quality,
                                    value: form_data[data.key].welding_quality,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].welding_quality =
                                      e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={status2}
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Surface Quality
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].surface_quality,
                                    value: form_data[data.key].surface_quality,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].surface_quality =
                                      e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={status2}
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Handling
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].handling,
                                    value: form_data[data.key].handling,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].handling = e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={status2}
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Straightness
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].straightness,
                                    value: form_data[data.key].straightness,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].straightness = e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={status2}
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Tagging</label>
                                <Select
                                  value={{
                                    label: form_data[data.key].tagging,
                                    value: form_data[data.key].tagging,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].tagging = e.label;
                                    setforms([...form_data]);
                                  }}
                                  options={stat}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    );
                  })}

                {modalData.type === "Scrap" &&
                  form_data.length > 0 &&
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-5">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].tube_id = e.value;
                                      form_data[data.key].coil = e.label;
                                      form_data[data.key].grade = e.grade;
                                      form_data[data.key].pipe_weight =
                                        e.weight;
                                      form_data[data.key].planid = e.planid;
                                      setforms([...form_data]);
                                    }}
                                    options={scraplist}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <input
                                    type="text"
                                    placeholder="Grade"
                                    className="form-control"
                                    value={form_data[data.key].grade}
                                    onChange={(e) => {
                                      form_data[data.key].grade =
                                        e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Plan No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Plan No."
                                    className="form-control"
                                    value={form_data[data.key].planid}
                                    onChange={(e) => {
                                      form_data[data.key].planid =
                                        e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Weight
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Weight"
                                    className="form-control"
                                    value={form_data[data.key].pipe_weight}
                                    onChange={(e) => {
                                      form_data[data.key].pipe_weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                  />
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-5">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].tube_id = e.value;
                                      form_data[data.key].coil = e.label;
                                      form_data[data.key].grade = e.grade;
                                      form_data[data.key].pipe = e.pipe;
                                      form_data[data.key].pipe_weight =
                                        e.weight;
                                      form_data[data.key].planid = e.planid;
                                      setforms([...form_data]);
                                    }}
                                    options={shortlengthlist}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <input
                                    type="text"
                                    placeholder="Grade"
                                    className="form-control"
                                    value={form_data[data.key].grade}
                                    onChange={(e) => {
                                      form_data[data.key].grade =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Plan No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Plan No."
                                    className="form-control"
                                    value={form_data[data.key].planid}
                                    onChange={(e) => {
                                      form_data[data.key].planid =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Weight
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Weight"
                                    className="form-control"
                                    value={form_data[data.key].pipe_weight}
                                    onChange={(e) => {
                                      form_data[data.key].pipe_weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Pipe</label>
                                  <input
                                    type="text"
                                    placeholder="Pipe"
                                    className="form-control"
                                    value={form_data[data.key].pipe}
                                    onChange={(e) => {
                                      form_data[data.key].pipe = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    );
                  })}

                {modalData.type === "Polish Movement" &&
                  form_data.length > 0 &&
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].tube_id = e.value;
                                      form_data[data.key].coil = e.label;
                                      form_data[data.key].grade = e.grade;
                                      form_data[data.key].sizes = e.sizes;
                                      form_data[data.key].plan = e.planid;
                                      form_data[data.key].bundle = e.bundle;
                                      form_data[data.key].pipe_weight =
                                        e.weight;
                                      form_data[data.key].total_pipe =
                                        e.noofpipe;
                                      form_data[data.key].loosepipe = e.loose;
                                      form_data[data.key].handling = e.handling;
                                      form_data[data.key].tagging = e.tagging;
                                      form_data[data.key].packing_quality =
                                        e.packing_quality;
                                      setforms([...form_data]);
                                    }}
                                    options={polishlist}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    className="form-control"
                                    value={form_data[data.key].sizes}
                                    onChange={(e) => {
                                      form_data[data.key].sizes =
                                        e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    className="form-control"
                                    value={form_data[data.key].grade}
                                    onChange={(e) => {
                                      form_data[data.key].grade =
                                        e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Weight
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Operator Name"
                                    className="form-control"
                                    value={form_data[data.key].pipe_weight}
                                    onChange={(e) => {
                                      form_data[data.key].pipe_weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    No of Pipe
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="No of Pipe"
                                    className="form-control"
                                    value={form_data[data.key].total_pipe}
                                    onChange={(e) => {
                                      form_data[data.key].total_pipe =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 row">
                              <div className="col-md-2">
                                <label className="control-label">
                                  Pipe Weight
                                </label>
                                <input
                                  type="number"
                                  placeholder="Pipe Weight"
                                  value={form_data[data.key].pipe_weight}
                                  onChange={(e) => {
                                    form_data[data.key].pipe_weight =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Bundle</label>
                                <input
                                  type="number"
                                  placeholder="Bundle"
                                  value={form_data[data.key].bundle}
                                  onChange={(e) => {
                                    form_data[data.key].bundle = e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Loose Pipe
                                </label>
                                <input
                                  type="number"
                                  value={form_data[data.key].loosepipe}
                                  placeholder="Loose Pipe"
                                  onChange={(e) => {
                                    form_data[data.key].loosepipe =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Packing Quality
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].packing_quality,
                                    value: form_data[data.key].packing_quality,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].packing_quality =
                                      e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={status2}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Handling
                                </label>
                                <Select
                                  value={{
                                    label: form_data[data.key].handling,
                                    value: form_data[data.key].handling,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].handling = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={status2}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Tagging</label>
                                <Select
                                  value={{
                                    label: form_data[data.key].tagging,
                                    value: form_data[data.key].tagging,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].tagging = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={stat}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    );
                  })}
                {modalData.type === "Polish Inspection" &&
                  form_data.length > 0 &&
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].tube_id = e.value;
                                      form_data[data.key].coil = e.label;
                                      form_data[data.key].pipe_weight =
                                        e.batch_weight;
                                      form_data[data.key].no_pipe = e.no_pipe;
                                      form_data[data.key].bundle = e.bundle;
                                      form_data[data.key].loosepipe =
                                        e.loosepipe;
                                      form_data[data.key].rejected_weight =
                                        e.rejected_weight;
                                      form_data[data.key].welding = e.welding;
                                      form_data[data.key].type_of_rejection =
                                        e.type_of_rejection;
                                      form_data[data.key].lining = e.lining;
                                      form_data[data.key].od = e.od;
                                      form_data[data.key].str = e.str;
                                      form_data[data.key].mark = e.mark;
                                      form_data[data.key].stamp = e.stamp;
                                      form_data[data.key].finish = e.finish;
                                      form_data[data.key].remarks = e.remarks;
                                      form_data[data.key].value = e.value;
                                      form_data[data.key].grade = e.grade;
                                      form_data[data.key].sizes = e.sizes;
                                      form_data[data.key].planid = e.planid;
                                      setforms([...form_data]);
                                    }}
                                    options={polishinslist}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Plan No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Grade"
                                    className="form-control"
                                    value={form_data[data.key].planid}
                                    onChange={(e) => {
                                      form_data[data.key].planid =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <input
                                    type="text"
                                    placeholder="Grade"
                                    className="form-control"
                                    value={form_data[data.key].grade}
                                    onChange={(e) => {
                                      form_data[data.key].grade =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    className="form-control"
                                    value={form_data[data.key].sizes}
                                    onChange={(e) => {
                                      form_data[data.key].sizes =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Total Pipe
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Pipe"
                                    className="form-control"
                                    value={form_data[data.key].no_pipe}
                                    onChange={(e) => {
                                      form_data[data.key].no_pipe =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 row">
                              <div className="col-md-2">
                                <label className="control-label">
                                  Pipe Weight
                                </label>
                                <input
                                  type="number"
                                  placeholder="Pipe Weight"
                                  className="form-control"
                                  value={form_data[data.key].pipe_weight}
                                  onChange={(e) => {
                                    form_data[data.key].pipe_weight =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Bundle</label>
                                <input
                                  type="number"
                                  placeholder="Bundle"
                                  value={form_data[data.key].bundle}
                                  onChange={(e) => {
                                    form_data[data.key].bundle = e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Loose Bundle
                                </label>
                                <input
                                  type="number"
                                  placeholder="Loose Bundle"
                                  value={form_data[data.key].loosepipe}
                                  onChange={(e) => {
                                    form_data[data.key].loosepipe =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Reject Pipe Weight
                                </label>
                                <input
                                  type="number"
                                  placeholder="Weight"
                                  value={form_data[data.key].rejected_weight}
                                  onChange={(e) => {
                                    form_data[data.key].rejected_weight =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Welding</label>
                                <Select
                                  value={{
                                    label: form_data[data.key].welding,
                                    value: form_data[data.key].welding,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].welding = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={stat}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">OD</label>
                                <Select
                                  value={{
                                    label: form_data[data.key].od,
                                    value: form_data[data.key].od,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].od = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={stat}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">STR</label>
                                <Select
                                  value={{
                                    label: form_data[data.key].str,
                                    value: form_data[data.key].str,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].str = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={stat}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Stamp</label>
                                <Select
                                  value={{
                                    label: form_data[data.key].stamp,
                                    value: form_data[data.key].stamp,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].stamp = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={stamp}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Finesh</label>
                                <Select
                                  value={{
                                    label: form_data[data.key].finish,
                                    value: form_data[data.key].finish,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].finish = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={finesh}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Mark</label>
                                <Select
                                  value={{
                                    label: form_data[data.key].mark,
                                    value: form_data[data.key].mark,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].mark = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={mark}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Type of Rejection
                                </label>
                                <Select
                                  value={{
                                    label:
                                      form_data[data.key].type_of_rejection,
                                    value:
                                      form_data[data.key].type_of_rejection,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].type_of_rejection =
                                      e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={rejected}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Remarks</label>
                                <input
                                  type="text"
                                  value={form_data[data.key].remarks}
                                  onChange={(e) => {
                                    form_data[data.key].remarks =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    );
                  })}
                {/* end inner forms */}
                <br />
                <center>
                  <input
                    id="submit"
                    type="submit"
                    className="btn btn-success border-secondary"
                    onClick={Senddata}
                    value="Submit"
                  />
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
