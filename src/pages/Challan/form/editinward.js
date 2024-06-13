import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  gradeListType,
  thicknessCoilListType,
} from "../../../services/constant";
import { api } from "../../../services/api";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";

const EditInwardViewForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);
  const dispatch = useDispatch();
  var [common_data, setcommon_data] = useState({
    company_id: data.data.company_id.id,
    name: data.data.company_id.company_name,
    origin_coil_no: data.data.origin_coil_no,
    job_type: data.data.job_type,
    entity_brand: data.data.entity_brand,
    chalan_weight: data.data.chalan_weight,
    chalan_width: data.data.chalan_width,
    actual_weight: data.data.actual_weight,
    actual_width: data.data.actual_width,
    challan_no: data.data.challan_no,
    grade: data.data.grade,
    thickness: data.data.thickness,
    id: data.data.id,
    modal: data.data.id + "-" + data.data.company_id.company_name,
  });

  const job_type1 = [
    { value: "Job Work", label: "Job Work" },
    { value: "Production", label: "Production" },
  ];

  const entity_brand1 = [
    { value: "JSL", label: "JSL" },
    { value: "Chromnie", label: "Chromnie" },
    { value: "Other", label: "Other" },
  ];

  const [companydata, setcompany] = useState("");
  const [GradeOptions, setGradeOptions] = useState("");
  const [Thicknessoptions, setThicknessOptions] = useState("");

  useEffect(() => {
    api({ api: "/storeitem/companyfilter/" }).then((data) => {
      setcompany(data);
    });
    api({ api: "/storeitem/gradelist/" }).then((data) => {
      setGradeOptions(data);
    });
    api({ api: "/storeitem/thicknesslist/" }).then((data) => {
      setThicknessOptions(data);
    });
  }, []);

  function updatesubmit(event) {
    event.preventDefault();
    api({
      api: "/api/source/",
      method: "post",
      body: {
        common: common_data,
        post: 3,
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
        <Sweet_Modal show={true} title="Edit Company">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <label className="control-label">Company Name</label>
                <Select
                  value={{
                    label: common_data.name,
                    value: common_data.company_id,
                  }}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      company_id: e.value,
                      name: e.label,
                    })
                  }
                  options={companydata}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Origin Coil No.</label>
                <input
                  type="text"
                  value={common_data.origin_coil_no}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      origin_coil_no: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Challan No.</label>
                <input
                  value={common_data.challan_no}
                  onChange={(e) => {
                    common_data.challan_no = e.target.value;
                    setcommon_data({ ...common_data });
                  }}
                  placeholder="Challan No"
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Job Type</label>
                <Select
                  value={{
                    label: common_data.job_type,
                    value: common_data.job_type,
                  }}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      job_type: e.value,
                    })
                  }
                  options={job_type1}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Entity Type</label>
                <Select
                  value={{
                    label: common_data.entity_brand,
                    value: common_data.entity_brand,
                  }}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      entity_brand: e.value,
                    })
                  }
                  options={entity_brand1}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">challan_weight</label>
                <input
                  type="number"
                  value={common_data.chalan_weight}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      chalan_weight: e.target.value,
                    })
                  }
                  placeholder="Challan No"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Challan Width</label>
                <input
                  type="number"
                  value={common_data.chalan_width}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      chalan_width: e.target.value,
                    })
                  }
                  placeholder="Challan No"
                  className="form-control"
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
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      grade: e.value,
                      grade: e.label,
                    })
                  }
                  options={GradeOptions}
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
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      thickness: e.value,
                      thickness: e.label,
                    })
                  }
                  options={Thicknessoptions}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Actual Width</label>
                <input
                  type="number"
                  value={common_data.actual_width}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      actual_width: e.target.value,
                    })
                  }
                  placeholder="Challan No"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Actual Weight</label>
                <input
                  type="number"
                  value={common_data.actual_weight}
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      actual_weight: e.target.value,
                    })
                  }
                  placeholder="Challan No"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <br />
            <center>
              <button
                className="btn btn-primary btn-sm m-1"
                onClick={updatesubmit}>
                Save
              </button>
            </center>
          </div>
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

export default EditInwardViewForm;
