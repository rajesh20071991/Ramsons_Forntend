import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Accounts_Col } from "../../components/Columns/company_columns";
import { useSelector } from "react-redux";
import { GetAccountData } from "../../redux/actions/companyAction";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Checkbox from "@material-ui/core/Checkbox";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import { Link } from "react-router-dom";
import { DetailsFill_form } from "./form/details";

const ASummary_Data = () => {
  var data = useSelector((state) => state.CompanyData.account_data);
  var modal_id = useSelector((state) => state.model.id);

  const Type = [
    { value: "Purchase", label: "Purchase" },
    { value: "Sales", label: "Sales" },
    { value: "Store", label: "Store" },
    { value: "Job Work", label: "Job Work" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Office", label: "Office" },
  ];

  const Sub_Type = [
    { parent: "Purchase", value: "Purchase", label: "Purchase" },
    { parent: "Sales", value: "Sales", label: "Sales" },
    { parent: "Job Work", value: "Job Work", label: "Job Work" },
    { parent: "Store", value: "TubeMill", label: "TubeMill" },
    { parent: "Store", value: "Slitting", label: "Slitting" },
    { parent: "Store", value: "Polish", label: "Polish" },
    { parent: "Store", value: "Gas", label: "Gas" },
    { parent: "Maintenance", value: "TubeMill", label: "TubeMill" },
    { parent: "Maintenance", value: "Slitting", label: "Slitting" },
    { parent: "Maintenance", value: "Polish", label: "Polish" },
    { parent: "Maintenance", value: "Electricity", label: "Electricity" },
    { parent: "Office", value: "Frieght", label: "Frieght" },
    { parent: "Office", value: "Salary", label: "Salary" },
    { parent: "Office", value: "Expense", label: "Expense" },
    { parent: "Office", value: "Marketing", label: "Marketing" },
    { parent: "Office", value: "Interset", label: "Interset" },
  ];

  if (data) {
    var count = data.count;
    data = data.results;
  }

  const filtCols = {
    id: [],
    person_name: "",
    phone_no: "",
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
  const [refresh, setRef] = useState(true); //refresh table data
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetAccountData({
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

  function CloseModal() {
    dispatch(SetModelId(0));
  }

  return (
    <div className="Company">
      <div className="table">
        <div className="border m-3 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Details</h4>
              <div className="ms-auto filter-component ">
                <button
                  className="btn btn-danger add-btn"
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
                  Details Form
                </Link>
              </div>
              <DetailsFill_form />
            </div>
          </div>
          {data && (
            <DataTable
              columns={Accounts_Col}
              data={data}
              selectableRowsComponent={Checkbox}
              //dense
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
              animateRows={true}
            />
          )}
        </div>
      </div>
      {modal_id === 1 && (
        <Sweet_Modal show={true} title="Apply filter">
          <div className="row">
            <div className="col-md-6 mt-2">
              <Select
                isMulti
                options={Type}
                value={filter.type}
                onChange={(selected) => {
                  setFilter({ ...filter, type: selected });
                }}
                placeholder="Type"
              />
            </div>
            <div className="col-md-6 mt-2">
              <Select
                isMulti
                options={Sub_Type}
                value={filter.subtype}
                onChange={(selected) => {
                  setFilter({ ...filter, subtype: selected });
                }}
                placeholder="Sub Type"
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
                      created_on: { ...filter.created_on, end: e.target.value },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
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
    </div>
  );
};

export default ASummary_Data;
