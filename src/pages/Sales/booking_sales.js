import React, { useEffect, useState } from "react";
import {
  Table,
  Menu,
  Input,
  Button,
  Popconfirm,
  Typography,
  Form,
  Dropdown,
  Tag,
  message,
  Modal,
  DatePicker,
} from "antd";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EndPointApi, api } from "../../services/api";
import config from "../../config";
import { SetModelId } from "../../redux/actions/modalAction";
import EditableCell from "../../components/Common/editablecell";
import useFilter from "../../components/Common/useFilter";
import dayjs from "dayjs";
import { GetBookingData } from "../../redux/actions/salesAction";
import { Booking_Form } from "../Sales/Form/booking_create";
import Select from "react-select";
const Booking_Data = () => {
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

        if (diffInDays < 10) {
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
      align: "center",
      render: (createdOn) => {
        const date = new Date(createdOn);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return formattedDate;
      },
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
    },
    {
      title: "Booking Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      width: "10%",
      sorter: (a, b) => a.company.localeCompare(b.company),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="company"
            title="Company"
            inputType="select"
            record={record}
            index={index}
            selectOptions={VendorNames}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Booking Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: (a, b) => a.weight.localeCompare(b.weight),
    },
    {
      title: "Balance Weight",
      dataIndex: "order",
      key: "order",
      sorter: (a, b) => a.order.localeCompare(b.order),
    },
    {
      title: "Booking Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount.localeCompare(b.amount),
    },
    {
      title: "Delivery Date",
      dataIndex: "estimate_delivery_date",
      key: "estimate_delivery_date",
      align: "center",
      sorter: (a, b) =>
        a.estimate_delivery_date.localeCompare(b.estimate_delivery_date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "7%",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
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
      title: "Source Type",
      dataIndex: "source_type",
      key: "source_type",
      align: "center",
      sorter: (a, b) => a.source_type.localeCompare(b.source_type),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="source_type"
            title="Source Type"
            inputType="select"
            record={record}
            index={index}
            selectOptions={source_type}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Payment Mode",
      dataIndex: "payment_mode",
      key: "payment_mode",
      align: "center",
      sorter: (a, b) => a.payment_mode.localeCompare(b.payment_mode),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="payment_mode"
            title="Payment Mode"
            inputType="select"
            record={record}
            index={index}
            selectOptions={payment_mode}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Factory Status",
      dataIndex: "factory_status",
      key: "factory_status",
      align: "center",
      sorter: (a, b) => a.factory_status.localeCompare(b.factory_status),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="factory_status"
            title="Factory Status"
            inputType="select"
            record={record}
            index={index}
            selectOptions={factory_status}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Payment Type",
      dataIndex: "order_type",
      key: "order_type",
      align: "center",
      sorter: (a, b) => a.order_type.localeCompare(b.order_type),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="order_type"
            title="Order Type"
            inputType="select"
            record={record}
            index={index}
            selectOptions={payment_type}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Remark",
      dataIndex: "remarks",
      key: "remarks",
      align: "center",
      editable: true,
      sorter: (a, b) => a.remarks.localeCompare(b.remarks),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        const menu = (
          <Menu onClick={(e) => handleMenuClick(record.id, e)}>
            <Menu.Item key="pdfView">PDF View</Menu.Item>
            <Menu.Item key="email">Email Send</Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              style={{ color: "blue" }}
              onClick={(e) => e.preventDefault()}>
              PDF Menu
            </a>
          </Dropdown>
        );
      },
    },
  ];

  function handleMenuClick(id, e) {
    const action = e.key;
    let endpoint = "";

    switch (action) {
      case "pdfView":
        endpoint = `${EndPointApi}/sales/generate/pdf/${id}/0`;
        break;
      case "email":
        endpoint = `${EndPointApi}/sales/generate/pdf/${id}/1`;
        break;
      default:
        break;
    }
    window.open(endpoint, "_blank");
    // You can perform any action with the generated endpoint here, such as opening a new tab or sending a request.

    console.log("Endpoint:", endpoint);
  }

  const expandedColumns = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditings(record);
        const currentDate = new Date();
        const recordDate = new Date(record.created_on); // Assuming there's a 'date' property in the record object

        // Calculate the difference in days
        const diffInDays = Math.floor(
          (currentDate - recordDate) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays < 10) {
          // If current date is greater than 3 days from the record date, show the edit button
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
              disabled={editingKeys !== ""}
              onClick={() => edits(record)}>
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
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = isEditings(record); // Check if the current row is in edit mode
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
        editing: isEditings(record),
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
        editing: isEditings(record),
      }),
    },
    {
      title: "Weight",
      dataIndex: "quantity",
      key: "quantity",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "quantity",
        title: "Quantity",
        editing: isEditings(record),
      }),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      ellipsis: true,
      render: (value) => parseFloat(value).toFixed(2),
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
      api: "/api/booking/",
      method: "post",
      body: {
        post: 8,
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
  const status = [
    { value: "Coil", label: "Coil" },
    { value: "Pipe", label: "Pipe" },
    { value: "Scrap", label: "Scrap" },
    { value: "Short Length", label: "Short Length" },
    { value: "Sheet", label: "Sheet" },
  ];

  const payment_mode = [
    {
      value: "To be Produced (Production Planning Needed)",
      label: "To be Produced (Production Planning Needed)",
    },
    {
      value: "Ready Stock (No Planning Needed)",
      label: "Ready Stock (No Planning Needed)",
    },
  ];

  const source_type = [
    { value: "Ramsons Stainless", label: "Ramsons Stainless" },
    { value: "Ramsons Steel", label: "Ramsons Steel" },
    { value: "N. S. Steel Industries", label: "N. S. Steel Industries" },
    { value: "Navee Steel", label: "Navee Steel" },
  ];

  const payment_type = [
    { value: "Advance Payment", label: "Advance Payment" },
    { value: "Non Advance Payment", label: "Non Advance Payment" },
  ];

  const factory_status = [
    { value: "F.O.R", label: "F.O.R" },
    { value: "Ex. Factory", label: "Ex. Factory" },
  ];
  const [expandlerecord, setexpandlerecord] = useState({});
  const expandedRowRender = (record) => {
    setexpandlerecord(record);
    return (
      <Table
        columns={expandedColumns}
        dataSource={record.expandedData || []}
        pagination={false}
        size="small"
        rowKey={(book) => book.id}
        bordered
        scroll={{ x: true }}
        rowSelection={{
          type: "checkbox",
          columnTitle: "",
          columnWidth: "30px",
        }}
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
    );
  };

  const bookingDataFromSelector = useSelector(
    (state) => state.SalesData.bo_data
  );
  if (bookingDataFromSelector) {
    var count = bookingDataFromSelector.count;
    var BookingData = bookingDataFromSelector.results;
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
  const { filter, setFilter, page, setPage } = useFilter("BookingDatafilter");

  const [refresh, setRef] = useState(false);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState(10);
  const [editingKey, setEditingKey] = useState("");
  const [editingKeys, setEditingKeys] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const isEditings = (record) => record.id === editingKeys;
  const [counts, setCount] = useState(0);
  const dispatch = useDispatch();

  const edit = (record) => {
    form.setFieldsValue({
      vehicle_no: "",
      vehicle_type: "",
      driver_name: "",
      ...record,
    });
    setEditingKey(record.id);
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

  const [VendorNames, setVendorNames] = React.useState([]);
  const [gradepipe, setgradepipe] = useState("");
  useEffect(() => {
    api({ api: "/storeitem/companyfilter/" })
      .then((data) => {
        setVendorNames(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
    api({ api: "/storeitem/pipegradelist/" })
      .then((data) => {
        setgradepipe(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
  }, []);

  const cancel = () => {
    setEditingKey("");
    setEditingKeys("");
  };

  useEffect(() => {
    dispatch(
      GetBookingData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  useEffect(() => {
    // Update local storage whenever count changes
    localStorage.setItem("counts", counts.toString());
  }, []);

  function handlePageChange(pg) {
    setPage(pg);
  }

  const handleFilterdateChange = (selectedKeys, dataIndex) => {
    const updatedFilter = {
      ...filter,
      [dataIndex]: {
        start: selectedKeys[0] || null,
        end: selectedKeys[1] || null,
      },
    };
    setFilter(updatedFilter);
  };

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
    if (dataIndex === "created_on") {
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => {
          return (
            <div style={{ padding: 8 }}>
              <DatePicker.RangePicker
                value={
                  selectedKeys.length === 2
                    ? selectedKeys
                    : [
                        filter[dataIndex]?.start
                          ? dayjs(filter[dataIndex].start, "DD-MM-YYYY")
                          : null,
                        filter[dataIndex]?.end
                          ? dayjs(filter[dataIndex].end, "DD-MM-YYYY")
                          : null,
                      ]
                }
                onChange={(dates) =>
                  handleFilterdateChange(
                    dates.map((date) =>
                      date ? date.format("DD-MM-YYYY") : null
                    ),
                    dataIndex
                  )
                }
                onOk={confirm}
                style={{ marginBottom: 8, display: "block" }}
              />
              <Button
                type="primary"
                onClick={confirm}
                size="small"
                style={{ width: "30%", marginRight: 8 }}>
                Filter
              </Button>
              <Button onClick={handleClearFilters} size="small" role="button">
                <i className="fa fa-refresh me-1">Reset Filters</i>
              </Button>
            </div>
          );
        },
        // ...
      };
    } else {
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
              onClick={() =>
                handleColumnFilter(selectedKeys, confirm, dataIndex)
              }
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
    }
  };

  const columnsWithFilter = Column_Col.map((column) => {
    if (column.dataIndex && column.editable) {
      // Add a check for editable columns
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
        onCell: (record) => ({
          record,
          dataIndex: column.dataIndex,
          title: column.title,
          editing: isEditing(record),
        }),
      };
    }
    if (column.dataIndex === "code") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "company") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "created_on") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "status") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "source_type") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

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
        api: "/api/booking/",
        method: "post",
        body: {
          common: row,
          post: 6,
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

  const updateDatas = (newItem) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = newData.findIndex((item) => newItem.key === item.key);
      if (index > -1) {
        newData.splice(index, 1, newItem);
      } else {
        newData.push(newItem);
      }
      return newData;
    });
  };

  const saves = async (key) => {
    console.log(key);
    try {
      const row = await form.validateFields();
      console.log(row);
      const newItem = {
        key: key, // Assuming the item has a 'key' property
        ...row,
      };
      updateDatas(newItem);
      setEditingKeys("");
      await api({
        api: "/api/booking/",
        method: "post",
        body: {
          common: row,
          book: expandlerecord.id,
          post: 7,
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
      message.error("Failed to save data.");
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleExportClick = () => {
    setModalVisible(true);
  };

  function export_data() {
    var from = startDate.format("YYYY-MM-DD");
    var to = endDate.format("YYYY-MM-DD");
    const key = localStorage.getItem("AuthToken");
    let url =
      config.apiEndpoint +
      "/api/export/booking/?from=" +
      from +
      "&to=" +
      to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }
  const [planpipeWithExpandedData, setPlanpipeWithExpandedData] = useState([]);
  const updatePlanpipeWithExpandedData = () => {
    if (BookingData && Array.isArray(BookingData)) {
      const updatedPlanpipeWithExpandedData = BookingData.map((record) => ({
        ...record,
        expandedData:
          record.booking && Array.isArray(record.booking)
            ? record.booking.map((coiled) => ({
                id: coiled.id,
                quantity: coiled.quantity,
                rate: coiled.rate,
                discount: coiled.discount,
                grade: coiled.grade,
                amount: coiled.amount,
                created_on: coiled.created_on,
                bid_id: coiled.bid_id,
              }))
            : [],
      }));
      setPlanpipeWithExpandedData(updatedPlanpipeWithExpandedData);
    }
  };

  useEffect(() => {
    updatePlanpipeWithExpandedData();
  }, [BookingData]);

  const handleAdd = () => {
    const currentDate = new Date();
    if (expandlerecord) {
      const index = BookingData.findIndex(
        (item) => item.id === expandlerecord.id
      );
      if (index !== -1) {
        const lastBookingId =
          BookingData[index].booking[BookingData[index].booking.length - 1].id;
        const newBooking = {
          // id: lastBookingId + 1,
          quantity: 0,
          rate: 0,
          discount: 0,
          bid_id: expandlerecord.id,
          created_on: currentDate.toISOString(),
          grade: "o",
          amount: "o",
        };

        const updatedPlanpipe = planpipeWithExpandedData.map((record) => {
          if (record.id === expandlerecord.id) {
            return {
              ...record,
              expandedData: [...record.expandedData, newBooking],
            };
          }
          return record;
        });

        setPlanpipeWithExpandedData(updatedPlanpipe);

        // Add the new row's ID to the expandedRowKeys
      }
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleRowSelection(selectedRowKeys, selectedRows) {
    setSelectedRows(selectedRows.map((row) => row.id));
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
      api: "/api/booking/",
      method: "post",
      body: { form: selectedRows, status: selectedOption.value, post: 10 },
    })
      .then(() => {
        setTimeout(() => {
          console.log("Data saved successfully!");
          message.success("Data saved successfully!");
          setIsModalVisible(false);
          CloseModal(); // Close the modal
          setRef(!refresh); // Refresh the data
          setPage(1); // Reset the page to 1
          setSize(10); // Reset the size to 10
        }, 1000);
      })
      .catch((errInfo) => {
        console.log("Validate Failed:", errInfo);
        message.success("Validate Failed:", errInfo);
      });
  };

  const statusdata = [
    { value: "Complete", label: "Complete" },
    { value: "Hold", label: "Hold" },
    { value: "Cancel", label: "Cancel" },
  ];

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
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 20 }}>
          Add a row
        </Button>
        <Link
          className="btn btn-success add-btn"
          data-bs-toggle="modal"
          to="#exampleModalToggle"
          style={{ marginBottom: "30px" }}
          role="button">
          Booking
        </Link>
        <div className="button" data-tooltip="Size: 4Mb">
          <div className="button-wrapper">
            <div className="text">Download</div>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                onClick={handleExportClick}
                viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path>
              </svg>
            </span>
          </div>
        </div>
        <Booking_Form />
        <Form form={form} component={false}>
          {planpipeWithExpandedData && (
            <Table
              columns={columnsWithFilter}
              dataSource={planpipeWithExpandedData}
              expandable={{ expandedRowRender }}
              rowKey={(record) => record.id}
              rowClassName="editable-row"
              rowSelection={{
                type: "checkbox",
                columnTitle: "",
                columnWidth: "30px",
                onChange: handleRowSelection,
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
              bordered
              loading={planpipeWithExpandedData === null}
              onChange={(pagination, filters, sorter) => {
                setFilter(filters);
              }}
              size="small"
              responsive={{
                xs: "stack",
                sm: "stack",
                md: "stack",
                lg: "stack",
                xl: "stack",
                xxl: "stack",
              }}
              scroll={{ x: true }}
              title={() => "Job Work Dispatch"}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
            />
          )}
        </Form>
        <Modal
          title="Download"
          open={modalVisible}
          onOk={export_data}
          onCancel={() => setModalVisible(false)}>
          <DatePicker.RangePicker
            value={[startDate, endDate]}
            onChange={(dates) => {
              setStartDate(dates[0]);
              setEndDate(dates[1]);
            }}
          />
        </Modal>
        <Modal
          title="Booking Complete"
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

export default Booking_Data;
