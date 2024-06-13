import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Select from "react-select";
import { Progress, notification } from "antd";

export const Tubemove_Form = ({ refreshData }) => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      tube_id: 0,
      noofpipe: "",
      welding_quality: "",
      surface_quality: "",
      handling: "",
      straightness: "",
      tagging: "",
      weight: "",
      remarks: "",
      status: "",
      stamp: "",
      grade: "",
      coil: "",
      mill: "",
      sizes: "",
    },
  ]);

  var [vedorlistNames, setVendorlist] = useState([]);

  const fetchData = () => {
    api({ api: "/storeitem/tubemolist/" }).then((data) => {
      setVendorlist(data);
    });
  };

  useEffect(() => {
    fetchData(); // Fetch initial data when the component mounts
  }, []);

  const status1 = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const status2 = [
    { value: "Ok", label: "Ok" },
    { value: "Not Ok", label: "Not Ok" },
  ];

  const resetForm = () => {
    const initialFormData = {
      tube_id: "",
      coil: "", // Initialize with the default value for 'coil' field
      grade: "", // Initialize with the default value for 'grade' field
      sizes: "", // Initialize with the default value for 'sizes' field
      mill: "", // Initialize with the default value for 'mill' field
      total_pipe: "", // Initialize with the default value for 'total_pipe' field
      pipe_weight: "", // Initialize with the default value for 'pipe_weight' field
      noofpipe: "", // Initialize with the default value for 'noofpipe' field
      weight: "", // Initialize with the default value for 'weight' field
      remarks: "", // Initialize with the default value for 'remarks' field
      welding_quality: "", // Initialize with the default value for 'welding_quality' field
      surface_quality: "", // Initialize with the default value for 'surface_quality' field
      handling: "", // Initialize with the default value for 'handling' field
      straightness: "", // Initialize with the default value for 'straightness' field
      tagging: "", // Initialize with the default value for 'tagging' field
    }; // Initialize with your initial form data here
    setFormSubmitted(false); // Reset form submission status
    setFormErrors({});
    // Reset each input field individually
    for (const data of form_data) {
      data.tube_id = initialFormData.tube_id;
      data.coil = initialFormData.coil;
      data.grade = initialFormData.grade;
      data.sizes = initialFormData.sizes;
      data.mill = initialFormData.mill;
      data.total_pipe = initialFormData.total_pipe;
      data.pipe_weight = initialFormData.pipe_weight;
      data.noofpipe = initialFormData.noofpipe;
      data.weight = initialFormData.weight;
      data.remarks = initialFormData.remarks;
      data.welding_quality = initialFormData.welding_quality;
      data.surface_quality = initialFormData.surface_quality;
      data.handling = initialFormData.handling;
      data.straightness = initialFormData.straightness;
      data.tagging = initialFormData.tagging;
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  function Senddata(e) {
    e.preventDefault();
    setIsSubmitting(true);
    api({
      api: "/api/tubeshiftdata/",
      method: "post",
      body: { form: form_data, post: 4 },
    })
      .then((response) => {
        if (response.message) {
          notification.success({
            message: "Success",
            description: response.message.toString(),
          });
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
        }
      })
      .catch((error) => {
        console.error("Error", error);
        notification.error({
          message: error,
          description: "Failed",
        });
        setFormSubmitted(true);
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
        tube_id: 0,
        noofpipe: "",
        welding_quality: "",
        surface_quality: "",
        handling: "",
        straightness: "",
        tagging: "",
        weight: "",
        remarks: "",
        status: "",
        stamp: "",
        grade: "",
        coil: "",
        mill: "",
        sizes: "",
      };
      setforms([...form_data, form_body]);
    }
  }
  console.log("form_data:", form_data);

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
                  TubeMill Movement
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
                  TubeMill Movement
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
                  <br />
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
                                  <div className="col-md-4">
                                    <label className="control-label">
                                      Coil No.
                                    </label>
                                    <Select
                                      onChange={(e) => {
                                        form_data[data.key].tube_id = e.value;
                                        form_data[data.key].sizes = e.size;
                                        form_data[data.key].grade = e.grade;
                                        form_data[data.key].stamp = e.stamp;
                                        form_data[data.key].mill = e.thickness;
                                        form_data[data.key].coil = e.coilId;
                                        form_data[data.key].status = e.status;
                                        form_data[data.key].total_pipe =
                                          e.pipes;
                                        form_data[data.key].pipe_weight =
                                          e.pipe_weights;
                                        setforms([...form_data]);
                                      }}
                                      options={vedorlistNames}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Grade
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Coil No."
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
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Mill No.:-
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Mill No."
                                      className="form-control"
                                      value={form_data[data.key].mill}
                                      onChange={(e) => {
                                        form_data[data.key].mill =
                                          e.target.value;
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
                                    type="number"
                                    placeholder="Pipe Weight"
                                    className="form-control"
                                    value={form_data[data.key].pipe_weight}
                                    onChange={(e) => {
                                      form_data[data.key].pipe_weight =
                                        e.target.value;
                                    }}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Pipe</label>
                                  <input
                                    type="number"
                                    placeholder="No Of Pipe"
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
                                    onChange={(e) => {
                                      form_data[data.key].weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Remarks
                                  </label>
                                  <input
                                    type="text"
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
                                    onChange={(e) => {
                                      form_data[data.key].straightness =
                                        e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={status2}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Tagging
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].tagging = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={status1}
                                    required
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
      )}
    </div>
  );
};
