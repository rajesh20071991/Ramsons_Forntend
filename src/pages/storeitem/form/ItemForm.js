import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Month_Date, Year_Date } from "../../../components/Common/datetime";
import { message } from "antd";

export const Item_form = () => {
  const [statevalue, setValue] = useState("");
  const [descValue, setDesc] = useState("");
  const [ItemValue, setItem] = useState("");
  const [inputs, setInputs] = useState([
    { items: null, desc: null, unit: null },
  ]);

  const handleCreateItem = (inputValue, index) => {
    const newInputs = [...inputs];
    newInputs[index].items = { value: inputValue, label: inputValue };
    setInputs(newInputs);
  };

  const handleCreateDesc = (inputValue, index) => {
    const newInputs = [...inputs];
    newInputs[index].desc = { value: inputValue, label: inputValue };
    setInputs(newInputs);
  };

  const handleItemChange = (selectedOption, index) => {
    console.log("444", selectedOption);
    const newInputs = [...inputs];
    newInputs[index].items = selectedOption;
    // Filter description options based on selected item
    newInputs[index].descOptions = descValue.filter(
      (desc) => desc.key === selectedOption.value
    );
    console.log(
      "newInputs",
      descValue.filter((desc) => desc.key === selectedOption.value)
    );
    setInputs(newInputs);
  };

  const handleDescChange = (selectedOption, index) => {
    const newInputs = [...inputs];
    newInputs[index].desc = selectedOption;
    setInputs(newInputs);
  };

  const handleUnitChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index].unit = e.value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { items: null, desc: null, unit: null }]);
  };

  console.log(descValue);

  useEffect(() => {
    api({ api: "/storeitem/unitlist/" }).then((data) => {
      setValue(data);
    });
    api({ api: "/storeitem/itemobj_filter/" }).then((data) => {
      var decs = [];
      data.map((item) => {
        decs.push({
          label: item.Desc,
          value: item.Desc,
          key: item.value,
        });
      });
      setDesc(decs);
      const uniqueValues = [...new Set(data.map((item) => item.label))];
      const ItemValue = uniqueValues.map((value) => ({ value, label: value }));
      setItem(ItemValue);
    });
  }, []);

  function Senddata(e) {
    e.preventDefault();
    const submitButton = document.querySelector("#submitButton");
    submitButton.disabled = true;
    const items = inputs.map((input) => {
      return {
        item: input.items ? input.items.value : null,
        desc: input.desc ? input.desc.value : null,
        unit: input.unit,
      };
    });
    api({
      api: "/api/itemlist/",
      method: "post",
      body: { post: 1, form: items },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      })
      .finally(() => {
        // Enable the submit button
        submitButton.disabled = false;
      });
  }

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  return (
    <div className="Item-form">
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Item Add
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
              {inputs.map((input, index) => (
                <div key={index}>
                  <form
                    id="form"
                    key={index}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddInput(input);
                    }}>
                    <div className="row" style={{ "--bs-gutter-x": " 0rem" }}>
                      <div className="col-md-10">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="control-label">Item Name</label>
                            <CreatableSelect
                              id={`item-${index}`}
                              options={ItemValue}
                              value={input.items}
                              onChange={(selectedOption) =>
                                handleItemChange(selectedOption, index)
                              }
                              onCreateOption={(inputValue) =>
                                handleCreateItem(inputValue, index)
                              }
                              isClearable
                              isSearchable
                              placeholder="Select or type an item"
                            />
                          </div>
                          <div className="col-md-5">
                            <label className="control-label">Description</label>
                            <CreatableSelect
                              id={`desc-${index}`}
                              options={input.descOptions || []}
                              value={input.desc}
                              onChange={(selectedOption) =>
                                handleDescChange(selectedOption, index)
                              }
                              onCreateOption={(inputValue) =>
                                handleCreateDesc(inputValue, index)
                              }
                              isClearable
                              isSearchable
                              placeholder="Select or type a description"
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="control-label">Unit</label>
                            <Select
                              onChange={(e) => {
                                handleUnitChange(e, index);
                              }}
                              options={statevalue}
                            />
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
                              onClick={() => handleRemoveInput(index)}>
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
              ))}
              <br />
              <input
                id="submitButton"
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
  );
};

export const Unit_form = () => {
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState(null);

  const statusOptions = [
    { value: "rack", label: "Rack" },
    { value: "unit", label: "Unit" },
  ];

  function Senddata(e) {
    e.preventDefault();
    setDisable(true);
    var Body = {
      unit: e.target.unit.value,
      status: status ? status.value : null,
    };

    if (status && status.value === "unit") {
      api({
        api: "/api/budget/",
        method: "post",
        body: { form: Body, post: 3 },
      })
        .then(() => {
          toast("Success", { autoClose: 2000 });
          setDisable(false);
          window.location.reload();
        })
        .catch(() => {
          toast("failed", { autoClose: 2000 });
          setDisable(false);
        });
    } else {
      api({
        api: "/api/account/",
        method: "post",
        body: { form: Body, post: 1 }, // Use form: Body if it needs to include the same structure
      })
        .then(() => {
          toast("Success", { autoClose: 2000 });
          setDisable(false);
          window.location.reload();
        })
        .catch(() => {
          toast("failed", { autoClose: 2000 });
          setDisable(false);
        });
    }
  }

  return (
    <div className="Item-form">
      <div
        className="modal fade"
        id="exampleModalToggle5"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Item Add
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form className="row g-3" name="unitform" onSubmit={Senddata}>
                <div className="col-md-4">
                  <label className="control-label">Name</label>
                  <input
                    rows="5"
                    id="unit"
                    placeholder="Name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="control-label">Status</label>
                  <Select
                    options={statusOptions}
                    onChange={setStatus}
                    placeholder="Status"
                    required
                  />
                </div>
                <center>
                  <input
                    id="submit"
                    disabled={disable}
                    type="submit"
                    className="btn btn-success"
                    value="Submit"
                  />
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Budget_form = () => {
  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState([
    {
      type: "",
      subtype: "",
      month: Month_Date + "-" + Year_Date,
      amount: 0,
    },
  ]);

  const type = [
    { value: "Admin", label: "Admin" },
    { value: "EA Service", label: "EA Service" },
    { value: "Store Goods", label: "Store Goods" },
    {
      value: "Marketing & Sales Material",
      label: "Marketing & Sales Material",
    },
    { value: "Sales Reimburesement", label: "Sales Reimburesement" },
    { value: "Raw Material", label: "Raw Material" },
    { value: "Capital Goods", label: "Capital Goods" },
    { value: "Household item", label: "Household item" },
    { value: "Miscellaneous", label: "Miscellaneous" },
    { value: "Pipe", label: "Pipe" },
    { value: "Polish", label: "Polish" },
    { value: "Slitting", label: "Slitting" },
    { value: "Plot 128", label: "Plot 128" },
    { value: "Office", label: "Office" },
  ];

  const item_type = [
    { parent: "Admin", value: "Fixed", label: "Fixed" },
    { parent: "Admin", value: "Variable", label: "Variable" },
    { parent: "EA Service", value: "Fixed", label: "Fixed" },
    { parent: "EA Service", value: "Variable", label: "Variable" },
    { parent: "Store Goods", value: "Fixed", label: "Fixed" },
    { parent: "Store Goods", value: "Variable", label: "Variable" },
    { parent: "Marketing & Sales Material", value: "Fixed", label: "Fixed" },
    {
      parent: "Marketing & Sales Material",
      value: "Variable",
      label: "Variable",
    },
    { parent: "Sales Reimburesement", value: "Fixed", label: "Fixed" },
    {
      parent: "Sales Reimburesement",
      value: "Variable",
      label: "Variable",
    },
    { parent: "Raw Material", value: "Fixed", label: "Fixed" },
    { parent: "Raw Material", value: "Variable", label: "Variable" },
    { parent: "Capital Goods", value: "Fixed", label: "Fixed" },
    { parent: "Capital Goods", value: "Variable", label: "Variable" },
    { parent: "Household item", value: "Fixed", label: "Fixed" },
    { parent: "Household item", value: "Variable", label: "Variable" },
    { parent: "Miscellaneous", value: "Fixed", label: "Fixed" },
    { parent: "Miscellaneous", value: "Variable", label: "Variable" },
    { parent: "Pipe", value: "Fixed", label: "Fixed" },
    { parent: "Pipe", value: "Variable", label: "Variable" },
    { parent: "Polish", value: "Fixed", label: "Fixed" },
    { parent: "Polish", value: "Variable", label: "Variable" },
    { parent: "Slitting", value: "Fixed", label: "Fixed" },
    { parent: "Slitting", value: "Variable", label: "Variable" },
    { parent: "Plot 128", value: "Fixed", label: "Fixed" },
    { parent: "Plot 128", value: "Variable", label: "Variable" },
    { parent: "Office", value: "Fixed", label: "Fixed" },
    { parent: "Office", value: "Variable", label: "Variable" },
  ];

  const addForm = () => {
    setFormData([
      ...formData,
      { type: "", subtype: "", amount: 0, month: Month_Date + "-" + Year_Date },
    ]);
  };

  const deleteForm = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  const sendData = (e) => {
    e.preventDefault();
    setDisable(true);
    api({
      api: "/api/budget/",
      method: "post",
      body: { form: formData, post: 1 }, // Sending entire formData array
    })
      .then(() => {
        message.success("Form submitted successfully", 2); // Display success message
        window.location.reload();
      })
      .catch(() => {
        message.error("Form submission failed", 2); // Display failure message
      });
  };

  const handleTypeChange = (index, selectedOption) => {
    const updatedFormData = [...formData];
    updatedFormData[index].type = selectedOption.value;
    setFormData(updatedFormData);
  };

  const handleSubtypeChange = (index, selectedOption) => {
    const updatedFormData = [...formData];
    updatedFormData[index].subtype = selectedOption.value;
    setFormData(updatedFormData);
  };

  const handleAmountChange = (index, e) => {
    const { value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index].amount = value;
    setFormData(updatedFormData);
  };
  return (
    <div className="Budget-form">
      <div
        className="modal fade"
        id="exampleModalToggle6"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Budget Add
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
              {formData.map((data, index) => (
                <form
                  key={index}
                  name={`unitform-${index}`}
                  onSubmit={sendData}>
                  <div className="row">
                    <div className="col-md-3">
                      <label className="control-label">Type of Budget</label>
                      <Select
                        name="type"
                        value={
                          data.type
                            ? { label: data.type, value: data.type }
                            : null
                        }
                        onChange={(selectedOption) =>
                          handleTypeChange(index, selectedOption)
                        }
                        options={type}
                      />
                      {data.type === "" && (
                        <label className="text-danger">Required field</label>
                      )}
                    </div>
                    <div className="col-md-3">
                      <label className="control-label">Sub Type</label>
                      <Select
                        name="subtype"
                        value={
                          data.subtype
                            ? { label: data.subtype, value: data.subtype }
                            : null
                        }
                        onChange={(selectedOption) =>
                          handleSubtypeChange(index, selectedOption)
                        }
                        options={item_type.filter(
                          (item) => item.parent === data.type
                        )}
                      />
                      {data.type === "" && (
                        <label className="text-danger">Required field</label>
                      )}
                    </div>
                    <div className="col-md-3">
                      <label className="control-label">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        value={data.amount}
                        className="form-control"
                        onChange={(e) => handleAmountChange(index, e)}
                      />
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
                          {/* Add icon for adding form */}
                          {index === formData.length - 1 && (
                            <button type="button" onClick={addForm}>
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/1828/1828819.png"
                                width="15"
                                height="15"
                                alt="+"
                              />
                            </button>
                          )}
                          {/* Delete icon for deleting form */}
                          {formData.length > 1 && (
                            <button
                              type="button"
                              onClick={() => deleteForm(index)}>
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/5974/5974771.png"
                                width="15"
                                height="15"
                                alt="-"
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              ))}
              <br />
              {/* Submit button */}
              <input
                disabled={disable}
                type="submit"
                className="btn btn-success"
                value="Submit"
                onClick={sendData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Purc_Form = () => {
  const status = [
    { value: "Due on Receipt", label: "Due on Receipt" },
    { value: "15th of Next Month", label: "15th of Next Month" },
    { value: "Advance Payment", label: "Advance Payment" },
  ];

  var [vedorlistNames, setVendorlist] = useState([]);
  var [budgetlistNames, setBudgetlist] = useState([]);
  var [budgetlists, setBudgetlisted] = useState([]);

  var [itemCode, setSkCode] = useState([]);
  var [item_names, setitemNames] = useState([]);
  var [common_data, setcommon_data] = useState({
    company_id: 0,
    ship_to: 0,
    source_type: 0,
    status: "",
    due_receipt: "",
    discount: 0,
    freight: 0,
    budget_id: "",
    budgetamount: 0,
    tempamount: 0,
    remarks: 0,
    budgetlisted: "",
    file: "",
  });
  console.log(common_data);

  var [descriptions, setDesc] = useState();

  var [form_data, setforms] = useState([
    {
      key: 0,
      code: "",
      quantity: 0,
      rate: 0,
      gst: 0,
      hsn_code: "",
      unit: "",
      item_name: "",
      description: "",
      skCode: "",
      skCode2: "",
      remarks: "",
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
          hsn_code: item.hsn_code,
          unit: item.item_unit,
          rate: item.rate,
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
    api({ api: "/storeitem/vendorlist/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/vendorlist/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/budget/" }).then((data) => {
      setBudgetlist(data);
    });
    api({ api: "/storeitem/budgetlist/" }).then((data) => {
      setBudgetlisted(data);
    });
  }, []);

  function setOptions(data) {
    data.map((item) => {
      item_names.push({ label: item.item_name, value: item.value });
    });
    setitemNames([...item_names]);
  }

  const [pictures, setPictures] = useState([]);
  const onChangePicture = (e) => {
    const newPictures = Array.from(e.target.files);

    const promises = newPictures.map((picture) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const { result } = event.target;
          resolve(result);
        };

        reader.onerror = (err) => {
          reject(err);
        };

        reader.readAsDataURL(picture);
      });
    });

    Promise.all(promises)
      .then((base64Pictures) => {
        setPictures((prevPictures) => [...prevPictures, ...base64Pictures]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function Senddata(e) {
    e.preventDefault();
    console.log("ddf", pictures);
    if (common_data.status === "Advance Payment" && !pictures.length) {
      alert("Bill upload is required for Advance Payment option");
      return;
    }
    if (!common_data.budgetlisted) {
      alert("Status is not choose");
      return;
    } else if (form_data.some((item) => !item.hsn_code)) {
      alert("HSN Code is required");
      return;
    } else {
      api({
        api: "/api/polist/",
        method: "post",
        body: {
          common: common_data,
          form: form_data,
          post: 2,
          image: pictures,
        },
      })
        .then((data) => {
          toast("Success", { autoClose: 2000 });
          window.location.reload();
        })
        .catch(() => {
          toast("failed", { autoClose: 2000 });
        });
    }
  }

  function handle_set_Items_Data(select, key) {
    form_data[key].item_name = select.item_name;
    form_data[key].code = select.value;
    form_data[key].hsn_code = select.hsn_code;
    form_data[key].unit = select.item_unit;
    form_data[key].rate = select.rate;
    form_data[key].description = select.description;
    setforms([...form_data]);
  }

  // multiple data
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
        hsn_code: "",
        unit: "",
        item_name: "",
        description: "",
        remarks: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  function cal_amount() {
    var temp_amount = 0;
    for (var i = 0; i <= form_data.length - 1; i++) {
      var amount = Number(form_data[i].rate) * Number(form_data[i].quantity);
      temp_amount += amount;
    }
    setcommon_data({ ...common_data, tempamount: temp_amount });
  }
  // remove
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
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                PO Genrate
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
                  <div className="col-md-3">
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
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">Ship To</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, ship_to: e.value })
                      }
                      options={vedorlistNames}
                    />
                    {common_data.ship_to === 0 ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">Billing To</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, source_type: e.value })
                      }
                      options={vedorlistNames}
                    />
                    {common_data.source_type === 0 ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Status</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, status: e.value })
                      }
                      options={status}
                    />
                    {common_data.status === "" ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <label className="control-label">Due Receipt</label>
                    <input
                      type="date"
                      className="form-control"
                      value={common_data.due_receipt}
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          due_receipt: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Discount</label>
                    <input
                      type="number"
                      value={common_data.discount}
                      className="form-control"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          discount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Freight</label>
                    <input
                      type="number"
                      className="form-control"
                      value={common_data.freight}
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          freight: e.target.value,
                        })
                      }
                    />
                    {common_data.freight === "" ? <></> : <></>}
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">Budget Type</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          budget_id: e.value,
                          budgetamount: e.amoun,
                        })
                      }
                      options={budgetlistNames}
                    />
                    {common_data.budget === 0 ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Budget Amount</label>
                    <input
                      type="number"
                      readOnly
                      className="form-control"
                      value={common_data.budgetamount - common_data.tempamount}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Comment</label>
                    <input
                      className="form-control"
                      placeholder="Comment"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          remarks: e.target.value,
                        })
                      }
                    />
                    {common_data.remarks === "" ? <></> : <></>}
                  </div>
                  <div className="col-md-4">
                    <label className="control-label" htmlFor="customFile">
                      Bill upload
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept=".pdf, .jpg, .jpeg, .png"
                      onChange={onChangePicture}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Head(Tally)</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          budgetlisted: e.value,
                        })
                      }
                      options={budgetlists}
                    />
                    {common_data.budget === 0 ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <br />
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
                            <div className="col-md-11 row">
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
                              <div className="col-md-3">
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
                                        form_data[data.key].item_name = e.label;
                                        form_data[data.key].description = "";
                                        form_data[data.key].unit = "";
                                        form_data[data.key].rate = "";
                                        form_data[data.key].hsn_code = "";
                                        form_data[data.key].skCode = "";

                                        setforms([...form_data]);
                                      }}
                                      options={item_names}
                                    />
                                  </>
                                )}
                              </div>
                              <div className="col-md-3">
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
                                        label: form_data[data.key].description,
                                        value: form_data[data.key].description,
                                      }}
                                      onChange={(e) => {
                                        form_data[data.key].description =
                                          e.label;
                                        form_data[data.key].unit = e.unit;
                                        form_data[data.key].skCode = e.code;
                                        form_data[data.key].skCode2 = e.value;
                                        form_data[data.key].hsn_code =
                                          e.hsn_code;
                                        form_data[data.key].rate = e.rate;
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
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  HSN Code
                                </label>
                                <input
                                  type="number"
                                  step="0.001"
                                  value={form_data[data.key].hsn_code}
                                  onChange={(e) => {
                                    form_data[data.key].hsn_code =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  placeholder="HSN Code"
                                  className="form-control"
                                  required
                                  pattern="\d{4}"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  step="0.001"
                                  id="quantity"
                                  onChange={(e) => {
                                    form_data[data.key].quantity =
                                      e.target.value;
                                    cal_amount();
                                  }}
                                  placeholder="Quantity"
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Rate</label>
                                <input
                                  type="number"
                                  step="0.001"
                                  value={form_data[data.key].rate}
                                  placeholder="Rate"
                                  onChange={(e) => {
                                    form_data[data.key].rate = e.target.value;
                                    setforms([...form_data]);
                                    cal_amount();
                                  }}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">GST%</label>
                                <input
                                  type="number"
                                  step="0.001"
                                  id="gst"
                                  onChange={(e) => {
                                    form_data[data.key].gst = e.target.value;
                                  }}
                                  placeholder="GST"
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Remarks</label>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    form_data[data.key].remarks =
                                      e.target.value;
                                  }}
                                  placeholder="Remarks"
                                  className="form-control"
                                />
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
                            </div>
                          </div>
                        </form>
                      </div>
                    );
                  })}
                <br />
                {/* end inner forms */}

                {common_data.status === "" ||
                common_data.company_id === 0 ||
                common_data.source_type === 0 ||
                common_data.budgetamount - common_data.tempamount < 0 ||
                common_data.ship_to === 0 ? (
                  <></>
                ) : (
                  <>
                    <input
                      id="submit"
                      type="submit"
                      className="btn btn-success"
                      onClick={Senddata}
                      value="Submit"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
