import React, { useState } from "react";
import { api } from "../../../services/api";
import Select from "react-select";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const EditOrderViewForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);

  const dispatch = useDispatch();

  let { type, id } = useParams();

  const brand = [
    { value: "Ramsons Stainless", label: "Ramsons Stainless" },
    { value: "Duromax", label: "Duromax" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const stamp = [
    { value: "With Stamp", label: "With Stamp" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const status = [
    { value: "Polish", label: "Polish" },
    { value: "Non Polish", label: "Non Polish" },
    { value: "Mat Polish", label: "Mat Polish" },
  ];

  const shape = [
    { value: "Circle", label: "Circle" },
    { value: "Square", label: "Square" },
    { value: "Rectangle", label: "Rectangle" },
  ];

  var [common_data, setcommon_data] = useState({
    size: data.data.size,
    thickness: data.data.thickness,
    grade: data.data.grade,
    weight: data.data.weight,
    discount: data.data.discount,
    rate: data.data.rate,
    stamp: data.data.stamp,
    status: data.data.status,
    shape: data.data.shape,
    brand: data.data.brand,
    length: data.data.length,
    id: data.data.id,
    modal: data.data.id + "-" + data.data.size,
  });

  const [GradeOptions, setGradeOptions] = useState("");
  const [SizeOptions, setSizeOptions] = useState("");
  const [Thicknessoptions, setThicknessOptions] = useState("");
  const [PipeThickness, setpipethickness] = useState("");
  const [gradepipe, setgradepipe] = useState("");

  useEffect(() => {
    api({ api: "/storeitem/gradelist/" }).then((data) => {
      setGradeOptions(data);
    });
    api({ api: "/storeitem/thicknesslist/" }).then((data) => {
      setThicknessOptions(data);
    });
    api({ api: "/storeitem/sizelist/" }).then((data) => {
      setSizeOptions(data);
    });
    api({ api: "/storeitem/pipegradelist/" }).then((data) => {
      setgradepipe(data);
    });
    api({ api: "/storeitem/pipethicknesslist/" }).then((data) => {
      setpipethickness(data);
    });
  }, []);

  function updatesubmit(event) {
    event.preventDefault();
    api({
      api: "/api/order/",
      method: "post",
      body: {
        common: common_data,
        post: 8,
        type: type,
        ids: id,
        status: data.data.final_status,
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

  return (
    <>
      {modal_id === common_data.modal && (
        <Sweet_Modal show={true} title="Edit Pipe Stock">
          <form className="p-3" onSubmit={updatesubmit}>
            <div className="col">
              {type === "Coil" && (
                <div className="row p-4 border border-dark m-2">
                  <div className="col-md-4">
                    <label className="control-label">Size</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          size: e.target.value,
                        })
                      }
                      value={common_data.size}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Thickness</label>
                    <Select
                      value={{
                        label: common_data.thickness,
                        value: common_data.thickness,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, thickness: e.value });
                      }}
                      options={Thicknessoptions}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Grade</label>
                    <Select
                      value={{
                        label: common_data.grade,
                        value: common_data.grade,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, grade: e.value });
                      }}
                      options={GradeOptions}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Weight</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          weight: e.target.value,
                        })
                      }
                      value={common_data.weight}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Rate</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          rate: e.target.value,
                        })
                      }
                      value={common_data.rate}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Discount</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          discount: e.target.value,
                        })
                      }
                      value={common_data.discount}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              )}

              {type === "Sheet" && (
                <div className="row p-4 border border-dark m-2">
                  <div className="col-md-4">
                    <label className="control-label">Size</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          size: e.target.value,
                        })
                      }
                      value={common_data.size}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Thickness</label>
                    <Select
                      value={{
                        label: common_data.thickness,
                        value: common_data.thickness,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, thickness: e.value });
                      }}
                      options={Thicknessoptions}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Grade</label>
                    <Select
                      value={{
                        label: common_data.grade,
                        value: common_data.grade,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, grade: e.value });
                      }}
                      options={GradeOptions}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Weight</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          weight: e.target.value,
                        })
                      }
                      value={common_data.weight}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Rate</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          rate: e.target.value,
                        })
                      }
                      value={common_data.rate}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="control-label">Discount</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          discount: e.target.value,
                        })
                      }
                      value={common_data.discount}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              )}

              {/* pipe Planning */}
              {type === "Pipe" && (
                <div className="row p-3 border border-dark m-1">
                  <div className="col-md-6">
                    <label className="control-label">Size</label>
                    <Select
                      value={{
                        label: common_data.size,
                        value: common_data.size,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, size: e.value });
                      }}
                      options={SizeOptions}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Thickness</label>
                    <Select
                      value={{
                        label: common_data.thickness,
                        value: common_data.thickness,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, thickness: e.value });
                      }}
                      options={PipeThickness}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Grade</label>
                    <Select
                      value={{
                        label: common_data.grade,
                        value: common_data.grade,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, grade: e.value });
                      }}
                      options={gradepipe}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Stamp</label>
                    <Select
                      value={{
                        label: common_data.stamp,
                        value: common_data.stamp,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, stamp: e.value });
                      }}
                      options={stamp}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Status</label>
                    <Select
                      value={{
                        label: common_data.status,
                        value: common_data.status,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, status: e.value });
                      }}
                      options={status}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Shape</label>
                    <Select
                      value={{
                        label: common_data.shape,
                        value: common_data.shape,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, shape: e.value });
                      }}
                      options={shape}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Brand</label>
                    <Select
                      value={{
                        label: common_data.brand,
                        value: common_data.brand,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, brand: e.value });
                      }}
                      options={brand}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Weight</label>
                    <input
                      type="number"
                      step="0.001"
                      className="form-control"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          weight: e.target.value,
                        })
                      }
                      value={common_data.weight}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Rate</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          rate: e.target.value,
                        })
                      }
                      value={common_data.rate}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Discount</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          discount: e.target.value,
                        })
                      }
                      value={common_data.discount}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              )}
              {/* scrap Planning */}
              {type === "Scrap" && (
                <div className="row p-3 border border-dark m-1">
                  <div className="col-md-6">
                    <label className="control-label">Grade</label>
                    <Select
                      value={{
                        label: common_data.grade,
                        value: common_data.grade,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, grade: e.value });
                      }}
                      options={gradepipe}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Weight</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          weight: e.target.value,
                        })
                      }
                      value={common_data.weight}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Rate</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          rate: e.target.value,
                        })
                      }
                      value={common_data.rate}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Discount</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          discount: e.target.value,
                        })
                      }
                      value={common_data.discount}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              )}
              {/* scrap Planning */}
              {type === "Short Length" && (
                <div className="row p-3 border border-dark m-1">
                  <div className="col-md-6">
                    <label className="control-label">Grade</label>
                    <Select
                      value={{
                        label: common_data.grade,
                        value: common_data.grade,
                      }}
                      onChange={(e) => {
                        setcommon_data({ ...common_data, grade: e.value });
                      }}
                      options={gradepipe}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Weight</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          weight: e.target.value,
                        })
                      }
                      value={common_data.weight}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Rate</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          rate: e.target.value,
                        })
                      }
                      value={common_data.rate}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Discount</label>
                    <input
                      type="number"
                      step="0.001"
                      onChange={(e) =>
                        setcommon_data({
                          ...common_data,
                          discount: e.target.value,
                        })
                      }
                      value={common_data.discount}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
            <br />
            <center>
              <input
                id="submit"
                type="submit"
                value="Save"
                className="btn btn-success btn-md m-3"
              />
            </center>
          </form>
        </Sweet_Modal>
      )}
      <button
        className="btn btn-warning btn-sm"
        onClick={() => dispatch(SetModelId(common_data.modal))}>
        Edit
      </button>
    </>
  );
};

export default EditOrderViewForm;
