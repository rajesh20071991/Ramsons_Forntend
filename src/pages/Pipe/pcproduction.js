import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { First_Obser_Col } from "../../components/Columns/pipe_column";
import { useSelector } from "react-redux";
import { GetPipeData } from "../../redux/actions/pipeAction";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { ProductionForm } from "./form/production_form";

const Production_Table = () => {
  const data = useSelector((state) => state.PipeData.data);
  var modal_id = useSelector((state) => state.model.id);

  const dispatch = useDispatch();

  if (data) {
    var count = data.count;
    var data1 = data.results;
  }

  const [filtr, setFilterModal] = useState({
    name: "",
    id: "",
  });

  function Apply() {
    dispatch(GetPipeData(page, size, filtr.name, filtr.id));
    closeModal();
  }

  const [page, setPage] = React.useState(1);
  const [refreshCount, refreshPage] = React.useState(1);
  const [size, setSize] = React.useState(10);

  useEffect(() => {
    dispatch(GetPipeData(page, size, filtr.name, filtr.id));
  }, [page, size, refreshCount]);

  function handlePageChange(pg) {
    setPage(pg);
  }

  function handlePageSizeChange(sz) {
    setSize(sz);
  }

  function closeModal() {
    dispatch(SetModelId(0));
    refreshPage(refreshCount + refreshCount);
  }

  return (
    <div className="Production_Table">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣First Observation</h4>
              <div className="ms-auto filter-component d-flex">
                <button
                  className="btn btn-danger add-btn"
                  size="15px"
                  onClick={(e) => {
                    dispatch(SetModelId(1));
                  }}>
                  Filter
                </button>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button">
                  Production
                </Link>
              </div>
              <ProductionForm />
            </div>
          </div>
          {data1 && (
            <DataTable
              columns={First_Obser_Col}
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Production_Table;
