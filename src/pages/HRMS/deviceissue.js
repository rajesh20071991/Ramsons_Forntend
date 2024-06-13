import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import { GetdeviceissueData } from "../../redux/actions/storeActions";
import { Link } from "react-router-dom";
import { DeviceIssue_Col } from "../../components/Columns/hrms_columns";
import { DeviceIssue_form } from "./form/deviceitem";

const DeviceIssue = () => {
  var data = useSelector((state) => state.store.deviceissue);

  if (data) {
    var count = data.count;
    var data1 = data.results;
  }

  const filtCols = {
    id: [],
    created_on: {
      start: "",
      end: "",
    },
  }; //filter

  const [filter, setFilter] = useState(filtCols); //filter

  const [page, setPage] = React.useState(1);
  const [refreshCount, refreshPage] = React.useState(1);
  const [size, setSize] = React.useState(10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetdeviceissueData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, refreshCount]);

  function handlePageChange(pg) {
    setPage(pg);
  }

  function handlePageSizeChange(sz) {
    setSize(sz);
  }

  function closeModal() {
    refreshPage(refreshCount + refreshCount);
  }

  return (
    <div className="purchaselist">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#Issue</h4>
              <div className="ms-auto filter-component d-flex">
                <button
                  className="btn btn-danger add-btn"
                  size="15px"
                  onClick={(e) => {
                    // setIsOpen2(true);
                  }}>
                  Filter
                </button>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle3"
                  role="button">
                  Issue Device
                </Link>
              </div>
              <DeviceIssue_form />
            </div>
          </div>
          {data1 && (
            <DataTable
              columns={DeviceIssue_Col}
              data={data1}
              selectableRowsComponent={Checkbox}
              dense
              pagination
              paginationServer
              style={{ backgroundColor: "lightblue" }} // add style prop
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
      </div>
    </div>
  );
};

export default DeviceIssue;
