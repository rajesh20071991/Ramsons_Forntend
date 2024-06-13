import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import { align } from "@progress/kendo-drawing";

export const ChallansList_Form = () => {
  var [common_data, setcommon_data] = useState({
    source_id: 1,
    company_id: 0,
    challan_no: "",
    ship_to: "",
    vehicle_no: 0,
    chalan_id: 0,
    fixed_quantity: 0,
    status: 0,
    vehicle_type: "",
  });
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  const [goodsItems, setGoodsItems] = useState([
    {
      description: "",
      hsnCode: "",
      ratePerKg: 0,
      job_charges: 0,
      challanNo: "",
      quantity: 0,
      balance: 0,
    },
  ]); // Initialize with one default row

  const handleGoodsAdd = () => {
    const newItem = {
      description: "",
      hsnCode: "",
      ratePerKg: 0,
      job_charges: 0,
      challanNo: "",
      quantity: 0,
      balance: 0,
    };
    setGoodsItems([...goodsItems, newItem]);
  };

  const handlesDelete = (index) => {
    const newItems = [...goodsItems];
    newItems.splice(index, 1);
    setGoodsItems(newItems);
  };

  const [validationErrors, setValidationErrors] = useState([]);

  const isFormValid = () => {
    const errors = [];

    if (!common_data.company_id) errors.push("Company Name is required.");
    if (!common_data.ship_to) errors.push("Ship To is required.");
    if (!common_data.challan_no) errors.push("Ramson Invoice No. is required.");
    if (!common_data.vehicle_no) errors.push("Vehicle No. is required.");
    if (!common_data.vehicle_type) errors.push("Vehicle Type is required.");
    if (!common_data.status) errors.push("Status is required.");
    if (goodsItems.length === 0)
      errors.push("At least one goods item is required.");

    goodsItems.forEach((item, index) => {
      if (!item.challanNo)
        errors.push(`Challan No. is required for item ${index + 1}.`);
      if (!item.description)
        errors.push(`Description is required for item ${index + 1}.`);
      if (!item.hsnCode)
        errors.push(`HSN Code is required for item ${index + 1}.`);
      if (item.quantity <= 0)
        errors.push(`Quantity must be greater than 0 for item ${index + 1}.`);
      if (item.job_charges < 0)
        errors.push(`Job Charges must be non-negative for item ${index + 1}.`);
      if (item.ratePerKg < 0)
        errors.push(`Rate Per Kg must be non-negative for item ${index + 1}.`);
    });
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      toast("Please fix the errors before submitting.", { autoClose: 3000 });
      return;
    }

    // Submit form data to backend or perform desired action
    api({
      api: "/api/chalanentity/",
      method: "post",
      body: {
        common: common_data,
        good: goodsItems,
        date: date,
        post: 1,
      },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  };

  const veichle = [
    { value: "Truck", label: "Truck" },
    { value: "Tractor", label: "Tractor" },
    { value: "Pick up", label: "Pick up" },
    { value: "Tempo", label: "Tempo" },
  ];

  const status1 = [
    { value: "Job Charges", label: "Job Charges" },
    { value: "Handling", label: "Handling" },
  ];

  var [vedorlistNames, setVendorlist] = useState([]);
  var [namelist, setnamelist] = useState();
  var [chalanviewlist, setchalanviewlist] = useState();
  var [challanList, setChallanList] = useState({ value: "" });
  useEffect(() => {
    api({ api: "/storeitem/companylist/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/namelist/" }).then((data) => {
      setnamelist(data);
    });
    api({ api: "/storeitem/chalanviewlist/" }).then((data) => {
      setchalanviewlist(data);
    });
    api({ api: "/storeitem/challviewlist/" })
      .then((data) => {
        setChallanList(data);
        setcommon_data({ ...common_data, challan_no: data });
        console.log("challanList data:", data); // Add this line to check the data
      })
      .catch((error) => {
        console.error("Error fetching challanList data:", error);
      });
  }, []);

  const updateBalancesForChallan = () => {
    const updatedItems = [...goodsItems];
    const challanBalances = {};

    chalanviewlist.forEach((challan) => {
      challanBalances[challan.value] = challan.stockoit;
    });

    updatedItems.forEach((item) => {
      if (item.challanNo && challanBalances[item.challanNo] !== undefined) {
        item.initialBalance = challanBalances[item.challanNo];
        challanBalances[item.challanNo] -= item.quantity;
        item.balance = Math.max(challanBalances[item.challanNo], 0); // Ensure balance >= 0
      }
    });

    setGoodsItems(updatedItems);
  };

  const updateGoodsItems = (index, field, value) => {
    const newItems = [...goodsItems];
    newItems[index][field] = value;

    if (field === "challanNo") {
      const selectedChallan = chalanviewlist.find(
        (item) => item.value === value
      );
      newItems[index].initialBalance = selectedChallan
        ? selectedChallan.stockoit
        : 0;

      // Update job_charges and ratePerKg if the same challan is selected again
      if (selectedChallan) {
        newItems[index].job_charges = selectedChallan.job_charges || 0;
        newItems[index].ratePerKg = selectedChallan.ratePerKg || 0;
      }
    }

    // Ensure quantity does not exceed balance
    if (field === "quantity" && newItems[index].challanNo) {
      const balance = newItems[index].initialBalance || 0;
      newItems[index].quantity = Math.min(value, balance);
    }

    setGoodsItems(newItems);
    updateBalancesForChallan();
  };

  const handleChallanSelect = (index, selectedOption) => {
    const newItems = [...goodsItems];
    newItems[index].challanNo = selectedOption.value;
    newItems[index].initialBalance = selectedOption.stockoit;
    newItems[index].balance = selectedOption.stockoit;

    // Update job_charges and ratePerKg if the same challan is selected again
    newItems[index].job_charges = selectedOption.job_charges || 0;
    newItems[index].ratePerKg = selectedOption.ratePerKg || 0;

    setGoodsItems(newItems);
  };

  console.log(goodsItems, "r734878");

  return (
    <div className="Challan_form">
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
                Challan Genrate
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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-2">
                    <label>Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  {/* <div className="col-md-3">
                    <label>Source Type:-</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, source_id: e.value })
                      }
                      options={sourcelist}
                    />
                  </div> */}
                  <div className="col-md-3">
                    <label>Company Name:-</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          company_id: e.value,
                        })
                      }
                      options={vedorlistNames}
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Ship To</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, ship_to: e.value })
                      }
                      options={vedorlistNames}
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Ramson Invoice No.</label>
                    <input
                      type="text"
                      value={common_data.challan_no}
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          challan_no: e.target.value,
                        })
                      } // fix the assignment operator and remove unnecessary square brackets
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <label>Vehicle No.</label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          vehicle_no: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Vehicle Type</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          vehicle_type: e.value,
                        })
                      }
                      options={veichle}
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Status</label>
                    <Select
                      options={status1}
                      onChange={(e) =>
                        setcommon_data({ ...common_data, status: e.value })
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Fixed Quantity</label>
                    <input
                      type="number"
                      step="0.001"
                      value={common_data.fixed_quantity}
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          fixed_quantity: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <label style={{ textDecoration: "underline" }}>
                    <h5>Goods Items </h5>
                  </label>
                  <table style={{ textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th style={{ fontSize: "20px", width: "200px" }}>
                          Challan No.
                        </th>
                        <th style={{ fontSize: "20px", width: "200px" }}>
                          Description
                        </th>
                        <th style={{ fontSize: "20px" }}>HSN Code</th>
                        <th style={{ fontSize: "20px" }}>Quantity</th>
                        <th
                          style={{
                            fontSize: "20px",
                            wordWrap: "break-word",
                          }}>
                          Job Charges
                        </th>
                        <th
                          style={{ fontSize: "20px", wordWrap: "break-word" }}>
                          Rate Per Kg.
                        </th>
                        <th style={{ fontSize: "20px" }}>Balance</th>
                        <th style={{ fontSize: "20px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {goodsItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Select
                              options={
                                chalanviewlist && common_data.company_id !== ""
                                  ? chalanviewlist.filter(
                                      (item) =>
                                        item.company === common_data.company_id
                                    )
                                  : chalanviewlist
                              }
                              onChange={(e) => handleChallanSelect(index, e)}
                              placeholder="Challan No."
                            />
                          </td>
                          <td>
                            <Select
                              options={namelist}
                              onChange={(e) => {
                                const newItems = [...goodsItems];
                                newItems[index].description = e.value;
                                newItems[index].hsnCode = e.hsncode;
                                setGoodsItems(newItems);
                              }}
                              placeholder="Description"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.hsnCode}
                              onChange={(e) => {
                                const newItems = [...goodsItems];
                                newItems[index].hsnCode = e.target.value;
                                setGoodsItems(newItems);
                              }}
                              placeholder="HSN Code"
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                updateGoodsItems(
                                  index,
                                  "quantity",
                                  parseFloat(e.target.value)
                                );
                              }}
                              placeholder="Quantity"
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.job_charges}
                              onChange={(e) => {
                                const newItems = [...goodsItems];
                                newItems[index].job_charges = e.target.value;
                                setGoodsItems(newItems);
                              }}
                              placeholder="Job Charges"
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.ratePerKg}
                              onChange={(e) => {
                                const newItems = [...goodsItems];
                                newItems[index].ratePerKg = e.target.value;
                                setGoodsItems(newItems);
                              }}
                              placeholder="Rate Per Kg."
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.balance}
                              className="form-control"
                              placeholder="Balance"
                              disabled
                            />
                          </td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="First group">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handlesDelete(index)}>
                                <img
                                  src="https://cdn-icons-png.flaticon.com/128/5974/5974771.png"
                                  width="15"
                                  height="15"
                                  alt="-"
                                />
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={handleGoodsAdd}>
                                <img
                                  src="https://cdn-icons-png.flaticon.com/128/1828/1828819.png"
                                  width="15"
                                  height="15"
                                  alt="+"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <center>
                  <button className="btn btn-success" type="submit">
                    Submit
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
