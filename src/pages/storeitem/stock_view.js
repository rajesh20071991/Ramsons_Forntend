import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetstoreviewData } from "../../redux/actions/storeActions";

const StockList_view = () => {
  const Column_Col = [
    {
      title: "Date",
      dataIndex: "created_on",
      key: "date",
      render: (created_on) => {
        const date = new Date(created_on);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
    },
    {
      title: "Vendor Name",
      dataIndex: "company",
      key: "company",
      align: "center",
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
      sorter: (a, b) => a.item_code.localeCompare(b.item_code),
    },
    {
      title: "Item Name",
      dataIndex: "item_names",
      key: "item_names",
      sorter: (a, b) => a.item_names.localeCompare(b.item_names),
    },
    {
      title: "Description",
      dataIndex: "item_description",
      key: "item_description",
      sorter: (a, b) => a.item_description.localeCompare(b.item_description),
    },
    {
      title: "Unit",
      dataIndex: "item_unit",
      key: "item_unit",
      sorter: (a, b) => a.item_unit.localeCompare(b.item_unit),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Issue",
      dataIndex: "stock_out",
      key: "stock_out",
      sorter: (a, b) => a.stock_out - b.stock_out,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
  ];

  const data = useSelector((state) => state.store.storeview_data);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(GetstoreviewData("/storeitem/storeitem/" + id));
  }, [dispatch, id]);

  return (
    <div className="view">
      <div className="table">
        <div className="border m-2">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Stock In Item</h4>
              <div className="ms-auto filter-component d-flex">
                {/* Add Item button or any other actions */}
              </div>
            </div>
          </div>
          {data && (
            <Table
              columns={Column_Col}
              dataSource={data}
              rowSelection={{
                type: "checkbox",
              }}
              rowKey={(record) => record.id}
              pagination={false}
              bordered
              size="middle"
              sticky
              scroll={{ x: true }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StockList_view;
