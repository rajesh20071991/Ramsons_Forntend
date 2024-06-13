import React, { useState } from "react";
import { api } from "../../../services/api";
import CreatableSelect from "react-select/creatable";
import Sweet_Modal from "../../../components/Common/react_modal";
import { SetModelId } from "../../../redux/actions/modalAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleSharp } from "react-icons/io5";

const EditRentationViewForm = (data) => {
  var modal_id = useSelector((state) => state.model.id);

  const dispatch = useDispatch();

  var [common_data, setcommon_data] = useState({
    remarks: "",
    date: "",
    status: "",
    id: data.data.id,
    modal: data.data.id + "-" + "39",
  });

  const [options, setOptions] = useState([
    { value: "Intersted", label: "Intersted" },
    { value: "Rate Issue", label: "Rate Issue" },
    { value: "Not Required", label: "Not Required" },
    { value: "Credit Issue", label: "Credit Issue" },
    { value: "Call Not Pickup", label: "Call Not Pickup" },
    { value: "Rate Given", label: "Rate Given" },
    { value: "Not Intersted", label: "Not Intersted" },
  ]);

  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedValue(selectedOption.value);
    } else {
      setSelectedValue(null);
    }
  };

  const handleCreateOption = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptions([...options, newOption]);
    setSelectedValue(newOption.value);
  };

  function updatesubmit(event) {
    event.preventDefault();
    console.log("Selected value:", selectedValue);
    api({
      api: "/api/rentation/",
      method: "post",
      body: {
        status: selectedValue,
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
        <Sweet_Modal show={true} title="Rentation" width="40%">
          <form className="p-3" onSubmit={updatesubmit}>
            <div className="row">
              <div className="col-md-4">
                <label className="control-label">Date</label>
                <input
                  type="date"
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      date: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="control-label">Status</label>
                <CreatableSelect
                  id="my-select"
                  options={options}
                  onChange={handleChange}
                  onCreateOption={handleCreateOption}
                  isClearable
                  isSearchable
                  placeholder="Select status"
                />
              </div>
              <div className="col-md-8">
                <label className="control-label">Remarks</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setcommon_data({
                      ...common_data,
                      remarks: e.target.value,
                    })
                  }
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
                value="Save"
                className="btn btn-success btn-md m-3"
              />
            </center>
          </form>
        </Sweet_Modal>
      )}
      <button onClick={() => dispatch(SetModelId(common_data.modal))}>
        <IoAddCircleSharp size={30} />
      </button>
    </>
  );
};

export default EditRentationViewForm;
