import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Typography, Form, Tag, message, Modal } from "antd";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../../services/api";
import Select from "react-select";
import {
  GetChalansviewData,
  GetChalanviewData,
} from "../../redux/actions/challanAction";
import { ChallanView_form } from "./form/chalanview_form";
import { ChallansssView_form } from "./form/chalanss_form";
import { SetModelId } from "../../redux/actions/modalAction";
import EditableCell from "../../components/Common/editablecell";
import { align } from "@progress/kendo-drawing";

const ChalanViewData = () => {
  const challanlist = useSelector((state) => state.ChallanData.chalandata_view);
  const challanentity = useSelector(
    (state) => state.ChallanData.chalanslist_view
  );

  const ChalandataView_Col = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => saves(record.id)}
              style={{
                marginRight: 8,
              }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            style={{ color: "blue" }}
            disabled={editingKey !== ""}
            onClick={() => edit(record)}>
            <Tag bordered={false} color="blue">
              Edit
            </Tag>
          </Typography.Link>
        );
      },
      width: 100,
    },
    {
      title: "Challan No.",
      dataIndex: "code",
      key: "code",
      wrap: true,
    },
    {
      title: "Description of Goods",
      dataIndex: "description",
      key: "description",
      sorter: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="description"
            title="Description of Goods"
            inputType="select"
            record={record}
            index={index}
            selectOptions={descriptions}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "HSN Code",
      dataIndex: "hsncodes",
      key: "hsncodes",
      sorter: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "hsncodes",
        title: "HSN Code",
        editing: isEditing(record),
      }),
    },
    {
      title: "Unit",
      dataIndex: "units",
      key: "units",
      sorter: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "quantity",
        title: "Quantity",
        editing: isEditing(record),
      }),
    },
    {
      title: "Rate Per Kg.",
      dataIndex: "rate",
      key: "rate",
      sorter: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "rate",
        title: "Rate Per Kg.",
        editing: isEditing(record),
      }),
    },
    {
      title: "Job Work Charges",
      dataIndex: "job_charges",
      key: "job_charges",
      sorter: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "job_charges",
        title: "Job Work Charges",
        editing: isEditing(record),
      }),
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (_, row) => {
        const totalAmount = (Number(row.rate) * Number(row.quantity)).toFixed(
          2
        );
        return totalAmount;
      },
      sorter: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        record.id ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}>
            <Tag bordered={false} color="blue">
              Delete
            </Tag>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key) => {
    api({
      api: "/api/chalanentity/",
      method: "post",
      body: {
        post: 4,
        id: key,
      },
    })
      .then(() => {
        console.log("Data saved successfully!");
        message.success("Data saved successfully!");
        CloseModal();
      })
      .catch((error) => {
        console.log("An error occurred:", error);
        message.error("An error occurred while deleting the record.");
      });
  };

  const ChalansdataView_Col = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditings(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            style={{ color: "blue" }}
            disabled={editingKey !== ""}
            onClick={() => edits(record)}>
            <Tag bordered={false} color="blue">
              Edit
            </Tag>
          </Typography.Link>
        );
      },
      width: 100,
    },
    {
      title: "Challan No.",
      dataIndex: "chalans",
      key: "chalans",
      align: "center",
      render: (text, record, index) => {
        const isEditing = isEditings(record); // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="chalans"
            style={{ align: "center", width: "200px", display: "block" }}
            title="Challan No."
            inputType="select"
            record={record}
            index={index}
            selectOptions={chalanviewlist}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "stock_in",
      key: "stock_in",
      sorter: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "stock_in",
        title: "Qunatity",
        editing: isEditings(record),
      }),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      sorter: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        record.id ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeletes(record.id)}>
            <Tag bordered={false} color="blue">
              Delete
            </Tag>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDeletes = (key) => {
    console.log("Deleting record with key:", key);
    api({
      api: "/api/chalanentity/",
      method: "post",
      body: {
        post: 5,
        id: key,
      },
    })
      .then(() => {
        console.log("Data saved successfully!");
        message.success("Data saved successfully!");
        CloseModal();
      })
      .catch((error) => {
        console.log("An error occurred:", error);
        message.error("An error occurred while deleting the record.");
      });
  };

  const dispatch = useDispatch();
  const [refresh, setRef] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [editingKeys, setEditingKeys] = useState("");
  const [data, setData] = useState([]);
  const isEditing = (record) => record.id === editingKey;
  const isEditings = (record) => record.id === editingKeys;
  let { id } = useParams();

  const edit = (record) => {
    form.setFieldsValue({
      phone_no: "",
      address: "",
      city: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
    setEditingKeys("");
  };

  const edits = (record) => {
    form.setFieldsValue({
      vehicle_no: "",
      vehicle_type: "",
      driver_name: "",
      ...record,
    });
    setEditingKeys(record.id);
  };

  useEffect(() => {
    dispatch(GetChalanviewData("/api/chalanentity/" + id + "/?data=entities"));
    dispatch(GetChalansviewData("/api/chalanentity/" + id + "/?data=entity"));
  }, [dispatch, id, refresh]);

  const [descriptions, setDesc] = React.useState([]);
  var [chalanviewlist, setchalanviewlist] = useState();
  useEffect(() => {
    api({ api: "/storeitem/namelist/" })
      .then((data) => {
        setDesc(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
    api({ api: "/storeitem/challandatalists/" + id }).then((data) => {
      setchalanviewlist(data);
    });
  }, []);

  function CloseModal() {
    dispatch(SetModelId(0));
    setRef(!refresh);
  }

  const updateData = (newData) => {
    setData(newData);
  };

  const save = async (key) => {
    try {
      // assuming you have form and api functions defined
      const row = await form.validateFields();
      updateData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
        } else {
          newData.push(row);
        }
        return newData;
      });

      setEditingKey("");
      await api({
        api: "/api/chalanentity/",
        method: "post",
        body: {
          common: row,
          post: 8,
          status: "entities",
          id: key,
        },
      });

      setData((prevData) => [...prevData, row]);
      setTimeout(() => {
        console.log("Data saved successfully!");
        message.success("Data saved successfully!");
        CloseModal();
      }, 1000);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      message.error("Validate Failed:", errInfo);
    }
  };

  const saves = async (key) => {
    try {
      // assuming you have form and api functions defined
      const row = await form.validateFields();
      updateData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
        } else {
          newData.push(row);
        }
        return newData;
      });

      setEditingKey("");
      await api({
        api: "/api/chalanentity/",
        method: "post",
        body: {
          common: row,
          status: "entity",
          post: 8,
          id: key,
        },
      });

      setData((prevData) => [...prevData, row]);
      setTimeout(() => {
        console.log("Data saved successfully!");
        message.success("Data saved successfully!");
        CloseModal();
      }, 1000);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      message.error("Validate Failed:", errInfo);
    }
  };

  return (
    <div className="ChalanViewData">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Chalan View</h4>
              <div className="ms-auto filter-component d-flex">
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button">
                  Add Item
                </Link>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle2"
                  role="button">
                  Chalan Add
                </Link>
              </div>
              <ChallanView_form />
              <ChallansssView_form />
            </div>
          </div>
          <div className="first-table-container">
            <Form form={form} component={false}>
              {challanlist && (
                <Table
                  tableTitle="Good Details"
                  columns={ChalandataView_Col}
                  dataSource={challanlist}
                  pagination={false}
                  bordered
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  size="small"
                />
              )}
            </Form>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="second-table-container">
            <Form form={form} component={false}>
              {challanentity && (
                <Table
                  tableTitle="Chalan Exit Details"
                  columns={ChalansdataView_Col}
                  dataSource={challanentity}
                  pagination={false}
                  bordered
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  size="small"
                />
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChalanViewData;
