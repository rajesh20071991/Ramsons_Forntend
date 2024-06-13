import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const Tubemill_Form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      plan_id: 0,
      start: "",
      endtime: "",
      crane_weight: "",
      pipe_weight: "",
      total_pipe: "",
      repairpipe: "",
      hole_pipe: "",
      scrap_weight: "",
      hweight: "",
      short_length: "",
      short_weight: "",
      shift: "",
      coil: "",
      sizes: "",
      mill: "",
      rweight: 0,
      rwidth: 0,
      company: 0,
      burning: 0,
    },
  ]);

  var [vedorlistNames, setVendorlist] = useState([]);

  useEffect(() => {
    api({ api: "/storeitem/tubelist/" }).then((data) => {
      setVendorlist(data);
    });
  }, []);

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/first_observation/",
      method: "post",
      body: { form: form_data, post: 3 },
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
        plan_id: 0,
        start: "",
        endtime: "",
        crane_weight: "",
        pipe_weight: "",
        total_pipe: "",
        repairpipe: "",
        hole_pipe: "",
        scrap_weight: "",
        hweight: "",
        short_length: "",
        short_weight: "",
        shift: "",
        coil: "",
        sizes: "",
        mill: "",
        rweight: 0,
        rwidth: 0,
        company: 0,
        burning: 0,
      };
      setforms([...form_data, form_body]);
    }
  }
  console.log("form_data:", form_data);

  function cal_amount(key) {
    var amount = parseFloat(
      Number(form_data[key].crane_weight) -
        (Number(form_data[key].pipe_weight) +
          Number(form_data[key].scrap_weight)+
          Number(form_data[key].slweight))
    );
    form_data[key].burning = Number(amount.toFixed(3));
    setforms([...form_data]);
    console.log(amount);
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
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Tube-Mill Form
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
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Plan No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].plan_id = e.value;
                                      form_data[data.key].coil = e.coil;
                                      form_data[data.key].sizes = e.sizes;
                                      form_data[data.key].mill = e.mill;
                                      form_data[data.key].total_pipe = e.pipe;
                                      form_data[data.key].pipe_weight =
                                        e.weight;
                                      form_data[data.key].company = e.company;
                                      form_data[data.key].hole_pipe = e.hpipe;
                                      form_data[data.key].scrap_weight =
                                        e.scrap;
                                      form_data[data.key].hweight = e.hweights;
                                      form_data[data.key].short_length = e.sl;
                                      form_data[data.key].short_weight =
                                        e.slweight;
                                      form_data[data.key].crane_weight =
                                        e.crane;
                                      var amount =
                                        Number(e.crane) -
                                        (Number(e.weight) +
                                          Number(e.scrap) +
                                          Number(e.hweights));
                                      form_data[data.key].burning = amount;
                                      setforms([...form_data]);
                                    }}
                                    options={vedorlistNames}
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Coil No."
                                    className="form-control"
                                    value={form_data[data.key].coil}
                                    onChange={(e) => {
                                      form_data[data.key].coil = e.target.value;
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
                                    Total Pipe
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Pipe"
                                    className="form-control"
                                    value={form_data[data.key].total_pipe}
                                    onChange={(e) => {
                                      form_data[data.key].total_pipe =
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
                                  Pipe Weight
                                </label>
                                <input
                                  type="text"
                                  placeholder="Pipe Weight"
                                  className="form-control"
                                  value={form_data[data.key].pipe_weight}
                                  onChange={(e) => {
                                    form_data[data.key].pipe_weight =
                                      e.target.value;
                                    cal_amount(data.key);
                                  }}
                                  disabled
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
                                    cal_amount(data.key);
                                  }}
                                  className="form-control"
                                  disabled
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
                                  }}
                                  className="form-control"
                                  disabled
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
                                    cal_amount(data.key);
                                  }}
                                  className="form-control"
                                  disabled
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
                                  }}
                                  className="form-control"
                                  disabled
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
                                    cal_amount(data.key);
                                  }}
                                  className="form-control"
                                  disabled
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Repair Pipe
                                </label>
                                <input
                                  type="number"
                                  placeholder="No of Pipe"
                                  onChange={(e) => {
                                    form_data[data.key].repairpipe =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Burning Loss
                                </label>
                                <input
                                  type="number"
                                  placeholder="Burning Loss"
                                  value={form_data[data.key].burning}
                                  onChange={(e) => {
                                    form_data[data.key].burning =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Remaining Weight
                                </label>
                                <input
                                  type="number"
                                  value={form_data[data.key].rweight}
                                  onChange={(e) => {
                                    form_data[data.key].rweight =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Remaining Width
                                </label>
                                <input
                                  type="number"
                                  value={form_data[data.key].rwidth}
                                  onChange={(e) => {
                                    form_data[data.key].rwidth = e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Start Time
                                </label>
                                <input
                                  type="date"
                                  onChange={(e) => {
                                    form_data[data.key].start = e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  End Time
                                </label>
                                <input
                                  type="date"
                                  onChange={(e) => {
                                    form_data[data.key].endtime =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <input
                                  type="number"
                                  onChange={(e) => {
                                    form_data[data.key].company =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                  hidden
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
