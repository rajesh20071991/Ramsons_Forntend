import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { Formate_Date_Time } from "../../../components/Common/datetime";
import { Button } from "antd";
import Select from "react-select";
import { RiAddFill } from "react-icons/ri";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

export const Create_plan_form = () => {
  const chargesSelect = [
    { value: "Reslit", label: "Reslit" },
    { value: "Packing Charges", label: "Packing Charges" },
    { value: "Baby Coil", label: "Baby Coil" },
    { value: "less than 3500kg", label: "less than 3500kg" },
    { value: "More than 15 Coils", label: "More than 15 Coils" },
  ];

  var [vedorlistNames, setVendorlist] = useState([]);

  useEffect(() => {
    api({ api: "/storeitem/coilfilter/" }).then((data) => {
      setVendorlist(data);
    });
  }, []);

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/planning/",
      method: "post",
      body: {
        form: form_data,
        status: "Coil",
        post: 2,
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
    charges: "",
    widths: "",
    comment: "",
    status: "Part-1",
    remarks: "",
    shift: "",
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
                Planning Pipe
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
                {form_data.length > 0 &&
                  form_data.map((data, index) => {
                    return (
                      <div key={index}>
                        <form
                          key={index}
                          onSubmit={(e) => {
                            e.preventDefault();
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
                                    className="col-md-14"
                                    onChange={(e) => {
                                      form_data[index].coil_no = e.label;
                                      form_data[index].coil_id = e.value;
                                      form_data[index].status_id = e.data;
                                      setforms([...form_data]);
                                    }}
                                    options={vedorlistNames.filter(
                                      (names) => names.Status === "Coil"
                                    )}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Charges
                                  </label>
                                  <Select
                                    isMulti
                                    onChange={(selectedOptions) => {
                                      const selectedValues =
                                        selectedOptions.map(
                                          (option) => option.value
                                        );
                                      form_data[index].charges =
                                        selectedValues.join(",");
                                      setforms([...form_data]);
                                    }}
                                    options={chargesSelect}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Widths
                                  </label>
                                  <input
                                    id="widths"
                                    placeholder="157,157,157"
                                    onChange={(e) => {
                                      form_data[index].widths = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    value={form_data[index].widths}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Comment(Slitting)
                                  </label>
                                  <input
                                    id="comment"
                                    placeholder="Remarks"
                                    onChange={(e) => {
                                      form_data[index].comment = e.target.value;
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Status
                                  </label>
                                  <input
                                    id="status"
                                    value={data.status}
                                    placeholder="Status"
                                    onChange={(e) => {
                                      form_data[index].status = e.target.value;
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
                                    id="remarks"
                                    placeholder="Remarks"
                                    onChange={(e) => {
                                      form_data[index].remarks = e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    className="form-control"
                                    required
                                  />
                                </div>

                                <div
                                  className="col-md-1"
                                  style={{
                                    marginTop: "35px",
                                    alignItems: "center",
                                  }}>
                                  <button
                                    className="btn btn-link"
                                    onClick={handleAddForm}
                                    style={{ marginRight: "10px" }}>
                                    <RiAddFill size={30} />
                                  </button>
                                </div>
                                <div
                                  className="col-md-1"
                                  style={{
                                    marginTop: "35px",
                                    alignItems: "center",
                                  }}>
                                  {form_data.length > 1 && (
                                    <button
                                      className="btn btn-link"
                                      onClick={() => handleRemoveForm(index)}>
                                      <DeleteOutlineIcon fontSize="medium" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="modal-footer">
              <Button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={Senddata}>
                Submit
              </Button>
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
