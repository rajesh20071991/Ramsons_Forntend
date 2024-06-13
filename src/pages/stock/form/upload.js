import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import { Formate_Date_Time } from "../../../components/Common/datetime";
import CSV_READER from "../../../components/Common/csv_read";

export const Upload_Stock_form = () => {
  const Stock = [
    { value: "Ramsons Stainless", label: "Ramsons Stainless" },
    { value: "Duromax", label: "Duromax" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const Status = [
    { value: "Regular", label: "Regular" },
    { value: "On Order", label: "On Order" },
  ];

  var [vedorlistNames, setVendorlist] = useState([]);
  var [thickstock, setthickstock] = useState([]);
  var [gradestock, setgradestock] = useState([]);

  useEffect(() => {
    api({ api: "/storeitem/sizestock_filter/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/thickstock_filter/" }).then((data) => {
      setthickstock(data);
    });
    api({ api: "/storeitem/gradetsock_filter/" }).then((data) => {
      setgradestock(data);
    });
  }, []);

  function Senddata() {
    api({
      api: "/api/stock/",
      method: "post",
      body: {
        form: form_data,
        post: 5,
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
    size: "",
    thickness: "",
    grade: "",
    status: "",
    length: 20,
    brand: "",
    polish: 0,
    nonpolish: 0,
  };

  var [form_data, setforms] = useState([form_fields]);

  const handleFileUpload = (e) => {
    CSV_READER(e).then((data) => {
      handleRemoveForm(0);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        var form_body = {
          size: data[i].size,
          thickness: data[i].thickness,
          grade: data[i].grade,
          status: data[i].status,
          length: data[i].length,
          polish: data[i].polish,
          brand: data[i].brand,
          nonpolish: data[i].nonpolish,
        };
        form_data.push(form_body);
        setforms([...form_data]);
      }
    });
  };

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
        id="exampleModalToggle1"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Upload
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
                {/* common form */}
                <div className="row">
                  <div className="col-md-4">
                    <label className="control-label">Upload Excel File</label>
                    <input
                      type="file"
                      className="form-control text-danger"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
                <br />
                {form_data.length > 0 &&
                  form_data.map((data, index) => {
                    return (
                      <div key={index}>
                        <form
                          key={index}
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddForm(index);
                          }}
                        >
                          <div
                            className="row"
                            style={{ "--bs-gutter-x": " 0rem" }}
                          >
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-3">
                                  <label className="control-label">Stock</label>
                                  <Select
                                    value={{
                                      label: form_data[index].brand,
                                      value: form_data[index].brand,
                                    }}
                                    onChange={(e) => {
                                      form_data[index].brand = e.label;
                                      form_data[index].coil_id = e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={Stock}
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
                                      form_data[index].coil_id = e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={vedorlistNames}
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
                                      form_data[index].thickness = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={thickstock}
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
                                      form_data[index].grade = e.label;
                                      setforms([...form_data]);
                                    }}
                                    options={gradestock}
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
                                    options={Status}
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
                                    Polish Pipe
                                  </label>
                                  <input
                                    type="number"
                                    value={form_data[index].polish}
                                    placeholder="No. of Pipe"
                                    onChange={(e) => {
                                      form_data[index].polish = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-6 row">
                                  <div className="col-md-4">
                                    <label className="control-label">
                                      Non Polish Pipe
                                    </label>
                                    <input
                                      type="number"
                                      value={form_data[index].nonpolish}
                                      onChange={(e) => {
                                        form_data[index].nonpolish =
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
                              }}
                            >
                              <div className="mt-4">
                                <div
                                  className="btn-group"
                                  role="group"
                                  aria-label="First group"
                                >
                                  <label className="btn btn-sm btn-outline-secondary">
                                    {index}
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
                                    onClick={() => handleRemoveForm(index)}
                                    disabled={form_data.length === 1}
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
