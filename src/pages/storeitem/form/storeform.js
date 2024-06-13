import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const Store_Form = () => {
  var [polistNames, setpolist] = useState([]);
  var [itemCode, setSkCode] = useState([]);
  var [item_names, setitemNames] = useState([]);
  var [common_data, setcommon_data] = useState({
    company_id: 0,
    invoice: "",
    pod_id: 0,
  });

  var [descriptions, setDesc] = useState();
  var [form_data, setforms] = useState([
    {
      key: 0,
      code: "",
      quantity: 0,
      rate: 0,
      gst: 0,
      unit: "",
      item_name: "",
      description: "",
      skCode: "",
      skCode2: "",
    },
  ]);

  useEffect(() => {
    api({ api: "/storeitem/itemlist/" }).then((data) => {
      setSkCode(data);
      var decs = [];
      data.map((item) => {
        decs.push({
          label: item.description,
          value: item.value,
          item_name: item.item_name,
          unit: item.item_unit,
          code: item.label,
        });
      });
      setDesc(decs);
      const names = data.map((item) => item.item_name);
      data = data.filter(
        ({ item_name }, index) => !names.includes(item_name, index + 1)
      );
      setOptions(data);
    });
    api({ api: "/storeitem/polist/" }).then((data) => {
      setpolist(data);
    });
  }, []);

  function setOptions(data) {
    data.map((item) => {
      item_names.push({ label: item.item_name, value: item.value });
    });
    setitemNames([...item_names]);
  }

  function Senddata() {
    api({
      api: "/api/storelist/",
      method: "post",
      body: { common: common_data, form: form_data, post: 2 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload()
      })
      .catch(() => {
        toast("F", { autoClose: 2000 });
      });
  }

  function handle_set_Items_Data(select, key) {
    form_data[key].item_name = select.item_name;
    form_data[key].code = select.value;
    form_data[key].unit = select.item_unit;
    form_data[key].description = select.description;
    setforms([...form_data]);
  }
  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        code: "",
        skCode: "",
        skCode2: "",
        quantity: 0,
        rate: 0,
        gst: 0,
        unit: "",
        item_name: "",
        description: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
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
                Store Item
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
                  {/* <div className="col-md-2">
                    <label className="control-label text-left">
                      Company Name
                    </label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, company_id: e.value })
                      }
                      options={vedorlistNames}
                    />
                    {common_data.company_id === 0 ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div> */}
                  <div className="col-md-2">
                    <label className="control-label">PO No.</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, pod_id: e.value })
                      }
                      options={polistNames}
                    />
                    {common_data.pod_id === "" ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Invoice</label>
                    <input
                      type="text"
                      value={common_data.invoice}
                      className="form-control"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          invoice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                {/* common form */}

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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-2">
                                  <label className="control-label">
                                    SKU Code
                                  </label>

                                  {form_data[data.key].skCode !== "" ? (
                                    <>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={form_data[data.key].skCode}
                                        readOnly
                                      />
                                    </>
                                  ) : (
                                    <Select
                                      onChange={(e) =>
                                        handle_set_Items_Data(e, data.key)
                                      }
                                      options={itemCode}
                                    />
                                  )}
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Item Name
                                  </label>
                                  {form_data[data.key].code !== "" ? (
                                    <>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={form_data[data.key].item_name}
                                        readOnly
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <Select
                                        onChange={(e) => {
                                          form_data[data.key].item_name =
                                            e.label;
                                          form_data[data.key].description = "";
                                          form_data[data.key].unit = "";
                                          form_data[data.key].skCode = "";

                                          setforms([...form_data]);
                                        }}
                                        options={item_names}
                                      />
                                    </>
                                  )}
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Description
                                  </label>
                                  {form_data[data.key].code !== "" ? (
                                    <>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={form_data[data.key].description}
                                        readOnly
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <Select
                                        value={{
                                          label:
                                            form_data[data.key].description,
                                          value:
                                            form_data[data.key].description,
                                        }}
                                        onChange={(e) => {
                                          form_data[data.key].description =
                                            e.label;
                                          form_data[data.key].unit = e.unit;
                                          form_data[data.key].skCode = e.code;
                                          form_data[data.key].skCode2 = e.value;
                                          setforms([...form_data]);
                                        }}
                                        options={
                                          form_data[data.key].item_name !== ""
                                            ? descriptions.filter(
                                                (item) =>
                                                  item.item_name ===
                                                  form_data[data.key].item_name
                                              )
                                            : descriptions
                                        }
                                      />
                                    </>
                                  )}
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">Unit</label>
                                  <input
                                    type="text"
                                    placeholder="Unit"
                                    className="form-control"
                                    value={form_data[data.key].unit}
                                    required
                                    readOnly
                                  />
                                  {form_data[data.key].unit === "" ? (
                                    <>
                                      <label className="text-danger">
                                        required field
                                      </label>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="col-md-4 row">
                                  <div className="col-md-6">
                                    <label className="control-label">
                                      Quantity
                                    </label>
                                    <input
                                      type="number"
                                      step="any"
                                      id="quantity"
                                      onChange={(e) => {
                                        form_data[data.key].quantity =
                                          e.target.value;
                                      }}
                                      placeholder="Quantity"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label className="control-label">
                                      Rate
                                    </label>
                                    <input
                                      type="number"
                                      step="any"
                                      id="rate"
                                      placeholder="Rate"
                                      onChange={(e) => {
                                        form_data[data.key].rate =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  {/* <div className="col-md-4">
                                    <label className="control-label">
                                      GST%
                                    </label>
                                    <input
                                      type="number"
                                      step="any"
                                      id="gst"
                                      onChange={(e) => {
                                        form_data[data.key].gst =
                                          e.target.value;
                                      }}
                                      placeholder="GST"
                                      className="form-control"
                                      required
                                    />
                                  </div> */}
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
                          </div>
                        </form>
                      </div>
                    );
                  })}

                {/* end inner forms */}
                <br />
                <center>
                  {common_data.company_id === "" || common_data.pod_id === 0 ? (
                    <></>
                  ) : (
                    <>
                      <input
                        id="submit"
                        type="submit"
                        className="btn btn-success border-secondary"
                        onClick={Senddata}
                        value="Submit"
                      />
                    </>
                  )}
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
