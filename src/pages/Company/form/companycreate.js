import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Select from "react-select";
import { statelist } from "../../../services/constant";
import axios from "axios"; // Add axios for making the API call

export const Companylist_Form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      person_name: "",
      company_name: "",
      gst_no: "",
      emailid: "",
      phone_no: "",
      alternate_no: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      status: "", // Add status field
      manager_name: "", // Add manager_name field
    },
  ]);

  const fetchCompanyDetails = async (gstNo, key) => {
    try {
      const response = await axios.get(
        `https://blog-backend.mastersindia.co/api/v1/custom/search/name_and_pan/?keyword=${gstNo}`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            dnt: "1",
            origin: "https://www.mastersindia.co",
            referer:
              "https://www.mastersindia.co/gst-number-search-by-name-and-pan/",
            "sec-ch-ua":
              '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "Windows",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          },
        }
      );

      if (response.data.success && response.data.data.length > 0) {
        const companyDetails = response.data.data[0];
        const address = [
          companyDetails.pradr.addr.bno,
          companyDetails.pradr.addr.st,
          companyDetails.pradr.addr.bnm,
          companyDetails.pradr.addr.loc,
          companyDetails.pradr.addr.dst,
          companyDetails.pradr.addr.stcd,
          companyDetails.pradr.addr.pncd,
        ]
          .filter(Boolean)
          .join(", ");

        setforms((prevState) => {
          const updatedForm = [...prevState];
          updatedForm[key] = {
            ...updatedForm[key],
            person_name: companyDetails.lgnm,
            company_name: companyDetails.tradeNam,
            address: address,
            state: companyDetails.pradr.addr.stcd,
            city: companyDetails.pradr.addr.loc,
            pincode: companyDetails.pradr.addr.pncd,
          };
          return updatedForm;
        });
      } else {
        toast("GST Number not found", { autoClose: 2000 });
      }
    } catch (error) {
      toast("Failed to fetch company details", { autoClose: 2000 });
    }
  };

  function Senddata(e) {
    e.preventDefault();

    // Check if phone_no and company_name are not blank
    const isPhoneNoValid = form_data[0].phone_no.trim() !== "";
    const isCompanyNameValid = form_data[0].company_name.trim() !== "";
    const isGstNoValid = form_data[0].gst_no.trim().length === 15;

    if (isPhoneNoValid && isCompanyNameValid && isGstNoValid) {
      // If phone_no, company_name, and gst_no are valid, proceed with the API call
      api({
        api: "/api/company/",
        method: "post",
        body: { form: form_data, post: 1 },
      })
        .then(() => {
          toast("Success", { autoClose: 2000 });
          window.location.reload();
        })
        .catch(() => {
          toast("Failed", { autoClose: 2000 });
        });
    } else {
      // If phone_no, company_name, or gst_no are invalid, show an error message
      let errorMessage = "Please fill in all required fields.";
      if (!isPhoneNoValid) errorMessage = "Phone number cannot be blank.";
      if (!isCompanyNameValid) errorMessage = "Company name cannot be blank.";
      if (!isGstNoValid)
        errorMessage = "GST number must be 15 characters long.";

      toast(errorMessage, {
        autoClose: 2000,
      });
    }
  }

  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        person_name: "",
        company_name: "",
        gst_no: "",
        emailid: "",
        phone_no: "",
        alternate_no: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        status: "", // Add status field
        manager_name: "", // Add manager_name field
      };
      setforms([...form_data, form_body]);
    }
  }

  const [salesteam, setsalesteam] = useState("");

  useEffect(() => {
    api({ api: "/storeitem/salesteamlist/" }).then((data) => {
      setsalesteam(data);
    });
  }, []);

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
                Company Create
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
                {" "}
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
                            <div className="col-md-11">
                              <div className="row">
                                <div className="col-md-2">
                                  <label className="control-label">
                                    GST No.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="GST No."
                                    className="form-control"
                                    value={data.gst_no}
                                    onChange={(e) => {
                                      const gstNo = e.target.value;
                                      form_data[data.key].gst_no = gstNo;
                                      setforms([...form_data]);
                                      if (gstNo.length === 15) {
                                        fetchCompanyDetails(gstNo, data.key);
                                      }
                                    }}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Person Name
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Person Name"
                                    className="form-control"
                                    value={data.person_name}
                                    onChange={(e) => {
                                      form_data[data.key].person_name =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    minLength="3"
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Company Name
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Company Name"
                                    className="form-control"
                                    value={data.company_name}
                                    onChange={(e) => {
                                      form_data[data.key].company_name =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    required
                                  />
                                </div>

                                <div className="col-md-2">
                                  <label className="control-label">
                                    Email ID
                                  </label>
                                  <input
                                    type="email"
                                    placeholder="Email ID"
                                    className="form-control"
                                    onChange={(e) => {
                                      form_data[data.key].emailid =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Phone No.
                                  </label>
                                  <input
                                    type="tel"
                                    placeholder="Phone No."
                                    className="form-control"
                                    onChange={(e) => {
                                      // Extract the last 10 digits
                                      const last10Digits =
                                        e.target.value.slice(-10);

                                      // Check for alphabetic characters
                                      const hasAlphabeticChars =
                                        /[a-zA-Z]/.test(last10Digits);

                                      // Update state and show pop-up if needed
                                      if (hasAlphabeticChars) {
                                        // Show pop-up with an error message
                                        alert(
                                          "Your phone number cannot contain alphabetic characters. Please enter a valid phone number."
                                        );
                                      } else {
                                        form_data[data.key].phone_no =
                                          last10Digits;
                                        setforms([...form_data]);
                                      }
                                    }}
                                    required
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Alternate No.
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Alternate No."
                                    onChange={(e) => {
                                      form_data[data.key].alternate_no =
                                        e.target.value;
                                      setforms([...form_data]);
                                    }}
                                    maxLength="10"
                                    minLength="10"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-10 row">
                              <div className="col-md-4">
                                <label className="control-label">Address</label>
                                <input
                                  rows="5"
                                  type="text"
                                  value={data.address}
                                  onChange={(e) => {
                                    form_data[data.key].address =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  placeholder="Address"
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="control-label">State</label>
                                <Select
                                  value={statelist.find(
                                    (option) =>
                                      option.value === form_data[data.key].state
                                  )}
                                  onChange={(e) => {
                                    form_data[data.key].state = e.value;
                                    setforms([...form_data]);
                                  }}
                                  options={statelist}
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">City</label>
                                <input
                                  type="text"
                                  placeholder="City"
                                  value={data.city}
                                  onChange={(e) => {
                                    form_data[data.key].city = e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">
                                  Pin Code
                                </label>
                                <input
                                  type="number"
                                  id="pincode"
                                  placeholder="Pin Code"
                                  value={data.pincode}
                                  onChange={(e) => {
                                    form_data[data.key].pincode =
                                      e.target.value;
                                    setforms([...form_data]);
                                  }}
                                  className="form-control"
                                  required
                                  minLength="6"
                                  maxLength="6"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="control-label">Status</label>
                                <Select
                                  value={[
                                    { label: "Job Work", value: "Job Work" },
                                    { label: "Sales", value: "Sales" },
                                    { label: "Both", value: "Both" },
                                  ].find(
                                    (option) =>
                                      option.value ===
                                      form_data[data.key].status
                                  )}
                                  onChange={(selectedOption) => {
                                    form_data[data.key].status =
                                      selectedOption.value;
                                    setforms([...form_data]); // Update state to trigger re-render
                                  }}
                                  options={[
                                    { label: "Job Work", value: "Job Work" },
                                    { label: "Sales", value: "Sales" },
                                    { label: "Both", value: "Both" },
                                  ]}
                                />
                              </div>
                              {form_data[data.key].status ===
                              "Job Work" ? null : (
                                <div className="col-md-2">
                                  <label className="control-label">
                                    Sales Team
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].manager_name =
                                        e.value;
                                      setforms([...form_data]);
                                    }}
                                    options={salesteam}
                                  />
                                </div>
                              )}
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
    </div>
  );
};
