import React, { useState } from "react";

function MainForm() {
  const [companyName, setCompanyName] = useState("");
  const [shipTo, setShipTo] = useState("");
  const [challanNo, setChallanNo] = useState("");
  const [date, setDate] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [status, setStatus] = useState("");
  const [jobCharges, setJobCharges] = useState(0);
  const [fixedQuantity, setFixedQuantity] = useState(0);

  const [goodsItems, setGoodsItems] = useState([]);
  const [challanItems, setChallanItems] = useState([]);

  const handleGoodsAdd = () => {
    const newItem = {
      description: "",
      hsnCode: "",
      quantity: 0,
      ratePerKg: 0,
    };
    setGoodsItems([...goodsItems, newItem]);
  };

  const handleChallanAdd = () => {
    const newItem = {
      challanNo: "",
      quantity: 0,
      balance: 0,
    };
    setChallanItems([...challanItems, newItem]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data to backend or perform desired action
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Company Name</label>
      <select
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      >
        <option value="">Select company</option>
        <option value="company1">Company 1</option>
        <option value="company2">Company 2</option>
        <option value="company3">Company 3</option>
      </select>

      <label>Ship To</label>
      <input
        type="text"
        value={shipTo}
        onChange={(e) => setShipTo(e.target.value)}
      />

      <label>Challan No.</label>
      <input
        type="text"
        value={challanNo}
        onChange={(e) => setChallanNo(e.target.value)}
      />

      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label>Vehicle No.</label>
      <input
        type="text"
        value={vehicleNo}
        onChange={(e) => setVehicleNo(e.target.value)}
      />

      <label>Vehicle Type</label>
      <input
        type="text"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
      />

      <label>Status</label>
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <label>Job Charges</label>
      <input
        type="number"
        value={jobCharges}
        onChange={(e) => setJobCharges(e.target.value)}
      />

      <label>Fixed Quantity</label>
      <input
        type="number"
        value={fixedQuantity}
        onChange={(e) => setFixedQuantity(e.target.value)}
      />

      <div>
        <label>Goods Items</label>
        <button type="button" onClick={handleGoodsAdd}>
          Add Item
        </button>
        {goodsItems.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              value={item.description}
              onChange={(e) => {
                const newItems = [...goodsItems];
                newItems[index].description = e.target.value;
                setGoodsItems(newItems);
              }}
              placeholder="Description of Goods"
            />
            <input
              type="text"
              value={item.hsnCode}
              onChange={(e) => {
                const newItems = [...goodsItems];
                newItems[index].hsnCode = e.target.value;
                setGoodsItems(newItems);
              }}
              placeholder="HSN Code"
            />

            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...goodsItems];
                newItems[index].quantity = e.target.value;
                setGoodsItems(newItems);
              }}
              placeholder="Quantity"
            />

            <input
              type="number"
              value={item.ratePerKg}
              onChange={(e) => {
                const newItems = [...goodsItems];
                newItems[index].ratePerKg = e.target.value;
                setGoodsItems(newItems);
              }}
              placeholder="Rate Per Kg."
            />
          </div>
        ))}
      </div>

      <div>
        <label>Challan Items</label>
        <button type="button" onClick={handleChallanAdd}>
          Add Item
        </button>
        {challanItems.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              value={item.challanNo}
              onChange={(e) => {
                const newItems = [...challanItems];
                newItems[index].challanNo = e.target.value;
                setChallanItems(newItems);
              }}
              placeholder="Challan No."
            />

            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...challanItems];
                newItems[index].quantity = e.target.value;
                setChallanItems(newItems);
              }}
              placeholder="Quantity"
            />

            <input
              type="number"
              value={item.balance}
              onChange={(e) => {
                const newItems = [...challanItems];
                newItems[index].balance = e.target.value;
                setChallanItems(newItems);
              }}
              placeholder="Balance"
            />
          </div>
        ))}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default MainForm;
