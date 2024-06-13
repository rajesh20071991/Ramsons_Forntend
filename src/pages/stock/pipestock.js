import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { GetPipeStockData } from "../../redux/actions/dispatchAction";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Checkbox from "@material-ui/core/Checkbox";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import { Pipe_Stock_Col } from "../../components/Columns/stock";
import { PipeStock_form } from "./form/pipe_form";
import { Link } from "react-router-dom";
import {
  gradeListType,
  sizeListType,
  thicknessPipeListType,
} from "../../services/constant";
import { Upload_Stock_form } from "./form/upload";
import config from "../../config";

const Pipe_Stock = () => {
  const data = useSelector((state) => state.DispatchData.pipestock);
  var modal_id = useSelector((state) => state.model.id);

  const dispatch = useDispatch();

  if (data) {
    var count = data.count;
    var data1 = data.results;
  }

  const status = [
    { value: "Regular", label: "Regular" },
    { value: "On Order", label: "On Order" },
  ];

  const Color = [
    { value: "Red", label: "Red" },
    { value: "Grey", label: "Grey" },
    { value: "White", label: "White" },
    { value: "Yellow", label: "Yellow" },
    { value: "Voilet", label: "Voilet" },
  ];

  const filtCols = {
    id: [],
    coil_no: "",
    company_id__id: "",
    chalan_width: "",
    status: "",
    job_type: "",
    grade: "",
    thickness: "",
    created_on: {
      start: "",
      end: "",
    },
  }; //filter
  const [filter, setFilter] = useState(filtCols); //filter

  function handleClearFilter() {
    setFilter(filtCols);
    setRef(!refresh);
    CloseModal("filter");
  }

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
        fontSize: "14px",
        fontWeight: "bold",
        paddingLeft: "0 8px",
        overflowwrap: "breakword",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingLeft: "0 8px",
        overflowwrap: "breakword",
      },
    },
  };

  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);
  const [refresh, setRef] = useState(true);

  useEffect(() => {
    dispatch(
      GetPipeStockData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, refresh]);

  function handlePageChange(pg) {
    setPage(pg);
  }

  function handlePageSizeChange(sz) {
    setSize(sz);
  }

  const [date_form, setdate] = React.useState({ from: "", to: "" });

  function export_data() {
    const key = localStorage.getItem("AuthToken");
    console.log(date_form);
    let url = config.apiEndpoint + "export-to-excel/";
    // "pdf" +
    // "&to=" +
    // date_form.to +
    // "&token=" +
    // key;
    window.open(url, "_blank");
  }

  function CloseModal() {
    dispatch(SetModelId(0));
  }

  return (
    <div className="Pipe_Stock">
      <div className="table">
        <div className="border m-2 table_body table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Ramsons Pipe Stock</h4>
              <div className="ms-auto filter-component d-flex">
                <button
                  className="btn btn-danger add-btn"
                  onClick={(e) => {
                    dispatch(SetModelId(3));
                  }}
                >
                  Export
                </button>
                <br />
                <button
                  className="btn btn-danger add-btn"
                  size="15px"
                  onClick={(e) => {
                    dispatch(SetModelId(1));
                  }}
                >
                  Filter
                </button>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button"
                >
                  Size ADD
                </Link>
                <br />
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle1"
                  role="button"
                >
                  Upload Stock
                </Link>
              </div>
              <PipeStock_form />
              <Upload_Stock_form />
            </div>
          </div>
          {data1 && (
            <DataTable
              columns={Pipe_Stock_Col}
              customStyles={customStyles}
              data={data1}
              selectableRowsComponent={Checkbox}
              dense
              pagination
              paginationServer
              onChangePage={handlePageChange}
              paginationTotalRows={count}
              paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 70, 100]}
              onChangeRowsPerPage={handlePageSizeChange}
              pointerOnHover
              selectableRows
              striped={true}
              persistTableHead
              responsive={true}
            />
          )}
        </div>
        {modal_id === 1 && (
          <Sweet_Modal show={true} title="Apply filter">
            <div className="row">
              {/* filter fields  */}
              <div className="col-md-6 mt-2">
                <Select
                  isMulti
                  options={sizeListType}
                  value={filter.size}
                  onChange={(selected) => {
                    setFilter({ ...filter, size: selected });
                  }}
                  placeholder="Size"
                />
              </div>
              <div className="col-md-6 mt-2">
                <Select
                  isMulti
                  options={thicknessPipeListType}
                  value={filter.thickness}
                  onChange={(selected) => {
                    setFilter({
                      ...filter,
                      thickness: selected,
                    });
                  }}
                  placeholder="Thickness"
                />
              </div>
              <div className="col-md-6 mt-2">
                <Select
                  isMulti
                  options={gradeListType}
                  value={filter.grade}
                  onChange={(selected) => {
                    setFilter({
                      ...filter,
                      grade: selected,
                    });
                  }}
                  placeholder="Grade"
                />
              </div>
              <div className="col-md-6 mt-2">
                <Select
                  isMulti
                  options={status}
                  value={filter.status}
                  onChange={(selected) => {
                    setFilter({
                      ...filter,
                      status: selected,
                    });
                  }}
                  placeholder="Status"
                />
              </div>
              <div className="col-md-6 mt-2">
                <Select
                  isMulti
                  options={Color}
                  value={filter.color}
                  onChange={(selected) => {
                    setFilter({
                      ...filter,
                      color: selected,
                    });
                  }}
                  placeholder="Colour"
                />
              </div>
              <div className="col-md-6 mt-2">
                <input
                  type="text"
                  value={filter.width}
                  placeholder="Width"
                  className="form-control"
                  onChange={(e) => {
                    setFilter({ ...filter, width: e.target.value });
                    setRef(!refresh);
                  }}
                />
              </div>
              <div className="col-md-12 mt-2">
                {/*filter for Date */}
                <div className="d-flex">
                  <input
                    type="date"
                    value={filter.created_on.start}
                    className="form-control"
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        created_on: {
                          ...filter.created_on,
                          start: e.target.value,
                        },
                      });
                    }}
                  />
                  <b className="mt-1 ms-1 me-1">to</b>
                  <input
                    type="date"
                    value={filter.created_on.end}
                    className="form-control"
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        created_on: {
                          ...filter.created_on,
                          end: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                {/*End filter for Date */}
              </div>
              {/* End filter fields  */}
            </div>
            <hr />
            {/* Modal Bottom */}
            <div className="text-center">
              <button
                type="button"
                className="btn ms-2 btn-warning"
                onClick={handleClearFilter}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn ms-2 btn-primary"
                onClick={() => {
                  setRef(!refresh);
                  CloseModal();
                }}
              >
                Save changes
              </button>
            </div>
            {/* End  Modal Bottom */}
          </Sweet_Modal>
        )}
        {modal_id === 3 && (
          <Sweet_Modal show={true} title="Apply filter">
            <div className="row">
              {/* filter fields  */}
              <div className="col-md-12 mt-2">
                {/*filter for Date */}
                <div className="d-flex">
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                      setdate({
                        ...date_form,
                        from: e.target.value,
                      });
                    }}
                  />
                  <b className="mt-1 ms-1 me-1">to</b>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                      setdate({
                        ...date_form,
                        to: e.target.value,
                      });
                    }}
                  />
                </div>
                {/*End filter for Date */}
              </div>
              {/* End filter fields  */}
            </div>
            <hr />
            {/* Modal Bottom */}
            <div className="text-center">
              <button
                type="button"
                className="btn ms-2 btn-warning"
                onClick={handleClearFilter}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn ms-2 btn-primary"
                onClick={() => {
                  export_data();
                  CloseModal();
                }}
              >
                Save changes
              </button>
            </div>
            {/* End  Modal Bottom */}
          </Sweet_Modal>
        )}
      </div>
    </div>
  );
};

export default Pipe_Stock;
