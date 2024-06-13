import React, { useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { ModalCustomStyles } from "../../../assets/commonstyle";

export const PipeProcessView = (data) => {
  const [modalIsOpen, SetIsOpen] = useState(false);

  var [common_data, setcommon_data] = useState({
    id: data.data.id,
    status: data.data.ostatus,
    stamp: data.data.ostamp,
    stat: data.data.status,
    brand: data.data.obrand,
    thickness: data.data.othickness,
    size: data.data.osize,
    length: data.data.olength,
    grade: data.data.ograde,
    stock: data.data.stock,
    weight: data.data.weight,
    bundle: data.data.bundle,
    pipe: data.data.no_of_pipe,
  });

  function Senddata(e) {
    e.preventDefault();
    api({
      api: "/api/pipeorder/",
      method: "post",
      body: { common: common_data, post: 2 },
    })
      .then(() => {
        toast("Success", { autoClose: 2000 });
        window.location.reload();
      })
      .catch(() => {
        toast("failed", { autoClose: 2000 });
      });
  }

  function closeModal() {
    SetIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={ModalCustomStyles}
      >
        <form className="p-3" onSubmit={Senddata}>
          <div className="row">
            <div className="col-md-2">Size:-</div>
            <div className="col-md-2">{data.data.osize}</div>
            <div className="col-md-2">Thickness:-</div>
            <div className="col-md-2">{data.data.othickness}</div>
            <div className="col-md-2">Grade:-</div>
            <div className="col-md-2">{data.data.ograde}</div>
          </div>
          <div className="row">
            <div className="col-md-2">Stamp:-</div>
            <div className="col-md-4">{data.data.ostamp}</div>
            <div className="col-md-2">Status:-</div>
            <div className="col-md-2">{data.data.ostatus}</div>
            <div className="col-md-2">Shape:-</div>
            <div className="col-md-2">{data.data.oshape}</div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4">
              <label className="control-label">Bundle</label>
              <input
                type="number"
                className="form-control"
                value={common_data.bundle}
                onChange={(e) =>
                  setcommon_data({
                    ...common_data,
                    bundle: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="control-label">No of Pipe</label>
              <input
                type="number"
                className="form-control"
                value={common_data.pipe}
                onChange={(e) =>
                  setcommon_data({
                    ...common_data,
                    pipe: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="control-label">Weight</label>
              <input
                type="number"
                step="any"
                className="form-control"
                value={common_data.weight}
                onChange={(e) =>
                  setcommon_data({
                    ...common_data,
                    weight: e.target.value,
                  })
                }
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
      </Modal>
      <button
        className="btn btn-warning btn-sm"
        onClick={() => SetIsOpen(true)}
      >
        Submit
      </button>
    </>
  );
};
