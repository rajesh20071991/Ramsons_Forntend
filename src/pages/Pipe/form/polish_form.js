import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Select from "react-select";
import { Progress, notification } from "antd";

export const Polish_Form = ({ refreshData }) => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      no_pipe: "",
      batch_weight: "",
      loose: "",
      no_rework_pipe: "",
      date: new Date().toISOString().split("T")[0],
      bundle: "",
      slpipe: "",
      slweight: "",
      grade: "",
      thickness: "",
      coilId: "",
      stamps: "",
      sizes: "",
      status: "",
      mill: "",
      hole_pipe: "",
      hole_weight: "",
    },
  ]);

  const [modalData, setModalData] = React.useState({
    id: 0,
    type: "",
  });

  var [vedorlistNames, setVendorlist] = useState([]);
  var [nonpolish, setNonPolish] = useState([]);

  const fetchData = () => {
    api({ api: "/storeitem/polishlist/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/nonpolishlist/" }).then((data) => {
      setNonPolish(data);
    });
  };

  useEffect(() => {
    fetchData(); // Fetch initial data when the component mounts
  }, []);

  const resetForm = () => {
    const initialFormData = {
      no_pipe: "",
      batch_weight: "",
      loose: "",
      no_rework_pipe: "",
      bundle: "",
      slpipe: "",
      slweight: "",
      grade: "",
      thickness: "",
      coilId: "",
      stamps: "",
      sizes: "",
      status: "",
      mill: "",
      hole_pipe: "",
      hole_weight: "",
    }; // Initialize with your initial form data here
    setFormSubmitted(false); // Reset form submission status
    setFormErrors({});
    // Reset each input field individually
    for (const data of form_data) {
      data.no_pipe = initialFormData.no_pipe;
      data.batch_weight = initialFormData.batch_weight;
      data.no_rework_pipe = initialFormData.no_rework_pipe;
      data.bundle = initialFormData.bundle;
      data.slpipe = initialFormData.slpipe;
      data.slweight = initialFormData.slweight;
      data.stamps = initialFormData.stamps;
      data.thickness = initialFormData.thickness;
      data.coilId = initialFormData.coilId;
      data.grade = initialFormData.grade;
      data.sizes = initialFormData.sizes;
      data.handling = initialFormData.handling;
      data.status = initialFormData.status;
      data.hole_pipe = initialFormData.hole_pipe;
      data.hole_weight = initialFormData.hole_weight;
      data.mill = initialFormData.mill;
    }
  };

  const status = [
    { value: "Polish", label: "Polish" },
    { value: "Non Polish", label: "Non Polish" },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  function Senddata(e) {
    e.preventDefault();
    setIsSubmitting(true);
    api({
      api: "/api/tubeshiftdata/",
      method: "post",
      body: { form: form_data, type: modalData, post: 6 },
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
        no_pipe: "",
        batch_weight: "",
        loose: "",
        no_rework_pipe: "",
        rejected_weight: "",
        bundle: "",
        slpipe: "",
        slweight: "",
        grade: "",
        thickness: "",
        date: new Date().toISOString().split("T")[0],
        coilId: "",
        stamps: "",
        sizes: "",
        status: "",
        hole_pipe: "",
        hole_weight: "",
        mill: "",
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
                  Polish Form
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
                  Polish Form
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
                  <div className="row">
                    <div className="col-md-2">
                      <label className="control-label text-left">Type</label>
                      <Select
                        onChange={(e) =>
                          setModalData({ ...modalData, type: e.value })
                        }
                        options={status}
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
                  {modalData.type === "Non Polish" &&
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
                                        form_data[data.key].sizes = e.sizes;
                                        form_data[data.key].grade = e.grade;
                                        form_data[data.key].thickness =
                                          e.thickness;
                                        form_data[data.key].coilId = e.coilId;
                                        form_data[data.key].stamps = e.stamps;
                                        form_data[data.key].weights = e.weights;
                                        form_data[data.key].pipes = e.pipes;
                                        form_data[data.key].status = e.status;
                                        setforms([...form_data]);
                                      }}
                                      options={nonpolish}
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
                                      Weight
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Plan No."
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
                                  <label className="control-label">Pipe</label>
                                  <input
                                    type="number"
                                    placeholder="No Of Pipe"
                                    onChange={(e) => {
                                      form_data[data.key].no_pipe =
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
                                    value={form_data[data.key].batch_weight}
                                    onChange={(e) => {
                                      form_data[data.key].batch_weight =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    placeholder="Weight"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Remarks
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Remarks"
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
                  {modalData.type === "Polish" &&
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
                                  <div className="col-md-4">
                                    <label className="control-label">
                                      Coil No.
                                    </label>
                                    <Select
                                      onChange={(e) => {
                                        form_data[data.key].tube_id = e.value;
                                        form_data[data.key].sizes = e.sizes;
                                        form_data[data.key].grade = e.grade;
                                        form_data[data.key].thickness =
                                          e.thickness;
                                        form_data[data.key].coilId = e.coilId;
                                        form_data[data.key].stamps = e.stamps;
                                        form_data[data.key].weights = e.weights;
                                        form_data[data.key].pipes = e.pipes;
                                        form_data[data.key].status = e.status;
                                        setforms([...form_data]);
                                      }}
                                      options={vedorlistNames}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-1">
                                    <label className="control-label">
                                      Grade
                                    </label>
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
                                  <div className="col-md-1">
                                    <label className="control-label">
                                      Pipe
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="Pipe"
                                      className="form-control"
                                      value={form_data[data.key].pipes}
                                      onChange={(e) => {
                                        form_data[data.key].pipes =
                                          e.target.value;
                                      }}
                                      disabled
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
                                      value={form_data[data.key].weights}
                                      onChange={(e) => {
                                        form_data[data.key].weights =
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
                                    Bundle
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Bundle"
                                    onChange={(e) => {
                                      form_data[data.key].bundle =
                                        e.target.value;
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
                                    onChange={(e) => {
                                      form_data[data.key].loose =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Pipe</label>
                                  <input
                                    type="number"
                                    placeholder="No Of Pipe"
                                    value={form_data[data.key].no_pipe}
                                    onChange={(e) => {
                                      if (
                                        form_data[data.key].pipes +
                                          5 -
                                          e.target.value >=
                                        0
                                      ) {
                                        form_data[data.key].no_pipe =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Batch Weight
                                  </label>
                                  <input
                                    type="number"
                                    step="any"
                                    placeholder="Batch Weight"
                                    value={form_data[data.key].batch_weight}
                                    onChange={(e) => {
                                      if (
                                        form_data[data.key].weights +
                                          20 -
                                          e.target.value >=
                                        0
                                      ) {
                                        form_data[data.key].batch_weight =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }
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
                                    step="0.001"
                                    placeholder="Scrap Weight"
                                    onChange={(e) => {
                                      form_data[data.key].scrap =
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
                                    placeholder="No of S/L Pipe"
                                    onChange={(e) => {
                                      form_data[data.key].slpipe =
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
                                    placeholder=" S/L Weight"
                                    onChange={(e) => {
                                      form_data[data.key].slweight =
                                        e.target.value;
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
                                      form_data[data.key].hole_weight =
                                        e.target.value;
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Mill No.
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Mill No."
                                    onChange={(e) => {
                                      form_data[data.key].mill = e.target.value;
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
      )}
    </div>
  );
};
