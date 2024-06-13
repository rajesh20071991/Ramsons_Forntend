import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Button, Pagination, Table } from "antd";
import { Link } from "react-router-dom";
import { GetGoodListData } from "../../redux/actions/challanAction";
import { Good_Col } from "../../components/Columns/chalan_column";
import { Entity_Form } from "./form/entity_form";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
const Gooddata = () => {
  const data = useSelector((state) => state.ChallanData.good_view);
  const modal_id = useSelector((state) => state.model.id);

  const [filter, setFilter] = useState({
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
  });

  const [page, setPage] = useState(1);
  const [refresh, setRef] = useState(true);
  const [size, setSize] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetGoodListData({
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
    setRef(!refresh);
  }

  const handleClearFilter = () => {
    setFilter({
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
    });
    setRef(!refresh);
    CloseModal("filter");
  };

  const { count, results: data1 } = data || {};

  return (
    <div className="purchaselist">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Goods Details</h4>
              <div className="ms-auto filter-component d-flex">
                <Button
                  className="btn btn-danger add-btn"
                  size="large"
                  onClick={() => dispatch(SetModelId(1))}>
                  Filter
                </Button>
                <div></div>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button">
                  Add Item
                </Link>
              </div>
              <Entity_Form />
            </div>
          </div>
          {data1 && (
            <Table
              columns={Good_Col}
              dataSource={data1}
              rowKey="id"
              pagination={{
                total: count,
                pageSize: size,
                current: page,
                showSizeChanger: true,
                onChange: handlePageChange,
                onShowSizeChange: handlePageSizeChange,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
              }}
              rowSelection={{
                type: "checkbox",
                component: Checkbox,
              }}
              size="small"
              bordered
              hover
              responsive
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gooddata;
