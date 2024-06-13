import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { api } from "../../../services/api";

export const Scrapdata_form = () => {
  var [form_data, setforms] = useState([
    {
      key: 0,
      id: 0,
      scrap: 0,
      paper: 0,
      seleeve: 0,
    },
  ]);

  var [common_data, setcommon_data] = useState({
    status: 0,
  });

  function Senddata() {
    api({
      api: "/api/coil_dispatch/",
      method: "post",
      body: {
        form: form_data,
        common: common_data,
        post: 8,
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

  console.log(form_data);
  var [vedorlistNames, setVendorlist] = useState();
  var [vedorlist, setVendor] = useState();

  useEffect(() => {
    api({ api: "/storeitem/storei/" }).then((data) => {
      setVendorlist(data);
    });
    api({ api: "/storeitem/companyfilter/" }).then((data) => {
      setVendor(data);
    });
  }, []);

  console.log(form_data);
  function handleAddForm(key) {
    if (form_data[key].unit === "") {
    } else {
      var form_body = {
        key: form_data[form_data.length - 1].key + 1,
        id: 0,
        scrap: 0,
        paper: 0,
        seleeve: 0,
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
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Scrap Create
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
                <div className="row">
                  <div className="col-md-4">
                    <label className="control-label">Company Name</label>
                    <Select
                      onChange={(e) =>
                        setcommon_data({ ...common_data, status: e.value })
                      }
                      options={vedorlist}
                    />
                    {common_data.status === 0 ? (
                      <>
                        <label className="text-danger">Required field</label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
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
                                <div className="col-md-12 row">
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Coil No.
                                    </label>
                                    <Select
                                      onChange={(e) => {
                                        form_data[data.key].id = e.value;
                                        form_data[data.key].coil = e.label;
                                        form_data[data.key].weight = e.weight;
                                        form_data[data.key].paper_weight =
                                          e.paper_weight;
                                        form_data[data.key].seleeve_weightid =
                                          e.seleeve_weight;
                                        setforms([...form_data]);
                                      }}
                                      options={vedorlistNames}
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Scrap Weight
                                    </label>
                                    <input
                                      type="number"
                                      step="0.001"
                                      value={form_data[data.key].weight}
                                      onChange={(e) => {
                                        form_data[data.key].scrap =
                                          e.target.value;
                                      }}
                                      placeholder="Scrap Weight"
                                      className="form-control"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Paper Weight
                                    </label>
                                    <input
                                      type="number"
                                      step="0.001"
                                      value={form_data[data.key].paper_weight}
                                      onChange={(e) => {
                                        form_data[data.key].paper_weight =
                                          e.target.value;
                                      }}
                                      placeholder="Scrap Weight"
                                      className="form-control"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Weight
                                    </label>
                                    <input
                                      type="number"
                                      step="0.001"
                                      onChange={(e) => {
                                        form_data[data.key].scrap =
                                          e.target.value;
                                      }}
                                      placeholder="Scrap Weight"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Paper Weight
                                    </label>
                                    <input
                                      type="number"
                                      step="0.001"
                                      placeholder="Paper Weight"
                                      onChange={(e) => {
                                        form_data[data.key].paper =
                                          e.target.value;
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="control-label">
                                      Seleeve Weight
                                    </label>
                                    <input
                                      type="number"
                                      step="0.001"
                                      onChange={(e) => {
                                        form_data[data.key].seleeve =
                                          e.target.value;
                                      }}
                                      placeholder="Seleeve Weight"
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
