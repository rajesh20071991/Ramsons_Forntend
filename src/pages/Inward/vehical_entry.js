import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Table,
  Checkbox,
  Input,
  Button,
  Popconfirm,
  Typography,
  Form,
  Tag,
  message,
} from "antd";
import { Vh_form } from "./Form/vehicle_form";
import { GetVehicleData } from "../../redux/actions/inwardActions";
import { useDispatch } from "react-redux";
import { SetModelId } from "../../redux/actions/modalAction";
import { SearchOutlined } from "@ant-design/icons";
import { api } from "../../services/api";
import EditableCell from "../../components/Common/editablecell";
import useFilter from "../../components/Common/useFilter";

const VehicleEntry = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        const currentDate = new Date();
        const recordDate = new Date(record.created_on); // Assuming there's a 'date' property in the record object

        // Calculate the difference in days
        const diffInDays = Math.floor(
          (currentDate - recordDate) / (1000 * 60 * 60 * 24)
        );
        console.log(diffInDays);

        if (diffInDays < 3) {
          // If current date is greater than 3 days from the record date, show the edit button
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
              onClick={() => edit(record)}>
              <Tag bordered={false} color="blue">
                Edit
              </Tag>
            </Typography.Link>
          );
        } else {
          // If current date is not greater than 3 days from the record date, hide the edit button
          return null;
        }
      },
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "created_on",
      key: "created_on",
      render: (created_on) => {
        const date = new Date(created_on);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      },
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
      sortDirections: ["ascend", "descend"],
      ellipsis: true,
    },
    {
      title: "Serial Number",
      dataIndex: "serial_no",
      key: "serial_no",
      sorter: (a, b) => a.serial_no.localeCompare(b.serial_no),
      sortDirections: ["ascend", "descend"],
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Vehicle Number",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      sorter: (a, b) => a.vehicle_number.localeCompare(b.vehicle_number),
      sortDirections: ["ascend", "descend"],
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Party Name",
      dataIndex: "party_name",
      key: "party_name",
      sorter: (a, b) => a.party_name.localeCompare(b.party_name),
      sortDirections: ["ascend", "descend"],
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["ascend", "descend"],
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "No. of Coils",
      dataIndex: "no_of_coil",
      key: "no_of_coil",
      sorter: (a, b) => a.no_of_coil - b.no_of_coil,
      sortDirections: ["ascend", "descend"],
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
  ];
  var vehicleData = useSelector((state) => state.inwardData.vehicle_data);
  var count;
  if (vehicleData) {
    count = vehicleData.count;
    var vehicle_Data = vehicleData.results;
  }

  const filtCols = {
    id: [],
    code: "",
    party_name: "",
    status: "",
    customer: "",
    phone: "",
    created_on: {
      start: "",
      end: "",
    },
  }; //filter
  const { filter, setFilter, page, setPage } = useFilter("vehiclefilter");

  const [refresh, setRef] = useState(true);
  const [size, setSize] = React.useState(10);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const dispatch = useDispatch();
  const [counts, setCount] = useState(0);
  const edit = (record) => {
    form.setFieldsValue({
      party_name: "",
      status: "",
      customer: "",
      phone: "",
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };

  useEffect(() => {
    // Update local storage whenever count changes
    localStorage.setItem("counts", counts.toString());
  }, []);

  useEffect(() => {
    dispatch(
      GetVehicleData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, refresh]);

  function handlePageChange(pg) {
    setPage(pg);
  }

  const handlePageSizeChange = (current, pageSize) => {
    const totalPage = Math.ceil(count / pageSize); // Calculate the total number of pages
    const currentPage = Math.min(page, totalPage); // Get the current page, ensuring it is not greater than the total page count
    setSize(pageSize);
    setPage(currentPage); // Set the page to the current page after changing the page size
  };
  function CloseModal() {
    dispatch(SetModelId(0));
    setRef(!refresh);
  }

  const handleFilterChange = (columnKey, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [columnKey]: value,
    }));
  };

  const handleColumnFilter = (selectedKeys, confirm, dataIndex) => {
    confirm();
    if (selectedKeys.length === 0) {
      handleFilterChange(dataIndex, ""); // Set filter value to an empty string
    } else {
      handleFilterChange(dataIndex, selectedKeys[0]);
    }
  };

  const handleClearFilters = () => {
    setFilter({ ...filtCols });
    setRef((prevRef) => !prevRef);
    resetAllFilters();
    CloseModal();
  };

  const getColumnSearchProps = (dataIndex) => {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleColumnFilter(selectedKeys, confirm, dataIndex)
            }
            style={{ width: "100%", marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => handleColumnFilter(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: "40%", marginRight: 8 }}>
            Filter
          </Button>
          <Button onClick={handleClearFilters} size="small" role="button">
            <i className="fa fa-refresh me-1">Reset Filters</i>
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
    };
  };

  const columnsWithFilter = Column_Col.map((column) => {
    if (column.dataIndex && column.editable) {
      // Add a check for editable columns
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
        onCell: (record) => ({
          record,
          inputType:
            column.dataIndex === "quantity" ||
            column.dataIndex === "serial_no" ||
            column.dataIndex === "no_of_coil"
              ? "number"
              : "text",
          dataIndex: column.dataIndex,
          title: column.title,
          editing: isEditing(record),
        }),
      };
    }
    return column;
  });

  const save = async (key) => {
    console.log(key);
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      api({
        api: "/api/store_coil/",
        method: "post",
        body: {
          common: row,
          post: 4,
          id: key,
        },
      });
      console.log("Data saved successfully!");
      message.success("Data saved successfully!");
      CloseModal();
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      message.success("Validate Failed:", errInfo);
    }
  };

  const resetAllFilters = () => {
    const updatedColumns = columnsWithFilter.map((column) => {
      delete column.filteredValue; // Remove filteredValue from column
      if (column.filterDropdown) {
        column.filterDropdown.visible = false; // Hide filter dropdown if visible
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  return (
    <div
      className="border  table_body"
      style={{ overflowX: "auto", maxWidth: "100%", width: "100%" }}>
      <div className="table-container">
        <Typography.Title style={{ color: "blue" }} level={5}>
          Coil Entry
        </Typography.Title>
        <div className="ms-auto filter-component">
          <Link
            className="btn btn-success add-btn"
            style={{ textAlign: "center" }}
            data-bs-toggle="modal"
            to="#exampleModalToggle"
            role="button">
            <i className="fa fa-plus me-1">Add Item</i>
          </Link>
        </div>
        <Vh_form />
        <Form form={form} component={false}>
          {vehicle_Data && (
            <Table
              columns={columnsWithFilter}
              dataSource={vehicle_Data}
              rowClassName="editable-row"
              rowSelection={{
                type: "checkbox",
                component: Checkbox,
              }}
              pagination={{
                current: page,
                pageSize: size,
                total: count,
                onChange: handlePageChange,
                onShowSizeChange: handlePageSizeChange,
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
              }}
              rowKey={(record) => record.id}
              loading={vehicle_Data === null}
              onChange={(pagination, filters, sorter) => {
                setFilter(filters);
              }}
              size="small"
              mobileBreakPoint={768}
              bordered
              responsive={{
                xs: "stack",
                sm: "stack",
                md: "stack",
                lg: "stack",
                xl: "stack",
                xxl: "stack",
              }}
              scroll={{ x: true }}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
            />
          )}
        </Form>
      </div>
    </div>
  );
};

export default VehicleEntry;
