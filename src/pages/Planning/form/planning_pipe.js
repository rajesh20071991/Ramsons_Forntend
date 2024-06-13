import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import { Formate_Date_Time } from "../../../components/Common/datetime";
import CSV_READER from "../../../components/Common/csv_read";

export const PlanningPipe_Form = () => {
  const Brand = [
    { value: "Ramsons Stainless", label: "Ramsons Stainless" },
    { value: "Duromax", label: "Duromax" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const Shift = [
    { value: "Day", label: "Day" },
    { value: "Night", label: "Night" },
  ];

  var [vedorlistNames, setVendorlist] = useState([]);
  const [SizeOptions, setSizeOptions] = useState("");
  const [milloptions, setMillOptions] = useState("");

  const [modalData, setModalData] = React.useState({
    id: 0,
    type: "",
  });

  useEffect(() => {
    api({ api: "/storeitem/coilfilter/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/sizelist/" }).then((data) => {
      setSizeOptions(data);
    });
    api({ api: "/storeitem/milllist/" }).then((data) => {
      setMillOptions(data);
    });
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  function Senddata(e) {
    e.preventDefault();
    setIsLoading(true);
    api({
      api: "/api/planning/",
      method: "post",
      body: {
        form: form_data,
        post: 6,
        modal: modalData,
      },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false when the request is complete
      });
  }

  const form_fields = {
    charges: "",
    widths: "",
    comment: "",
    status: "Part-1",
    remarks: "",
    shift: "",
    stamp: "",
    length: 0,
    nopipe: 0,
    size: "",
    mill: "",
    brand: "",
    actualweight: 0,
    weight: 0,
    coil_no: "",
    step: "Step-2",
    coil_id: 0,
    actual_time: Formate_Date_Time,
    status_id: "",
  };

  var [form_data, setforms] = useState([form_fields]);

  const handleFileUpload = (e) => {
    CSV_READER(e).then((data) => {
      handleRemoveForm(0);
      for (var i = 0; i < data.length; i++) {
        var coilp = vedorlistNames.filter(
          (names) => names.label === data[i].coil_no
        );
        console.log(data[i]);
        var form_body = {
          size: data[i].size,
          coil_no: coilp[0].label,
          coil_id: coilp[0].value,
          status_id: coilp[0].data,
          shift: data[i].shift,
          mill: data[i].mill,
          brand: data[i].brand,
          length: data[i].length,
          remarks: data[i].remarks,
          nopipe: data[i].nopipe,
          actualweight: coilp[0].actualweight,
        };
        form_data.push(form_body);
        setforms([...form_data]);
      }
    });
  };

  console.log(form_data);

  function handleAddForm() {
    setforms([
      ...form_data,
      {
        ...form_fields,
        status: "Part-" + String(form_data.length + 1),
        step: "Step-2",
        actual_time: Formate_Date_Time,
      },
    ]);
  }

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
                Planning Create
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
                    <label className="control-label text-left">
                      Planning Type
                    </label>
                    <Select
                      options={[
                        { label: "Pipe", value: "Pipe" },
                        { label: "Polish", value: "Polish" },
                      ]}
                      onChange={(e) =>
                        setModalData({ ...modalData, type: e.value })
                      }
                    />
                  </div>
                  <div className="col-md-10">
                    <label className="control-label">Upload Excel File</label>
                    <input
                      type="file"
                      className="form-control text-danger w-25"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
                <br />
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
                                <div className="col-md-3">
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    value={{
                                      label: form_data[index].coil_no,
                                      value: form_data[index].coil_id,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].coil_no = e.label;
                                      form_data[index].coil_id = e.value;
                                      form_data[index].status_id = e.data;
                                      form_data[index].actualweight =
                                        e.actualweight;
                                      form_data[index].length = e.length;
                                      setforms([...form_data]);
                                    }}
                                    options={vedorlistNames.filter(
                                      (names) => names.Status === "Coil"
                                    )}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Shift</label>
                                  <Select
                                    value={{
                                      label: form_data[index].shift,
                                      value: form_data[index].shift,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].shift = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={Shift}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Mill No.
                                  </label>
                                  <Select
                                    value={{
                                      label: form_data[index].mill,
                                      value: form_data[index].mill,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].mill = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={milloptions}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Size</label>
                                  <Select
                                    value={{
                                      label: form_data[index].size,
                                      value: form_data[index].size,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].size = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={SizeOptions}
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
                                    options={Brand}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Length
                                  </label>
                                  <input
                                    id="length"
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
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Remarks
                                  </label>
                                  <input
                                    id="length"
                                    value={form_data[index].remarks}
                                    placeholder="Remarks"
                                    onChange={(e) => {
                                      form_data[index].remarks = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-6 row">
                                  <div className="col-md-4">
                                    <label className="control-label">
                                      No. of Pipe
                                    </label>
                                    <input
                                      type="number"
                                      step="any"
                                      id="nopipe"
                                      value={form_data[index].nopipe}
                                      placeholder="No. of Pipe"
                                      onChange={(e) => {
                                        form_data[index].nopipe =
                                          e.target.value;
                                        setforms([...form_data]);
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="control-label">
                                      Weight
                                    </label>
                                    <input
                                      type="number"
                                      step="any"
                                      id="weight"
                                      value={form_data[index].actualweight}
                                      placeholder="Weight"
                                      onChange={(e) => {
                                        form_data[index].actualweight =
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
                                    onClick={() => handleRemoveForm(index)}
                                    disabled={form_data.length === 1}>
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
                {modalData.type === "Polish" &&
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
                                  <label className="control-label">
                                    Coil No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[index].coil_no = e.label;
                                      form_data[index].coil_id = e.value;
                                      form_data[index].status_id = e.data;
                                      setforms([...form_data]);
                                    }}
                                    value={{
                                      value: form_data[index].coil_id,
                                      label: form_data[index].coil_no,
                                    }}
                                    options={vedorlistNames.filter(
                                      (names) => names.Status === "Polish"
                                    )}
                                    required
                                  />
                                </div>
                                <div className="col-md-6 row">
                                  <div className="col-md-4">
                                    <label className="control-label">
                                      No. of Pipe
                                    </label>
                                    <input
                                      type="number"
                                      step="any"
                                      id="nopipe"
                                      placeholder="No. of Pipe"
                                      onChange={(e) => {
                                        form_data[index].nopipe =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="control-label">
                                      Weight
                                    </label>
                                    <input
                                      type="number"
                                      step="any"
                                      id="weight"
                                      placeholder="Weight"
                                      onChange={(e) => {
                                        form_data[index].weight =
                                          e.target.value;
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
                                    onClick={() => handleRemoveForm(index)}
                                    disabled={form_data.length === 1}>
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
                  disabled={isLoading} // Disable the button while loading
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
