import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Button } from "antd";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import Select from "react-select";
import { GetSouceListData } from "../../redux/actions/challanAction";
import { Source_Col } from "../../components/Columns/chalan_column";
import { Source_Form } from "./form/source_form";
import { Table } from "antd";

const Source_type = () => {
  var data = useSelector((state) => state.ChallanData.source_view);
  var modal_id = useSelector((state) => state.model.id);

  if (data) {
    var count = data.count;
    var data1 = data.results;
  }

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

  const [page, setPage] = React.useState(1);
  const [refresh, setRef] = useState(true);
  const [size, setSize] = React.useState(10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetSouceListData({
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
    setRef(refresh + refresh);
  }

  return (
    <div className="purchaselist">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Company List</h4>
              <div className="ms-auto filter-component d-flex">
                <Button
                  className="btn btn-danger add-btn"
                  size="large"
                  onClick={(e) => {
                    dispatch(SetModelId(1));
                  }}>
                  Filter
                </Button>
                <br />
                <Link
                  className="btn btn-success add-btn"
                  size="large"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button">
                  Add Item
                </Link>
              </div>
              <Source_Form />
            </div>
          </div>
          {data1 && (
            <Table
              columns={Source_Col}
              dataSource={data1}
              rowSelection={{
                type: "checkbox",
                ...Checkbox,
              }}
              bordered
              size="small"
              scroll={{ x: "max-content" }}
              pagination={{
                total: count,
                pageSize: size,
                showSizeChanger: true,
                pageSizeOptions: [
                  "10",
                  "15",
                  "20",
                  "25",
                  "30",
                  "50",
                  "70",
                  "100",
                ],
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page) => handlePageChange(page), // handle page change
                onShowSizeChange: (current, newSize) =>
                  handlePageSizeChange(newSize), // handle size change
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Source_type;
