import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Typography, Form, Tag, message, Modal } from "antd";
import { useSelector } from "react-redux";
import { GetPipeAssignData } from "../../redux/actions/salesAction";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetModelId } from "../../redux/actions/modalAction";
import { EndPointApi, api } from "../../services/api";
import EditableCell from "../../components/Common/editablecell";
import Select from "react-select";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Pipe_Assign = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable =
          record.final_status === "Instock" ||
          record.final_status === "Dispatch";
        const isCurrentlyEditing = editingKey === record.id;
        return editable ? (
          <span>
            {isCurrentlyEditing ? (
              <>
                <Typography.Link
                  onClick={() => save(record.id)}
                  style={{ marginRight: 8, color: "blue" }}>
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </>
            ) : (
              <Typography.Link
                style={{ color: "blue" }}
                disabled={editingKey !== ""}
                onClick={() => edit(record)}>
                <Tag bordered={false} color="blue">
                  Edit
                </Tag>
              </Typography.Link>
            )}
          </span>
        ) : (
          "-"
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stocked",
      key: "stocked",
      ellipsis: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="size"
            title="Size"
            inputType="select"
            record={record}
            index={index}
            selectOptions={SizeOptions}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      key: "thickness",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id;
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="thickness"
            title="Thickness"
            inputType="select"
            record={record}
            index={index}
            selectOptions={PipeThickness}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="grade"
            title="Grade"
            inputType="select"
            record={record}
            index={index}
            selectOptions={gradepipe}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id;
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="brand"
            title="Brand"
            inputType="select"
            record={record}
            index={index}
            selectOptions={brand}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Stamp",
      dataIndex: "stamp",
      key: "stamp",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id;
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="stamp"
            title="Stamp"
            inputType="select"
            record={record}
            index={index}
            selectOptions={stamp}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id;
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="status"
            title="Status"
            inputType="select"
            record={record}
            index={index}
            selectOptions={status}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id;
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="shape"
            title="Shape"
            inputType="select"
            record={record}
            index={index}
            selectOptions={shape}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "weight",
        title: "Weight",
        editing: isEditing(record),
      }),
    },
    {
      title: "Rate",
      dataIndex: "rate", // Assuming you want to display the rate from the first booking in each item
      key: "rate",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "rate",
        title: "Rate",
        editing: isEditing(record),
      }),
    },
    {
      title: "Length",
      dataIndex: "length", // Assuming you want to display the length from the first booking in each item
      key: "length",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "length",
        title: "Length",
        editing: isEditing(record),
      }),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "discount",
        title: "Discount",
        editing: isEditing(record),
      }),
    },
    {
      title: "Stocks",
      dataIndex: "stocks",
      key: "stocks",
      ellipsis: true,
    },
    {
      title: "Bundle",
      dataIndex: "bundle",
      key: "bundle",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "bundle",
        title: "Bundle",
        editing: isEditing(record),
      }),
    },
    {
      title: "Pipe",
      dataIndex: "no_of_pipe",
      key: "no_of_pipe",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "no_of_pipe",
        title: "Pipe",
        editing: isEditing(record),
      }),
    },
    {
      title: "Actual Weight",
      dataIndex: "actual_weight",
      key: "actual_weight",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "actual_weight",
        title: "actual Weight",
        editing: isEditing(record),
      }),
    },
    {
      title: "Status",
      dataIndex: "final_status",
      key: "final_status",
      ellipsis: true,
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

  const brand = [
    { value: "Ramsons Stainless", label: "Ramsons Stainless" },
    { value: "Duromax", label: "Duromax" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const stamp = [
    { value: "With Stamp", label: "With Stamp" },
    { value: "Without Stamp", label: "Without Stamp" },
  ];

  const status = [
    { value: "Polish", label: "Polish" },
    { value: "Non Polish", label: "Non Polish" },
    { value: "Mat Polish", label: "Mat Polish" },
  ];

  const shape = [
    { value: "Circle", label: "Circle" },
    { value: "Square", label: "Square" },
    { value: "Rectangle", label: "Rectangle" },
  ];

  const handleDelete = (key) => {
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/order/",
      method: "post",
      body: {
        post: 18,
        id: key,
      },
    })
      .then(() => {
        console.log("Data deleted successfully!");
        message.success("Data deleted successfully!");
        CloseModal();
      })
      .catch((error) => {
        console.log("Error while deleting data:", error);
        message.error("Failed to delete data.");
      });
  };

  const coilAssignT = useSelector((state) => state.SalesData.Pipeassign);

  let { id } = useParams();
  const dispatch = useDispatch();
  const [refresh, setRef] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const edit = (record) => {
    form.setFieldsValue({
      coil_no: "",
      company: "",
      grade: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const [SizeOptions, setSizeOptions] = useState("");
  const [PipeThickness, setpipethickness] = useState("");
  const [gradepipe, setgradepipe] = useState("");

  useEffect(() => {
    api({ api: "/storeitem/sizelist/" }).then((data) => {
      setSizeOptions(data);
    });
    api({ api: "/storeitem/pipegradelist/" }).then((data) => {
      setgradepipe(data);
    });
    api({ api: "/storeitem/pipethicknesslist/" }).then((data) => {
      setpipethickness(data);
    });
  }, []);

  useEffect(() => {
    dispatch(GetPipeAssignData("/sales/pipeEassign/" + id));
  }, [refresh, id, dispatch]);

  function CloseModal() {
    dispatch(SetModelId(0));
    setRef(!refresh);
  }

  const updateData = (newData) => {
    setData(newData);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      updateData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((item) => key === item.id);
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
      api({
        api: "/api/order/",
        method: "post",
        body: {
          common: row,
          order: id,
          post: 8,
          id: key,
        },
      })
        .then(() => {
          console.log("Data saved successfully!");
          message.success("Data saved successfully!");
          CloseModal();
          // window.location.reload();
        })
        .catch((error) => {
          console.log("Validate Failed:", error);
          message.error("Validate Failed:", error);
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      message.error("Failed to save data.");
    }
  };

  const statusdata = [
    { value: "Dispatch", label: "Dispatch" },
    { value: "Hold", label: "Hold" },
    { value: "Cancel", label: "Cancel" },
    { value: "Instock", label: "Instock" },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleRowSelection(selectedRowKeys, selectedRows) {
    setSelectedRows(
      selectedRows.map((row) => ({
        id: row.id,
        companyId: row.companyId,
        weight: row.actual_weight,
      }))
    );
    setSelectedOption(null);

    if (selectedRowKeys.length > 0) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }

  function handleSelectOption(option) {
    setSelectedOption(option);
  }

  const handlePostData = (e) => {
    e.preventDefault();
    console.log("Selected Row Data:", selectedRows);
    console.log("Selected Option:", selectedOption);
    api({
      api: "/api/order/",
      method: "post",
      body: { form: selectedRows, order: id, status: selectedOption, post: 5 },
    })
      .then(() => {
        setTimeout(() => {
          console.log("Data saved successfully!");
          message.success("Data saved successfully!");
          setIsModalVisible(false);
          CloseModal();
        }, 1000);
      })
      .catch((errInfo) => {
        console.log("Validate Failed:", errInfo);
        message.success("Validate Failed:", errInfo);
      });
  };

  const [modifiedData, setModifiedData] = useState([]);

  const handleAdd = (record) => {
    const currentDate = new Date();
    const newBooking = {
      id: "",
      stocked: "",
      size: "",
      thickness: "",
      grade: "",
      brand: "",
      stamp: "",
      status: "",
      shape: "",
      weight: 0,
      rate: 0,
      discount: 0,
      length: 20,
      stocks: "",
      bundle: "",
      no_of_pipe: "",
      actual_weight: "",
      final_status: "Instock",
      bid_id: record.id,
      created_on: currentDate.toISOString(),
    };
    const updatedData = [...coilAssignT, newBooking];
    setModifiedData(updatedData);
  };

  return (
    <div
      className="border  table_body"
      style={{
        overflowX: "auto",
        maxWidth: "100%",
        width: "100%",
        marginTop: "150px",
      }}>
      <div className="table-container">
        <button
          onClick={handleAdd}
          className="btn btn-secondary add-btn"
          type="primary"
          style={{ marginBottom: "25px" }}>
          Add a row
        </button>
        <Form form={form} component={false}>
          {coilAssignT && (
            <div className="mobile-table-container">
              <Table
                columns={Column_Col}
                dataSource={
                  modifiedData.length > 0 ? modifiedData : coilAssignT
                }
                rowClassName="editable-row"
                rowSelection={{
                  type: "checkbox",
                  columnTitle: "",
                  columnWidth: "30px",
                  onChange: handleRowSelection,
                }}
                scroll={{ x: true }}
                rowKey={(record) => record.id}
                loading={coilAssignT === null}
                size="small"
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                responsive={{
                  xs: "stack",
                  sm: "stack",
                  md: "stack",
                  lg: "stack",
                  xl: "stack",
                  xxl: "stack",
                }}
                pagination={false}
              />
            </div>
          )}
        </Form>
        <Modal
          title="Pipe Dispatch"
          open={isModalVisible}
          onOk={handlePostData}
          onCancel={() => setIsModalVisible(false)}>
          <div className="modal-content">
            <Select
              value={selectedOption}
              onChange={handleSelectOption}
              options={statusdata}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Pipe_Assign;
