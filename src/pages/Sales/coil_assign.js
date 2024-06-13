import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Typography, Form, Tag, message, Modal } from "antd";
import { useSelector } from "react-redux";
import { GetCoilAssignData } from "../../redux/actions/salesAction";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetModelId } from "../../redux/actions/modalAction";
import Select from "react-select";
import { api } from "../../services/api";
import EditableCell from "../../components/Common/editablecell";
import { EndPointApi } from "../../services/api";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Coil_Assign = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "operation",
      width: "7%",
      render: (_, record) => {
        const editable = record.planning_status !== "Planning";
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
      title: "Coil No",
      dataIndex: "coil",
      sorter: (a, b) => a.coil_no - b.coil_no,
      ellipsis: true,
      width: "7%",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      sorter: (a, b) => a.company_name - b.company_name,
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
    },
    {
      title: "Order",
      dataIndex: "order",
      sorter: (a, b) => a.order - b.order,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      sorter: (a, b) => a.size - b.size,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      sorter: (a, b) => a.grade - b.grade,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      sorter: (a, b) => a.thickness - b.thickness,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      align: "center",
      sorter: (a, b) => a.rate - b.rate,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Actual Weight",
      dataIndex: "actual_weight",
      sorter: (a, b) => a.actual_weight - b.actual_weight,
      ellipsis: true,
      showOnResponse: true,
      editable: true,
      showOnDesktop: true,
      render: (text) => <span>{Number(text).toFixed(2)}</span>,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "actual_weight",
        title: "actual Weight",
        editing: isEditing(record),
      }),
    },
    {
      title: "Amount",
      dataIndex: "actual_weight",
      sorter: (a, b) => a.actual_weight - b.actual_weight,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record) => (
        <span>
          {(record.actual_weight * (record.rate - record.discount)).toFixed(2)}
        </span>
      ),
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
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/order/",
      method: "post",
      body: {
        post: 17,
        id: key,
      },
    });
    setTimeout(() => {
      console.log("Data saved successfully!");
      message.success("Data saved successfully!");
      CloseModal();
    }, 1000).catch(() => {
      console.log("Validate Failed:");
      message.success("Validate Failed:");
    });
  };

  const coilAssignT = useSelector((state) => state.SalesData.coil_assign_Data);

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

  useEffect(() => {
    dispatch(GetCoilAssignData("/sales/coilassign/" + id));
  }, [refresh]);

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
      api({
        api: "/api/order/",
        method: "post",
        body: {
          common: row,
          post: 16,
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
      message.success("Validate Failed:", errInfo);
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
      setIsModalVisible(true); // Open the modal when at least one row is selected
    } else {
      setIsModalVisible(false); // Close the modal when no row is selected
    }
  }
  function handleSelectOption(option) {
    setSelectedOption(option); // Store only the selected option value in the state
  } // Store the selected option in the state

  const handlePostData = (e) => {
    e.preventDefault();
    console.log("Selected Row Data:", selectedRows);
    console.log("Selected Option:", selectedOption);
    api({
      api: "/api/order/",
      method: "post",
      body: { form: selectedRows, status: selectedOption, post: 9 },
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
        <Form form={form} component={false}>
          {coilAssignT && (
            <div className="mobile-table-container">
              <button
                type="button"
                className="btn btn-warning add-btn"
                onClick={() =>
                  openInNewTab(
                    EndPointApi + "/sales/generatecoils/pdf/" + id + "/0"
                  )
                }>
                PDF
              </button>
              <button
                type="button"
                className="btn btn-danger add-btn"
                onClick={() =>
                  openInNewTab(
                    EndPointApi + "/sales/generatecoils/pdf/" + id + "/1"
                  )
                }>
                Email
              </button>
              <br />
              <div></div>
              <Table
                columns={Column_Col}
                dataSource={coilAssignT}
                rowClassName="editable-row"
                rowSelection={{
                  type: "checkbox",
                  columnTitle: "",
                  columnWidth: "30px",
                  onChange: handleRowSelection,
                }}
                scroll={{ x: true }}
                pagination={false}
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
              />
            </div>
          )}
        </Form>
        <Modal
          title="Coil Dispatch"
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
export default Coil_Assign;
