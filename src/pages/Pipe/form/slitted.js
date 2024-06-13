import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const Slitt_Coil_Form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      plan_id: 0,
      plan_no: "",
      weight: "",
      coil_id: "",
      coil_no: "",
      width: "",
      status: "",
    },
  ]);

  var [planninglist, setplanning] = useState([]);

  useEffect(() => {
    api({ api: "/storeitem/planstatus/" }).then((data) => {
      setplanning(data);
    });
  }, []);

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/tubeshiftdata/",
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
        plan_no: "",
        weight: "",
        coil_id: "",
        coil_no: "",
        width: "",
        status: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  return (
    <div className="Purchase_form">
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
                Coil Create
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Plan No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].plan_id = e.value;
                                      form_data[data.key].plan_no = e.label;
                                      form_data[data.key].coil_no = e.coil;
                                      form_data[data.key].coil_id = e.coilid;
                                      form_data[data.key].weight = e.weiht_pend;
                                      form_data[data.key].status = e.entity;
                                      setforms([...form_data]);
                                    }}
                                    options={planninglist}
                                    required
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    value={{
                                      label: form_data[data.key].coil_no,
                                      value: form_data[data.key].coil_id,
                                    }}
                                    onChange={(e) => {
                                      form_data[data.key].coil_id = e.coilid;
                                      form_data[data.key].coil_no = e.coil;
                                      setforms([...form_data]);
                                    }}
                                    // options={coilstatus}
                                    isDisabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Width</label>
                                  <input
                                    type="number"
                                    step="0.001"
                                    placeholder="Width"
                                    value={form_data[data.key].width}
                                    onChange={(e) => {
                                      form_data[data.key].width =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Weight
                                  </label>
                                  <input
                                    type="number"
                                    step="0.001"
                                    placeholder="Weight"
                                    value={form_data[data.key].weight}
                                    onChange={(e) => {
                                      form_data[data.key].weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                  />
                                </div>
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
