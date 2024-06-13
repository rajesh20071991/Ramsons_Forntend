import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";

export const ChallansssView_form = () => {
  let { id } = useParams();

  var [form_data, setforms] = useState([
    {
      key: 0,
      id: id,
      name_id: 0,
      stock_in: 0,
      balance: "",
    },
  ]);
  var [chalanviewlist, setchalanviewlist] = useState();

  useEffect(() => {
    api({ api: "/storeitem/challandatlist/" + id }).then((data) => {
      setchalanviewlist(data);
    });
  }, []);

  function Senddata(event) {
    event.preventDefault();
    api({
      api: "/api/chalanentity/",
      method: "post",
      body: { form: form_data, post: 7 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  console.log(form_data);
  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        name_id: 0,
        challan: 0,
        stock_in: 0,
        balance: "",
      };
      setforms([...form_data, form_body]);
    }
  }

  // remove
  function handleRemoveForm(index) {
    setforms(form_data.filter((item) => item.key !== index));
  }

  return (
    <div className="Purchase_form">
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Challan Create
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
                            <div className="col-md-10">
                              <div className="row">
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Challan No.
                                  </label>
                                  <Select
                                    onChange={(e) => {
                                      form_data[data.key].challan = e.value;
                                      form_data[data.key].balance = e.stockoit;
                                      setforms([...form_data]);
                                    }}
                                    options={chalanviewlist}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Quantity
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    onChange={(e) =>
                                      (form_data[data.key].quantity =
                                        e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="control-label">
                                    Balance
                                  </label>
                                  <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    value={form_data[data.key].balance}
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
                    );
                  })}
                <br />
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
