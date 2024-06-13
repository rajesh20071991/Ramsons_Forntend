import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../services/api";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { Accoun_Col } from "../../components/Columns/company_columns";

function ASummary() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(yesterday);
  var modal_id = useSelector((state) => state.model.id);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(startDate);
    const start_date = startDate.toISOString().slice(0, 10);
    const end_date = endDate.toISOString().slice(0, 10);
    api({
      api: `/asummary-data/?start_date=${start_date}&end_date=${end_date}`,
    }).then((data) => {
      setData(data);
      CloseModal();
    });
  };

  useEffect(() => {
    const start_date = startDate.toISOString().slice(0, 10);
    const end_date = endDate.toISOString().slice(0, 10);
    api({
      api: `/asummary-data/?start_date=${start_date}&end_date=${end_date}`,
    }).then((data) => {
      setData(data);
    });
  }, [startDate, endDate]);

  const customStyles = {
    title: {
      style: {
        fontColor: "red",
        fontWeight: "900",
      },
    },
    rows: {
      style: {
        minHeight: "50px", // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: "25px",
        fontWeight: "bold",
        paddingLeft: "0 8px",
        overflowwrap: "breakword",
      },
    },
    cells: {
      style: {
        fontSize: "18px",
        paddingLeft: "0 8px",
        overflowwrap: "breakword",
      },
    },
  };

  function CloseModal() {
    dispatch(SetModelId(0));
  }

  console.log(data);
  return (
    <div className="purchaselist">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Summary</h4>
              <div className="ms-auto filter-component d-flex">
                <button
                  className="btn btn-danger add-btn"
                  onClick={(e) => {
                    dispatch(SetModelId(3));
                  }}
                >
                  Select Date
                </button>
              </div>
            </div>
          </div>
          <div></div>
          {data && (
            <DataTable
              columns={Accoun_Col}
              title
              data={data}
              customStyles={customStyles}
              pointerOnHover
              selectableRows
              striped={true}
              persistTableHead
              responsive={true}
            />
          )}
        </div>
        {modal_id === 3 && (
          <Sweet_Modal show={true} title="Select Date">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <label>Start Date:</label>
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="col-md-6">
                  <label>End Date:</label>
                  <DatePicker
                    className="form-control"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
              <hr />
              <div className="text-center">
                <button type="submit" className="btn btn-success btn-md m-3">
                  Submit
                </button>
              </div>
            </form>
            {/* End  Modal Bottom */}
          </Sweet_Modal>
        )}
      </div>
    </div>
  );
}

export default ASummary;
