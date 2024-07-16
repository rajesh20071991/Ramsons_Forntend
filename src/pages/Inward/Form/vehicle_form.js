import React from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export const Vh_form = () => {
  function Senddata(e) {
    e.preventDefault();
    var Body = {
      date: e.target.date.value,
      serial_no: e.target.serial_no.value,
      vehicle_number: e.target.vehicle_number.value,
      party_name: e.target.party_name.value,
      quantity: e.target.quantity.value,
      no_of_coil: e.target.no_of_coil.value,
    };
    api({ api: "/api/store/", method: "post", body: Body })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }
  return (
    <div className="vh-form">
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
                Vehicle Entry
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form onSubmit={Senddata}>
                <div className="row">
                  <div className="col-md-2">
                    <label className="control-label">Date</label>
                    <input
                      type="date"
                      id="date"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-1">
                    <label className="control-label">Serial No.</label>
                    <input
                      rows="5"
                      id="serial_no"
                      placeholder="Serial Number"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Vehicle No.</label>
                    <input
                      rows="5"
                      id="vehicle_number"
                      placeholder="Vehicle No."
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">Party Name</label>
                    <input
                      rows="5"
                      id="party_name"
                      placeholder="Party Name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      step="any"
                      placeholder="Quantity"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="control-label">No. of Coils</label>
                    <input
                      type="number"
                      id="no_of_coil"
                      placeholder="No. of Coils"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <br />
                <center>
                  <input
                    id="submit"
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
