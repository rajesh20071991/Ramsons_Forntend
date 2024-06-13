import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetVendorviewData } from "../../redux/actions/storeActions";

const Company_view = () => {
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
      title: "PO No.",
      dataIndex: "pocode",
      key: "pocode",
      align: "center",
      sorter: (a, b) => a.pocode.localeCompare(b.pocode),
    },
    {
      title: "Item Code",
      dataIndex: "itemid",
      key: "itemid",
      sorter: (a, b) => a.itemid.localeCompare(b.itemid),
    },
    {
      title: "Item Name",
      dataIndex: "itemname",
      key: "itemname",
      sorter: (a, b) => a.itemname.localeCompare(b.itemname),
    },
    {
      title: "Description",
      dataIndex: "itemdesc",
      key: "itemdesc",
      sorter: (a, b) => a.itemdesc.localeCompare(b.itemdesc),
    },
    {
      title: "Unit",
      dataIndex: "itemunit",
      key: "itemunit",
      sorter: (a, b) => a.itemunit.localeCompare(b.itemunit),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Unit",
      dataIndex: "itemunit",
      key: "item_unit",
      sorter: (a, b) => a.itemunit.localeCompare(b.itemunit),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      sorter: (a, b) => a.rate - b.rate,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => record.rate * record.quantity,
      sorter: (a, b) => a.rate * a.quantity - b.rate * b.quantity,
    },
    {
      title: "GST %",
      dataIndex: "gst",
      key: "gst",
      sorter: (a, b) => a.gst - b.gst,
    },
  ];

  const data = useSelector((state) => state.store.vendor_view);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(GetVendorviewData("/api/vendorlist/" + id + "/"));
  }, [dispatch, id]);

  return (
    <div className="view">
      <div className="table">
        <div className="border m-2">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Purchase View</h4>
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

export default Company_view;
