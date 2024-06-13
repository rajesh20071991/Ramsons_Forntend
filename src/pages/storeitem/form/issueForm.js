import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { RiAddFill } from "react-icons/ri";
import BarcodeReader from "react-barcode-reader";

export const Issue_Form = () => {
  var [itemCode, setSkCode] = useState([]);
  var [item_names, setitemNames] = useState([]);
  var [descriptions, setDesc] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [personName, setPersonName] = useState(""); // State for person name
  const [selectedFinalStatus, setSelectedFinalStatus] = useState(null); // State for selected final status
  const [slipNo, setSlipNo] = useState(""); // State for slip number
  const [remarks, setRemarks] = useState(""); // State for remarks

  const handleScan = (data) => {
    if (data) {
      const scannedItem = data.split(",").reduce((acc, pair) => {
        const [key, value] = pair.split(":").map((str) => str.trim());
        acc[key] = value;
        return acc;
      }, {});

      // Check if the scanned item already exists in form_data
      const existingIndex = form_data.findIndex(
        (item) =>
          item.skCode2 === scannedItem.id &&
          item.item_name === scannedItem.name &&
          item.skCode === scannedItem.code &&
          item.unit === scannedItem.unit &&
          item.description === scannedItem.description &&
          item.rate === scannedItem.rate
      );

      if (existingIndex !== -1) {
        // If item exists, update its quantity
        const updatedFormData = [...form_data];
        updatedFormData[existingIndex].qunatity +=
          parseInt(scannedItem.qunatity) || 0;
        setforms(updatedFormData);
      } else {
        // If item doesn't exist, add it as a new item
        const newItem = {
          key: form_data.length,
          code: "",
          skCode: scannedItem.code || "",
          qunatity: parseInt(scannedItem.qunatity) || 0,
          unit: scannedItem.unit || "",
          item_name: scannedItem.name || "",
          description: scannedItem.description || "",
          rate: scannedItem.rate || "",
          skCode2: scannedItem.id || "",
        };

        setforms([...form_data, newItem]);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  var [form_data, setforms] = useState([
    {
      key: 0,
      code: "",
      qunatity: 0,
      unit: "",
      item_name: "",
      description: "",
      skCode: "",
      skCode2: "",
    },
  ]);

  console.log(form_data);

  const mill_type = [
    { value: "Mill", label: "Mill" },
    { value: "Office", label: "Office" },
    { value: "Polish", label: "Polish" },
    { value: "Slitting", label: "Slitting" },
    { value: "Repair", label: "Repair" },
    { value: "House Hold", label: "House Hold" },
    { value: "Housekeeping", label: "Housekeeping" },
    { value: "Return of Goods", label: "Return of Goods" },
  ];

  const item_type = [
    { parent: "Mill", value: "Mill-1", label: "Mill-1" },
    { parent: "Mill", value: "Mill-2", label: "Mill-2" },
    { parent: "Mill", value: "Mill-3", label: "Mill-3" },
    { parent: "Mill", value: "Mill-4", label: "Mill-4" },
    { parent: "Mill", value: "Mill-5", label: "Mill-5" },
    { parent: "Mill", value: "Mill-6", label: "Mill-6" },
    { parent: "Mill", value: "Mill-7", label: "Mill-7" },
    { parent: "Mill", value: "Mill-8", label: "Mill-8" },
    { parent: "Mill", value: "Mill-9", label: "Mill-9" },
    { parent: "Mill", value: "Mill-10", label: "Mill-10" },
    { parent: "Mill", value: "Mill-11", label: "Mill-11" },
    { parent: "Mill", value: "Mill-12", label: "Mill-12" },
    { parent: "Mill", value: "Mill-13", label: "Mill-13" },
    { parent: "Mill", value: "Mill-14", label: "Mill-14" },
    { parent: "Mill", value: "Mill-15", label: "Mill-15" },
    { parent: "Mill", value: "Mill-16", label: "Mill-16" },
    { parent: "Mill", value: "Project", label: "Project" },
    { parent: "Mill", value: "Plot No. 128", label: "Plot No. 128" },
    { parent: "Mill", value: "Mill-101", label: "Mill-101" },
    { parent: "Mill", value: "Mill-102", label: "Mill-102" },
    { parent: "Mill", value: "Electrical", label: "Electrical" },
    { parent: "Mill", value: "Mechanical", label: "Mechanical" },
    { parent: "Mill", value: "Repair", label: "Repair" },
    { parent: "Office", value: "Office", label: "Office" },
    { parent: "Office", value: "Housekeeping", label: "Housekeeping" },
    { parent: "Office", value: "Fixed Cost", label: "Fixed Cost" },
    {
      parent: "Office",
      value: "Returnable Device",
      label: "Returnable Device",
    },
    { parent: "Polish", value: "Mill-1", label: "Mill-1" },
    { parent: "Polish", value: "Mill-2", label: "Mill-2" },
    { parent: "Polish", value: "Mill-3", label: "Mill-3" },
    { parent: "Polish", value: "Mill-4", label: "Mill-4" },
    { parent: "Polish", value: "Mill-5", label: "Mill-5" },
    { parent: "Polish", value: "Mill-6", label: "Mill-6" },
    { parent: "Polish", value: "Mill-7", label: "Mill-7" },
    { parent: "Polish", value: "Project", label: "Project" },
    { parent: "Polish", value: "Project", label: "Project" },
    { parent: "Polish", value: "Electrical", label: "Electrical" },
    { parent: "Polish", value: "Mechanical", label: "Mechanical" },
    { parent: "Polish", value: "Repair", label: "Repair" },
    { parent: "Slitting", value: "Slitting", label: "Slitting" },
    { parent: "Slitting", value: "Project", label: "Project" },
    { parent: "Slitting", value: "Repair", label: "Repair" },
    { parent: "Slitting", value: "Electrical", label: "Electrical" },
    { parent: "Slitting", value: "Mechanical", label: "Mechanical" },
    { parent: "House Hold", value: "House Hold", label: "House Hold" },
    { parent: "Housekeeping", value: "Housekeeping", label: "Housekeeping" },
    {
      parent: "Return of Goods",
      value: "Return to Buyer",
      label: "Return to Buyer",
    },
    {
      parent: "Return of Goods",
      value: "Job",
      label: "Job",
    },
    {
      parent: "Return of Goods",
      value: "Repair",
      label: "Repair",
    },
    {
      parent: "Maintaince",
      value: "Electrical",
      label: "Electrical",
    },
    {
      parent: "Maintaince",
      value: "Slitting",
      label: "Slitting",
    },
    { parent: "Maintaince", value: "Mechanical", label: "Mechanical" },
    { parent: "Maintaince", value: "Operational", label: "Operational" },
    { parent: "Repair", value: "Repair", label: "Repair" },
    { parent: "Repair", value: "Mechanical", label: "Mechanical" },
    { parent: "Repair", value: "Electrical", label: "Electrical" },
  ];

  const [selectedCostCenter, setSelectedCostCenter] = useState(null);
  const [finalStatusOptions, setFinalStatusOptions] = useState([]);

  const handleCostCenterChange = (selectedOption) => {
    setSelectedCostCenter(selectedOption);
    // Filter final status options based on selected cost center
    const filteredOptions = item_type.filter(
      (item) => item.parent === selectedOption.value
    );
    setFinalStatusOptions(filteredOptions);
  };

  useEffect(() => {
    api({ api: "/storeitem/itemIssuelist/" }).then((data) => {
      setSkCode(data);
      var decs = [];
      data.map((item) => {
        decs.push({
          label: item.description,
          value: item.value,
          item_name: item.item_name,
          stockin: item.stockin,
          unit: item.item_unit,
          code: item.label,
          rate: item.rate,
        });
      });
      setDesc(decs);
      const names = data.map((item) => item.item_name);
      data = data.filter(
        ({ item_name }, index) => !names.includes(item_name, index + 1)
      );
      setOptions(data);
    });
  }, []);

  function setOptions(data) {
    data.map((item) => {
      item_names.push({ label: item.item_name, value: item.value });
    });
    setitemNames([...item_names]);
  }

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/issue/",
      method: "post",
      body: {
        post: 1,
        form: form_data,
        date: selectedDate,
        person_name: personName,
        cost_status: selectedCostCenter.value,
        final_status: selectedFinalStatus.value,
        slip_no: slipNo,
        remarks: remarks,
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

  function handle_set_Items_Data(select, key) {
    form_data[key].item_name = select.item_name;
    form_data[key].code = select.value;
    form_data[key].unit = select.item_unit;
    form_data[key].description = select.description;
    form_data[key].stockin = select.stockin;
    form_data[key].rate = select.rate;
    setforms([...form_data]);
  }

  function handleAddForm() {
    var form_body = {
      key: form_data[form_data.length - 1].key + 1,
      code: "",
      skCode: "",
      skCode2: "",
      quantity: 0,
      unit: "",
      item_name: "",
      rate: "",
      description: "",
    };
    setforms([...form_data, form_body]);
  }

  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
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
                PO Generate
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div
              className="modal-body"
              style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="main-form">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <BarcodeReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: "100%" }}
                      />
                      <div className="col-md-2">
                        <label className="control-label">Date</label>
                        <input
                          type="date"
                          placeholder="Date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="control-label">Person Name</label>
                        <input
                          type="text"
                          id="person_name"
                          value={personName}
                          onChange={(e) => setPersonName(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="control-label">
                          Cost Center Status
                        </label>
                        <Select
                          value={selectedCostCenter}
                          onChange={handleCostCenterChange}
                          options={mill_type}
                          required
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="control-label">Final Status</label>
                        <Select
                          value={selectedFinalStatus}
                          onChange={setSelectedFinalStatus}
                          options={finalStatusOptions}
                          required
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="control-label">Slip No.</label>
                        <input
                          type="number"
                          id="slip_no"
                          value={slipNo}
                          onChange={(e) => setSlipNo(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="control-label">Remarks</label>
                        <input
                          type="text"
                          id="remarks"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <table
                      className="table table-bordered"
                      style={{ tableLayout: "fixed" }}>
                      <colgroup>
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "7%" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>SKU Code</th>
                          <th>Item Name</th>
                          <th>Description</th>
                          <th>Unit</th>
                          <th>Rate</th>
                          <th>Quantity</th>
                          <th>Balance</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {form_data.map((data) => (
                          <tr key={data.key}>
                            <td>
                              {data.skCode !== "" ? (
                                <input
                                  type="text"
                                  className="form-control"
                                  value={data.skCode}
                                  readOnly
                                />
                              ) : (
                                <Select
                                  // value={
                                  //   data.skCode === ""
                                  //     ? { value: data.value, label: data.label }
                                  //     : {
                                  //         value: data.skCode2,
                                  //         label: data.skCode,
                                  //       }
                                  // }
                                  onChange={(e) =>
                                    handle_set_Items_Data(e, data.key)
                                  }
                                  options={itemCode}
                                />
                              )}
                            </td>
                            <td>
                              {data.code !== "" ? (
                                <input
                                  type="text"
                                  className="form-control"
                                  value={data.item_name}
                                  readOnly
                                />
                              ) : (
                                <Select
                                  value={{
                                    label: data.item_name,
                                    value: data.item_name,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].item_name = e.label;
                                    form_data[data.key].description = "";
                                    form_data[data.key].unit = "";
                                    form_data[data.key].skCode = "";
                                    form_data[data.key].stockin = "";
                                    form_data[data.key].rate = "";
                                    setforms([...form_data]);
                                  }}
                                  options={item_names}
                                />
                              )}
                            </td>
                            <td>
                              {data.code !== "" ? (
                                <input
                                  type="text"
                                  className="form-control"
                                  value={data.description}
                                  readOnly
                                />
                              ) : (
                                <Select
                                  value={{
                                    label: data.description,
                                    value: data.description,
                                  }}
                                  onChange={(e) => {
                                    form_data[data.key].description = e.label;
                                    form_data[data.key].unit = e.unit;
                                    form_data[data.key].skCode = e.code;
                                    form_data[data.key].skCode2 = e.value;
                                    form_data[data.key].stockin = e.stockin;
                                    form_data[data.key].rate = e.rate;
                                    setforms([...form_data]);
                                  }}
                                  options={
                                    data.item_name !== ""
                                      ? descriptions.filter(
                                          (item) =>
                                            item.item_name === data.item_name
                                        )
                                      : descriptions
                                  }
                                />
                              )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value={data.unit}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value={data.rate}
                                onChange={(e) => {
                                  form_data[data.key].rate = e.target.value;
                                  setforms([...form_data]);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={data.qunatity}
                                onChange={(e) => {
                                  const newValue = e.target.value;
                                  if (newValue <= data.stockin) {
                                    form_data[data.key].qunatity = newValue;
                                    setforms([...form_data]);
                                  } else {
                                    // Optionally, you can provide feedback to the user about the validation failure.
                                    alert(
                                      "Quantity cannot be greater than stockin."
                                    );
                                  }
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={data.stockin}
                                onChange={(e) => {
                                  form_data[data.key].stockin = e.target.value;
                                  setforms([...form_data]);
                                }}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleRemoveForm(data.key)}
                                style={{ fontSize: "1em" }}>
                                <DeleteOutlineIcon fontSize="medium" />
                              </button>
                              <button
                                type="button"
                                onClick={handleAddForm}
                                style={{ fontSize: "1em" }}>
                                <RiAddFill size={30} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <center>
                      <button
                        id="submit"
                        type="button"
                        className="btn btn-success border-secondary"
                        onClick={Senddata}>
                        Submit
                      </button>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
