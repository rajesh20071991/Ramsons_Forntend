import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Select from "react-select";
import { Progress, notification } from "antd";

export const Inprocess_Form = ({ refreshData }) => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      plan_id: 0,
      shift: "",
      crane_weight: "",
      pipe_weight: "",
      total_pipe: "",
      date: new Date().toISOString().split("T")[0],
      hole_pipe: "",
      scrap_weight: "",
      hweight: "",
      short_length: "",
      short_weight: "",
      repair_pipe: "",
      repair_weight: "",
      die_scrap: "",
      shift_pipe: "",
      shift_weight: "",
      grade: "",
      thickness: "",
      pipe_total: "",
      coil: "",
      sizes: "",
      mill: "",
      stamp: "",
      weightss: "",
    },
  ]);

  var [planninglist, setplanning] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const fetchData = () => {
    api({ api: "/storeitem/planlist/" }).then((data) => {
      setplanning(data);
      setHasFetchedData(true);
    });
  };

  useEffect(() => {
    // Check if the data has already been fetched
    if (!hasFetchedData) {
      fetchData(); // Fetch data only if it hasn't been fetched before
    }
  }, [hasFetchedData]);

  const shift = [
    { value: "Shift A", label: "Shift A" },
    { value: "Shift B", label: "Shift B" },
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  // Initialize formErrors with empty objects for each form_data item
  const resetForm = () => {
    const initialFormData = {
      coil: "", // Initialize with the default value for 'coil' field
      sizes: "", // Initialize with the default value for 'sizes' field
      mill: "", // Initialize with the default value for 'mill' field
      shift: "", // Initialize with the default value for 'total_pipe' field
      crane_weight: "", // Initialize with the default value for 'noofpipe' field
      shift_weight: "", // Initialize with the default value for 'pipe_weight' field
      shift_pipe: "", // Initialize with the default value for 'weight' field
      scrap_weight: "", // Initialize with the default value for 'pipe_weight' field
      hole_pipe: "", // Initialize with the default value for 'remarks' field
      hweight: "", // Initialize with the default value for 'welding_quality' field
      short_length: "", // Initialize with the default value for 'surface_quality' field
      short_weight: "", // Initialize with the default value for 'handling' field
      repair_pipe: "", // Initialize with the default value for 'straightness' field
      repair_weight: "", // Initialize with the default value for 'tagging' field
      die_scrap: "", // Initialize with the default value for 'tagging' field
      weightss: "",
    };

    setFormSubmitted(false); // Initialize with your initial form data here
    setFormErrors({});
    // Reset each input field individually
    for (const data of form_data) {
      data.coil = initialFormData.coil;
      data.sizes = initialFormData.sizes;
      data.mill = initialFormData.mill;
      data.shift = initialFormData.shift;
      data.crane_weight = initialFormData.crane_weight;
      data.shift_pipe = initialFormData.shift_pipe;
      data.shift_weight = initialFormData.shift_weight;
      data.scrap_weight = initialFormData.scrap_weight;
      data.hole_pipe = initialFormData.hole_pipe;
      data.hweight = initialFormData.hweight;
      data.short_length = initialFormData.short_length;
      data.short_weight = initialFormData.short_weight;
      data.repair_pipe = initialFormData.repair_pipe;
      data.repair_weight = initialFormData.repair_weight;
      data.die_scrap = initialFormData.die_scrap;
      data.weightss = initialFormData.weightss;
    }
  };

  const [formVisible, setFormVisible] = useState(true);

  function Senddata(e) {
    e.preventDefault();
    setIsSubmitting(true);

    for (const form of form_data) {
      if (
        parseFloat(form.scrap_weight) > 50 ||
        parseFloat(form.hweight) > 100 ||
        parseFloat(form.short_weight) > 50
      ) {
        notification.error({
          message: "Error",
          description:
            "Please check the weights. Scrap Weight should not be greater than 50, Hole Weight should not be greater than 100, and Short Length Weight should not be greater than 50.",
        });

        // Close the form (if you have a state variable for form visibility)
        setFormVisible(false);

        // Refresh the table
        fetchData();

        setIsSubmitting(false);
        return;
      }

      if (parseFloat(form.pipe_weight) < parseFloat(form.pipe_total)) {
        notification.error({
          message: "Error",
          description: "Pipe weight cannot be greater than total pipe",
        });

        // Close the form (if you have a state variable for form visibility)
        setFormVisible(false);

        // Refresh the table
        fetchData();

        setIsSubmitting(false);
        return;
      }
    }

    api({
      api: "/api/tubeshiftdata/",
      method: "post",
      body: { form: form_data, post: 1 },
    })
      .then((response) => {
        if (response.message) {
          notification.success({
            message: "Success",
            description: response.message.toString(),
          });

          // Close the form (if you have a state variable for form visibility)
          setFormVisible(false);

          // Refresh the table
          fetchData();
          refreshData();
          resetForm(); // Call the resetForm function
        } else {
          console.log("no");
          notification.error({
            message: "Error",
            description: "Failed",
          });
          // Set the form error state for the duplicate form
          const updatedFormErrors = { ...formErrors };
          updatedFormErrors[response.form_key] = true;
          setFormErrors(updatedFormErrors);

          // Refresh the table
          fetchData();
        }
      })
      .catch((error) => {
        console.log("yes");
        notification.error({
          message: error,
          description: "Failed",
        });
        setFormSubmitted(true);

        // Refresh the table
        fetchData();
      })
      .finally(() => {
        setIsSubmitting(false); // Submitting finished
      });
  }

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        plan_id: 0,
        shift: "",
        crane_weight: "",
        pipe_weight: "",
        total_pipe: "",
        hole_pipe: "",
        scrap_weight: "",
        shift_pipe: "",
        hweight: "",
        date: new Date().toISOString().split("T")[0],
        short_length: "",
        short_weight: "",
        repair_pipe: "",
        die_scrap: "",
        pipe_total: "",
        repair_weight: "",
        shift_weight: "",
        grade: "",
        thickness: "",
        coil: "",
        sizes: "",
        mill: "",
        stamp: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  function handleFormCloseAndRefresh() {
    setFormSubmitted(false); // Reset formSubmitted state
    // Perform table refresh or any necessary actions
  }

  return (
    <div className="Purchase_form">
      {isSubmitting ? (
        <Progress percent={70} status="exception" />
      ) : formSubmitted ? (
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
                  Planning Create
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Form submitted successfully!</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleFormCloseAndRefresh}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                  TubeMill Create
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
                          {formErrors[data.key] && (
                            <div className="alert alert-danger">
                              Duplicate data error message
                            </div>
                          )}
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
                                      onClick={() =>
                                        handleRemoveForm(data.key)
                                      }>
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
                                      Date
                                    </label>
                                    <input
                                      type="date"
                                      placeholder="Date"
                                      value={form_data[data.key].date}
                                      onChange={(e) => {
                                        form_data[data.key].date =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Plan No.
                                    </label>
                                    <Select
                                      onChange={(e) => {
                                        form_data[data.key].plan_id = e.value;
                                        form_data[data.key].coil = e.coil;
                                        form_data[data.key].grade = e.grades;
                                        form_data[data.key].thickness =
                                          e.thicknesss;
                                        form_data[data.key].sizes = e.sizes;
                                        form_data[data.key].mill = e.mill;
                                        form_data[data.key].stamp = e.stamps;
                                        form_data[data.key].weightss =
                                          e.planweight;
                                        form_data[data.key].pipe_total =
                                          e.pipes;
                                        form_data[data.key].pipe_weight =
                                          e.weig;
                                        form_data[data.key].total_pipe =
                                          e.total;
                                        form_data[data.key].shift =
                                          e.swapped_shift;
                                        form_data[data.key].shift_pipe =
                                          e.pipe_pend;
                                        form_data[data.key].shift_weight =
                                          e.weiht_pend;
                                        form_data[data.key].crane_weight =
                                          e.weights;
                                        setforms([...form_data]);
                                      }}
                                      options={planninglist}
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
                                        form_data[data.key].coil =
                                          e.target.value;
                                      }}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Stamp
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Size"
                                      className="form-control"
                                      value={form_data[data.key].stamp}
                                      onChange={(e) => {
                                        form_data[data.key].stamp =
                                          e.target.value;
                                      }}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Size
                                    </label>
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
                                </div>
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
                                  Actual Weight
                                </label>
                                <input
                                  type="number"
                                  step="0.001"
                                  placeholder="Weight"
                                  value={form_data[data.key].crane_weight}
                                  onChange={(e) => {
                                    if (
                                      form_data[data.key].weightss +
                                        30 -
                                        e.target.value >
                                      0
                                    ) {
                                      form_data[data.key].crane_weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Pipe</label>
                                <input
                                  type="number"
                                  placeholder="No of Pipe"
                                  onChange={(e) => {
                                    form_data[data.key].shift_pipe =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Weight</label>
                                <input
                                  type="number"
                                  placeholder="Weight"
                                  value={form_data[data.key].shift_weight}
                                  onChange={(e) => {
                                    form_data[data.key].shift_weight =
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
                                  step="0.001"
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
                                  step="0.001"
                                  placeholder="Hole Pipe"
                                  onChange={(e) => {
                                    form_data[data.key].hole_pipe =
                                      e.target.value;
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
                                  step="0.001"
                                  placeholder="Hole Weight"
                                  onChange={(e) => {
                                    form_data[data.key].hweight =
                                      e.target.value;
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
                                  onChange={(e) => {
                                    form_data[data.key].short_length =
                                      e.target.value;
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
                                  step="0.001"
                                  placeholder="Short Length Weight"
                                  onChange={(e) => {
                                    form_data[data.key].short_weight =
                                      e.target.value;
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Repair Tubes
                                </label>
                                <input
                                  type="number"
                                  placeholder="Repair Tubes"
                                  className="form-control"
                                  onChange={(e) => {
                                    form_data[data.key].repair_pipe =
                                      e.target.value;
                                  }}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Repair Tubes Weight
                                </label>
                                <input
                                  type="number"
                                  step="0.001"
                                  placeholder="Repair Weight"
                                  className="form-control"
                                  onChange={(e) => {
                                    form_data[data.key].repair_weight =
                                      e.target.value;
                                  }}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Die Scrap
                                </label>
                                <input
                                  type="number"
                                  step="0.001"
                                  placeholder="Die Scrap"
                                  className="form-control"
                                  onChange={(e) => {
                                    form_data[data.key].die_scrap =
                                      e.target.value;
                                  }}
                                />
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
      )}
    </div>
  );
};
