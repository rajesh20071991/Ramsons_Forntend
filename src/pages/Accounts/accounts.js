import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Amounts_Col } from "../../components/Columns/company_columns";
import { useSelector } from "react-redux";
import { GetAmountData } from "../../redux/actions/companyAction";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Checkbox from "@material-ui/core/Checkbox";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import { Link } from "react-router-dom";
import { Account_forms } from "./Form/account";
import config from "../../config";
import { FcDownload, FcEmptyFilter } from "react-icons/fc";
const Accounts_Model = () => {
  var data = useSelector((state) => state.CompanyData.amountdata);
  var modal_id = useSelector((state) => state.model.id);

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
      GetAmountData({
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

  const [date_form, setdate] = React.useState({ from: "", to: "" });
  function export_data() {
    const key = localStorage.getItem("AuthToken");
    console.log(date_form);
    let url =
      config.apiEndpoint +
      "/export_payments/?from=" +
      date_form.from +
      "&to=" +
      date_form.to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

  return (
    <div className="Company">
      <div className="table">
        <div className="border m-3 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#Interest Calculation</h4>
              <div className="ms-auto filter-component ">
                <button
                  onClick={(e) => {
                    dispatch(SetModelId(3));
                  }}>
                  <FcDownload size={30} />
                </button>
                <button
                  className="btn btn-danger add-btn"
                  onClick={(e) => {
                    dispatch(SetModelId(1));
                  }}>
                  <FcEmptyFilter size={30} />
                </button>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button">
                  Details Form
                </Link>
              </div>
              <Account_forms />
            </div>
          </div>
          {data && (
            <DataTable
              columns={Amounts_Col}
              data={data}
              selectableRowsComponent={Checkbox}
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
              onClick={handleClearFilter}>
              Clear
            </button>
            <button
              type="button"
              className="btn ms-2 btn-primary"
              onClick={() => {
                export_data();
                CloseModal();
              }}>
              Save changes
            </button>
          </div>
          {/* End  Modal Bottom */}
        </Sweet_Modal>
      )}
    </div>
  );
};

export default Accounts_Model;
