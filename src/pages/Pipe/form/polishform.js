import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const PolishForm = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      polm_id: 0,
      noofpipe: "",
      bundle: "",
      loose: "",
      weight: "",
      handling: "",
      tagging: "",
      packing_quality: "",
      weights: "",
      pipes: "",
      grade: "",
      thickness: "",
      coilId: "",
      stamp: "",
      sizes: "",
      status: "",
    },
  ]);

  var [vedorlistNames, setVendorlist] = useState([]);

  useEffect(() => {
    api({ api: "/storeitem/polishinlist/" }).then((data) => {
      setVendorlist(data);
    });
  }, []);

  const stat = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const status = [
    { value: "Ok", label: "Ok" },
    { value: "Not Ok", label: "Not Ok" },
  ];

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/tubeshiftdata/",
      method: "post",
      body: { form: form_data, post: 7 },
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
        polm_id: 0,
        noofpipe: "",
        bundle: "",
        loose: "",
        weight: "",
        handling: "",
        tagging: "",
        packing_quality: "",
        weights: "",
        pipes: "",
        grade: "",
        thickness: "",
        coilId: "",
        stamp: "",
        sizes: "",
        status: "",
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
        tabIndex="-1">
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
                aria-label="Close"></button>
            </div>
            <div
              className="modal-body"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}>
              <div className="main-form">
                {" "}
                {/* inner forms */}
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].polm_id = e.value;
                                      form_data[data.key].coil = e.label;
                                      form_data[data.key].grade = e.grade;
                                      form_data[data.key].sizes = e.sizes;
                                      form_data[data.key].coilId = e.coilId;
                                      form_data[data.key].thickness =
                                        e.thickness;
                                      form_data[data.key].stamp = e.stamps;
                                      form_data[data.key].weights = e.weights;
                                      form_data[data.key].pipes = e.pipes;
                                      form_data[data.key].status = e.status;
                                      setforms([...form_data]);
                                    }}
                                    options={vedorlistNames}
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
                                  <label className="control-label">
                                    Weight
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Operator Name"
                                    className="form-control"
                                    value={form_data[data.key].weights}
                                    onChange={(e) => {
                                      form_data[data.key].weights =
                                        e.target.value;
                                    }}
                                    disabled
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
                                    value={form_data[data.key].pipes}
                                    onChange={(e) => {
                                      form_data[data.key].pipes =
                                        e.target.value;
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
                                  placeholder="No of Pipe"
                                  onChange={(e) => {
                                    form_data[data.key].noofpipe =
                                      e.target.value;
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
                                  onChange={(e) => {
                                    form_data[data.key].weight = e.target.value;
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Bundle</label>
                                <input
                                  type="number"
                                  placeholder="Bundle"
                                  onChange={(e) => {
                                    form_data[data.key].bundle = e.target.value;
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
                                  placeholder="Loose Pipe"
                                  onChange={(e) => {
                                    form_data[data.key].loose = e.target.value;
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Packing Quality
                                </label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].packing_quality =
                                      e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={status}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Handling
                                </label>
                                <Select
                                  onChange={(e) => {
                                    form_data[data.key].handling = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={status}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Tagging</label>
                                <Select
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
