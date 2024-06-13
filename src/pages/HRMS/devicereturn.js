import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import { GetdevicereturnData } from "../../redux/actions/storeActions";
import { Link } from "react-router-dom";
import { DeviceReturn_Col } from "../../components/Columns/hrms_columns";
import { DeviceRetrun_form } from "./form/deviceitem";

const DeviceReturn = () => {
  var data = useSelector((state) => state.store.devicereturn);

  if (data) {
    var count = data.count;
    var data1 = data.results;
  }
  console.log(data1);
  const [filtr, setFilterModal] = useState({
    name: "",
    id: "",
  });

  function Apply() {
    dispatch(GetdevicereturnData(page, size, filtr.name, filtr.id));
    closeModal();
  }

  const [page, setPage] = React.useState(1);
  const [refreshCount, refreshPage] = React.useState(1);
  const [size, setSize] = React.useState(10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetdevicereturnData(page, size, filtr.name, filtr.id));
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
              <h4 className="filterPageTitle mt-2">#️⃣Return</h4>
              <div className="ms-auto filter-component d-flex">
                <button
                  className="btn btn-danger add-btn"
                  size="15px"
                  onClick={(e) => {
                    // setIsOpen2(true);
                  }}
                >
                  Filter
                </button>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle3"
                  role="button"
                >
                  Return Device
                </Link>
              </div>
              <DeviceRetrun_form />
            </div>
          </div>
          {data1 && (
            <DataTable
              columns={DeviceReturn_Col}
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
      </div>
    </div>
  );
};

export default DeviceReturn;
