import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";

export const Store_Form = () => {
  const [polistNames, setPolist] = useState([]);
  const [itemCode, setItemCode] = useState([]);
  const [itemNames, setItemNames] = useState([]);
  const [racklist, setRacklist] = useState([]);
  const [commonData, setCommonData] = useState({
    company_id: 0,
    invoice: "",
    pod_id: 0,
  });
  const [descriptions, setDesc] = useState([]);
  const [formData, setFormData] = useState([
    {
      key: 0,
      code: "",
      quantity: 0,
      rate: 0,
      gst: 0,
      rack: "",
      item_name: "",
      description: "",
      poed: "",
      skCode: "",
      skCode2: "",
    },
  ]);

  useEffect(() => {
    api({ api: "/storeitem/itemlist/" }).then((data) => {
      setItemCode(data);
      const decs = data.map((item) => ({
        label: item.description,
        value: item.value,
        item_name: item.item_name,
        unit: item.item_unit,
        code: item.label,
      }));
      setDesc(decs);
      const names = data.map((item) => item.item_name);
      const filteredData = data.filter(
        ({ item_name }, index) => !names.includes(item_name, index + 1)
      );
      setOptions(filteredData);
    });
    api({ api: "/storeitem/polist/" }).then((data) => {
      setPolist(data);
    });
    api({ api: "/storeitem/racklisted/" }).then((data) => {
      setRacklist(data);
    });
  }, []);

  const setOptions = (data) => {
    const options = data.map((item) => ({
      label: item.item_name,
      value: item.value,
    }));
    setItemNames(options);
  };

  const sendData = () => {
    api({
      api: "/api/storelist/",
      method: "post",
      body: { common: commonData, form: formData, post: 2 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("Error", { autoClose: 2000 });
      });
  };

  const handleSetItemsData = (selectedOption, key) => {
    const updatedFormData = [...formData];
    updatedFormData[key] = {
      ...updatedFormData[key],
      item_name: selectedOption.item_name,
      code: selectedOption.label,
      unit: selectedOption.unit,
      description: selectedOption.description,
      skCode: selectedOption.label,
      skCode2: selectedOption.value,
    };
    setFormData(updatedFormData);
  };

  const handleAddForm = (key) => {
    if (formData[key].unit !== "") {
      const newForm = {
        key: formData[formData.length - 1].key + 1,
        code: "",
        skCode: "",
        skCode2: "",
        quantity: 0,
        rate: 0,
        rack: "",
        gst: 0,
        poed: "",
        item_name: "",
        description: "",
      };
      setFormData([...formData, newForm]);
    }
  };

  const handleRemoveForm = (index) => {
    setFormData(formData.filter((item) => item.key !== index));
  };

  const handlePoChange = (selectedOption) => {
    setCommonData({ ...commonData, pod_id: selectedOption.value });
    fetchPoData(selectedOption.value);
  };

  const fetchPoData = (poId) => {
    api({ api: "/api/poentity/" + poId + "/" })
      .then((data) => {
        console.log("API Response:", data); // Log the API response for debugging
        if (data && data.length > 0) {
          const updatedFormData = data.map((item, index) => ({
            key: index, // Use index as key assuming it's unique
            code: item.label || "", // Assuming 'label' is the SKU Code field
            item_name: item.item_name || "",
            description: item.description || "",
            poed: item.id || 0,
            rate: parseFloat(item.rate) || 0,
            gst: parseFloat(item.gst) || 0,
            quantity: 0, // Adjust as per your logic
            rack: "", // Adjust as per your logic
            skCode2: item.value || "", // Assuming 'value' is the SKU Code value
            skCode: "", // Assuming this is empty initially
          }));
          setFormData(updatedFormData);
        } else {
          toast("No data found for the selected PO", { autoClose: 2000 });
        }
      })
      .catch((error) => {
        console.error("Error fetching PO data:", error); // Log the error for debugging
        toast("Error fetching PO data", { autoClose: 2000 });
      });
  };

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
                Store Item
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
                    <label className="control-label">PO No.</label>
                    <Select onChange={handlePoChange} options={polistNames} />
                    {commonData.pod_id === 0 ? (
                      <label className="text-danger">Required field</label>
                    ) : null}
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Invoice</label>
                    <input
                      type="text"
                      value={commonData.invoice}
                      className="form-control"
                      onChange={(e) =>
                        setCommonData({
                          ...commonData,
                          invoice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                {/* common form */}

                {/* inner forms */}
                {formData.length > 0 &&
                  formData.map((data) => (
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
                          <div className="col-md-11">
                            <div className="row">
                              <div className="col-md-2">
                                <label className="control-label">
                                  SKU Code
                                </label>
                                {data.code !== "" ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={data.code}
                                    readOnly
                                  />
                                ) : (
                                  <Select
                                    onChange={(selectedOption) =>
                                      handleSetItemsData(
                                        selectedOption,
                                        data.key
                                      )
                                    }
                                    options={itemCode}
                                  />
                                )}
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Item Name
                                </label>
                                {data.code !== "" ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={data.item_name}
                                    readOnly
                                  />
                                ) : (
                                  <Select
                                    onChange={(e) => {
                                      const updatedFormData = [...formData];
                                      updatedFormData[data.key] = {
                                        ...updatedFormData[data.key],
                                        item_name: e.label,
                                        description: "",
                                        unit: "",
                                        skCode: "",
                                      };
                                      setFormData(updatedFormData);
                                    }}
                                    options={itemNames}
                                  />
                                )}
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Description
                                </label>
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
                                      const updatedFormData = [...formData];
                                      updatedFormData[data.key] = {
                                        ...updatedFormData[data.key],
                                        description: e.label,
                                        unit: e.unit,
                                        code: e.code,
                                        skCode2: e.value,
                                      };
                                      setFormData(updatedFormData);
                                    }}
                                    options={
                                      data.item_name !== ""
                                        ? descriptions.filter(
                                            (item) =>
                                              item.item_name === data.item_name
                                          )
                                        : []
                                    }
                                  />
                                )}
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Rack</label>
                                <Select
                                  onChange={(e) => {
                                    const updatedFormData = [...formData];
                                    updatedFormData[data.key].rack = e.value;
                                    setFormData(updatedFormData);
                                  }}
                                  options={racklist}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  step="any"
                                  id="quantity"
                                  onChange={(e) => {
                                    const updatedFormData = [...formData];
                                    updatedFormData[data.key].quantity =
                                      e.target.value;
                                    setFormData(updatedFormData);
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
                                  step="any"
                                  id="rate"
                                  placeholder="Rate"
                                  onChange={(e) => {
                                    const updatedFormData = [...formData];
                                    updatedFormData[data.key].rate =
                                      e.target.value;
                                    setFormData(updatedFormData);
                                  }}
                                  className="form-control"
                                  required
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
                                  onClick={() => handleRemoveForm(data.key)}>
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

                {/* end inner forms */}
                <br />
                <center>
                  {commonData.company_id === "" ||
                  commonData.pod_id === 0 ? null : (
                    <input
                      id="submit"
                      type="submit"
                      className="btn btn-success border-secondary"
                      onClick={sendData}
                      value="Submit"
                    />
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
