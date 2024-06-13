import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import { Progress } from "antd";

export const InwardCoil_Form = () => {
  const entity_brand1 = [
    { value: "JSL", label: "JSL" },
    { value: "Chromnie", label: "Chromnie" },
    { value: "Other", label: "Other" },
  ];

  const job_type1 = [
    { value: "Job Work", label: "Job Work" },
    { value: "Production", label: "Production" },
  ];

  const pipe_type1 = [
    { value: "Polish", label: "Polish" },
    { value: "Non Polish", label: "Non Polish" },
  ];

  const shape1 = [
    { value: "Circle", label: "Circle" },
    { value: "Retangle", label: "Retangle" },
  ];
  const options_value = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  var [form_data, setforms] = useState([
    {
      key: 0,
      origin_coil_no: "",
      challan_no: "",
      entity_type: "",
      company_id: 0,
      entity_brand: "",
      job_type: "",
      chalan_weight: 0,
      chalan_width: 0,
      grade: "",
      thickness: "",
      no_of_pipe: "",
      shape: "",
      pilot: "",
      protection: "",
      status: "Instock",
      inward: true,
      pipe_type: "",
      data: "mother",
      length: 0,
      size: "",
    },
  ]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(form_data);
  function Senddata(e) {
    e.preventDefault();
    setIsSubmitting(true);
    api({
      api: "/api/store_coil/",
      method: "post",
      body: { post: 1, form: form_data, type: type },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        setFormSubmitted(true);
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      })
      .finally(() => {
        setIsSubmitting(false); // Submitting finished
      });
  }

  const [companydata, setcompany] = useState("");
  const [GradeOptions, setGradeOptions] = useState("");
  const [SizeOptions, setSizeOptions] = useState("");
  const [Thicknessoptions, setThicknessOptions] = useState("");
  const [PipeThickness, setpipethickness] = useState("");
  const [gradepipe, setgradepipe] = useState("");

  const [type, setType] = useState("Coil");

  useEffect(() => {
    api({ api: "/storeitem/companyfilter/" }).then((data) => {
      setcompany(data);
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

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        origin_coil_no: "",
        challan_no: "",
        entity_type: "",
        company_id: 0,
        challan_id: 0,
        entity_brand: "",
        job_type: "",
        chalan_weight: 0,
        chalan_width: 0,
        grade: "",
        thickness: "",
        no_of_pipe: "",
        shape: "",
        pilot: "",
        protection: "",
        inward: true,
        pipe_type: "",
        data: "mother",
        length: 0,
        size: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  return (
    <div className="company_details">
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
                Inward Form
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
                <div className="form-group col-md-2 mb-2">
                  <label className="control-label">Entity Type</label>
                  <select
                    className="form-control"
                    onChange={(e) => setType(e.target.value)}
                    required>
                    {/* <option value="Challan">Challan</option> */}
                    <option value="Coil">Coil</option>
                    <option value="Sheet">Sheet</option>
                    <option value="Pipe">Pipe</option>
                    <option value="Slitted Coil">Slitted Coil</option>
                  </select>
                </div>
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
                          <div className="row">
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
                            {type === "Coil" && (
                              <div className="col-md-11 row">
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Company Name
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].company_id = e.value;
                                    }}
                                    options={companydata}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Origin Coil No.
                                  </label>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      form_data[data.key].origin_coil_no =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Challan No.
                                  </label>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      form_data[data.key].challan_no =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Entity Brand
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].entity_brand =
                                        e.value;
                                    }}
                                    options={entity_brand1}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Job Type
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].job_type = e.value;
                                    }}
                                    options={job_type1}
                                  />
                                </div>
                                {form_data[data.key].job_type ===
                                  "Job Work" && (
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Rate
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      onChange={(e) => {
                                        form_data[data.key].rate =
                                          e.target.value;
                                      }}
                                    />
                                  </div>
                                )}
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Chalan Weight
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].chalan_weight =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Chalan Width
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].chalan_width =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].grade = e.value;
                                    }}
                                    options={GradeOptions}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Thickness
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].thickness = e.value;
                                    }}
                                    options={Thicknessoptions}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Pallet
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].pilot = e.value;
                                    }}
                                    options={options_value}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Id Protector
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].protection = e.value;
                                    }}
                                    options={options_value}
                                  />
                                </div>
                              </div>
                            )}
                            {type === "Sheet" && (
                              <div className="col-md-11 row">
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Company Name
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].company_id = e.value;
                                    }}
                                    options={companydata}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Origin Coil No.
                                  </label>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      form_data[data.key].origin_coil_no =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Challan No.
                                  </label>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      form_data[data.key].challan_no =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Entity Brand
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].entity_brand =
                                        e.value;
                                    }}
                                    options={entity_brand1}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      form_data[data.key].size = e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Job Type
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].job_type = e.value;
                                    }}
                                    options={job_type1}
                                  />
                                </div>
                                {form_data[data.key].job_type ===
                                  "Job Work" && (
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Rate
                                    </label>
                                    <input
                                      type="number"
                                      onChange={(e) => {
                                        form_data[data.key].rate = e.value;
                                      }}
                                    />
                                  </div>
                                )}
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Chalan Weight
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].chalan_weight =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Chalan Width
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].chalan_width =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].grade = e.value;
                                    }}
                                    options={GradeOptions}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Thickness
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].thickness = e.value;
                                    }}
                                    options={Thicknessoptions}
                                  />
                                </div>
                              </div>
                            )}
                            {type === "Slitted Coil" && (
                              <div className="col-md-11 row">
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Company Name
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].company_id = e.value;
                                    }}
                                    options={companydata}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Origin Coil No.
                                  </label>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      form_data[data.key].origin_coil_no =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Challan No.
                                  </label>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      form_data[data.key].challan_no =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Entity Brand
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].entity_brand =
                                        e.value;
                                    }}
                                    options={entity_brand1}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Job Type
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].job_type = e.value;
                                    }}
                                    options={job_type1}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Chalan Weight
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].chalan_weight =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Chalan Width
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].chalan_width =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].grade = e.value;
                                    }}
                                    options={GradeOptions}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Thickness
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].thickness = e.value;
                                    }}
                                    options={Thicknessoptions}
                                  />
                                </div>
                              </div>
                            )}
                            {type === "Pipe" && (
                              <div className="col-md-11 row">
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Company Name
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].company_id = e.value;
                                    }}
                                    options={companydata}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Origin Coil No.
                                  </label>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      form_data[data.key].origin_coil_no =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Challan No.
                                  </label>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      form_data[data.key].challan_no =
                                        e.target.value;
                                    }}
                                    placeholder="Challan No"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Entity Brand
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].entity_brand =
                                        e.value;
                                    }}
                                    options={entity_brand1}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Job Type
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].job_type = e.value;
                                    }}
                                    options={job_type1}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Chalan Weight
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].chalan_weight =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Chalan Width
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].chalan_width =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Grade</label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].grade = e.value;
                                    }}
                                    options={gradepipe}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Thickness
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].thickness = e.value;
                                    }}
                                    options={PipeThickness}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Length
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].length =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].size = e.value;
                                    }}
                                    options={SizeOptions}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Pipe Type
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].pipe_type = e.value;
                                    }}
                                    options={pipe_type1}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    No Of Pipe
                                  </label>
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      form_data[data.key].no_of_pipe =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Shape</label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].shape = e.value;
                                    }}
                                    options={shape1}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </form>
                      </div>
                    );
                  })}

                {/* end inner forms */}
                <br />
                <center>
                  <>
                    <input
                      id="submit"
                      type="submit"
                      className="btn btn-success border-secondary"
                      onClick={Senddata}
                      disabled={isSubmitting}
                      value="Submit"
                    />
                  </>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
