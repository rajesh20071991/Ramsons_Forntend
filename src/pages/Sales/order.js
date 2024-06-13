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
import { GetOrderSalesData } from "../../redux/actions/salesAction";
import { Order_form } from "./Form/ordercreate";
import Select from "react-select";
const Order_JS = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
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
      dataIndex: "booking",
      key: "booking",
      sorter: (a, b) => a.booking.localeCompare(b.booking),
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Order ID",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
      render: (text, record) => {
        if (record.source === "Coil") {
          return (
            <div>
              <Link to={"/sales/coil_assign/" + record.id}>{text}</Link>
            </div>
          );
        } else if (record.source === "Pipe") {
          return (
            <div>
              <Link to={"/sales/sales_pipe/" + record.id}>{text}</Link>
            </div>
          );
        } else {
          return <span>{text}</span>;
        }
      },
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: (a, b) => a.weight.localeCompare(b.weight),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "7%",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id;

        if (record.source === "Pipe") {
          return isEditing ? (
            <EditableCell
              editing={isEditing}
              dataIndex="status"
              title="Status"
              inputType="select"
              record={record}
              index={index}
              selectOptions={Options}>
              {text}
            </EditableCell>
          ) : (
            <span>{text}</span>
          );
        }

        return <span>{text}</span>;
      },
    },
    {
      title: "Source Type",
      dataIndex: "source",
      key: "source",
      align: "center",
      sorter: (a, b) => a.source.localeCompare(b.source),
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
        let menuOptions;

        if (record.source === "Pipe") {
          menuOptions = (
            <Menu onClick={(e) => handleMenuClick(record.id, e)}>
              <Menu.Item key="pipepi">Pipe-PI</Menu.Item>
              <Menu.Item key="pipepiemail">Pipe-PI Email</Menu.Item>
              <Menu.Item key="pipepo">Pipe-PO</Menu.Item>
              <Menu.Item key="pipepoemail">Pipe-PO Email</Menu.Item>
            </Menu>
          );
        } else if (record.source === "Sheet") {
          menuOptions = (
            <Menu onClick={(e) => handleMenuClick(record.id, e)}>
              <Menu.Item key="sheetpi">Sheet-PI</Menu.Item>
              <Menu.Item key="sheetpiemail">Sheet-PI Email</Menu.Item>
              <Menu.Item key="sheetpo">Sheet-PO</Menu.Item>
              <Menu.Item key="sheetpoemail">Sheet-PO Email</Menu.Item>
            </Menu>
          );
        } else if (record.source === "Coil") {
          menuOptions = (
            <Menu onClick={(e) => handleMenuClick(record.id, e)}>
              <Menu.Item key="coilpo">Coil-PO</Menu.Item>
              <Menu.Item key="coilpoemail">Coil-PO Email</Menu.Item>
            </Menu>
          );
        } else if (
          record.source === "Scrap" ||
          record.source === "Short Length"
        ) {
          menuOptions = (
            <Menu onClick={(e) => handleMenuClick(record.id, e)}>
              <Menu.Item key="scrappi">Scrap-PI</Menu.Item>
              <Menu.Item key="scrappiemail">Scrap-PI Email</Menu.Item>
              <Menu.Item key="scrappo">Scrap-PO</Menu.Item>
              <Menu.Item key="scrappoemail">Scrap-PO Email</Menu.Item>
            </Menu>
          );
        }

        return (
          <Dropdown overlay={menuOptions} trigger={["click"]}>
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
      case "coilpo":
        endpoint = `${EndPointApi}/sales/generatepo/pdf/${id}/0`;
        break;

      case "coilpoemail":
        endpoint = `${EndPointApi}/sales/generatepo/pdf/${id}/1`;
        break;

      case "scrappi":
        endpoint = `${EndPointApi}/sales/ScrapPIInvoice/pdf/${id}/0`;
        break;

      case "scrappiemail":
        endpoint = `${EndPointApi}/sales/ScrapPIInvoice/pdf/${id}/1`;
        break;

      case "scrappo":
        endpoint = `${EndPointApi}/sales/generatepo/pdf/${id}/0`;
        break;

      case "scrappoemail":
        endpoint = `${EndPointApi}/sales/generatepo/pdf/${id}/1`;
        break;

      case "pipepi":
        endpoint = `${EndPointApi}/sales/generatepipei/pdf/${id}/0`;
        break;

      case "pipepiemail":
        endpoint = `${EndPointApi}/sales/generatepipei/pdf/${id}/1`;
        break;

      case "pipepo":
        endpoint = `${EndPointApi}/sales/generatepo/pdf/${id}/0`;
        break;

      case "pipepoemail":
        endpoint = `${EndPointApi}/sales/generatepo/pdf/${id}/1`;
        break;

      case "sheetpi":
        endpoint = `${EndPointApi}/sales/SheetPIInvoice/pdf/${id}/0`;
        break;

      case "sheetpiemail":
        endpoint = `${EndPointApi}/sales/SheetPIInvoice/pdf/${id}/1`;
        break;

      case "sheetpo":
        endpoint = `${EndPointApi}/sales/generatepo/pdf/${id}/0`;
        break;

      case "sheetpoemail":
        endpoint = `${EndPointApi}/sales/generatepo/pdf/${id}/1`;
        break;

      default:
        break;
    }
    window.open(endpoint, "_blank");
    // You can perform any action with the generated endpoint here, such as opening a new tab or sending a request.

    console.log("Endpoint:", endpoint);
  }

  const expandedColumnsScrap = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditings(record);
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
      dataIndex: "weight",
      key: "weight",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "weight",
        title: "Weight",
        editing: isEditings(record),
      }),
    },
    {
      title: "Status",
      dataIndex: "statuss",
      key: "statuss",
      ellipsis: true,
    },
    {
      title: "Actual Weight",
      dataIndex: "weights",
      key: "weights",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "weights",
        title: "Weight",
        editing: isEditings(record),
      }),
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

  const expandedColumnsCoil = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditings(record);
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
      },
      width: 100,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "size",
        title: "Size",
        editing: isEditings(record),
      }),
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      key: "thickness",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = isEditings(record); // Check if the current row is in edit mode
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
      dataIndex: "weight",
      key: "weight",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "weight",
        title: "Weight",
        editing: isEditings(record),
      }),
    },
    {
      title: "Status",
      dataIndex: "statuss",
      key: "statuss",
      ellipsis: true,
    },
    {
      title: "Actual Weight",
      dataIndex: "weights",
      key: "weights",
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

  const expandedColumnsSheet = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditings(record);
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
      },
      width: 100,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "size",
        title: "Size",
        editing: isEditings(record),
      }),
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      key: "thickness",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = isEditings(record); // Check if the current row is in edit mode
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
      dataIndex: "weight",
      key: "weight",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "weight",
        title: "Weight",
        editing: isEditings(record),
      }),
    },
    {
      title: "Coil No",
      dataIndex: "coil",
      key: "coil",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = isEditings(record); // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="coil"
            title="Coil"
            inputType="select"
            record={record}
            index={index}
            selectOptions={sheets}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Actual Weight",
      dataIndex: "weights",
      key: "weights",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "weights",
        title: "Weights",
        editing: isEditings(record),
      }),
    },
    {
      title: "Status",
      dataIndex: "statuss",
      key: "statuss",
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

  const Options = [
    { value: "P1", label: "P1" },
    { value: "P2", label: "P2" },
    { value: "P3", label: "P3" },
    { value: "P4", label: "P4" },
    { value: "P5", label: "P5" },
    { value: "P6", label: "P6" },
    { value: "P7", label: "P7" },
    { value: "P8", label: "P8" },
    { value: "P9", label: "P9" },
    { value: "P10", label: "P10" },
    { value: "P11", label: "P11" },
    { value: "P12", label: "P12" },
    { value: "P13", label: "P13" },
    { value: "P14", label: "P14" },
    { value: "P15", label: "P15" },
  ];

  const [PipeThickness, setpipethickness] = useState("");
  const [gradepipe, setgradepipe] = useState("");
  const [coils, setcoil] = useState("");
  const [sheets, setSheet] = useState("");

  useEffect(() => {
    api({ api: "/storeitem/pipegradelist/" }).then((data) => {
      setgradepipe(data);
    });
    api({ api: "/storeitem/pipethicknesslist/" }).then((data) => {
      setpipethickness(data);
    });
    api({ api: "/sales/coilassign/" }).then((data) => {
      setcoil(data);
    });
    api({ api: "/sales/sheets_Coil/" }).then((data) => {
      setSheet(data);
    });
  }, []);

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

  const getExpandedColumns = (source) => {
    if (source === "Coil") {
      return expandedColumnsCoil;
    } else if (source === "Scrap" || source === "Short Length") {
      return expandedColumnsScrap;
    } else if (source === "Sheet") {
      return expandedColumnsSheet;
    }
  };

  const [expandlerecord, setExpandedRows] = useState();

  const renderExpandedRow = (record) => {
    const columns = getExpandedColumns(record.source);
    const isCheckboxDisabled = record.expandedData.statuss === "Item Assign";
    const rowSelection = isCheckboxDisabled
      ? null
      : {
          type: "checkbox",
          columnTitle: "",
          columnWidth: "30px",
          onChange: handleRowSelection,
        };

    return (
      <Table
        columns={columns}
        dataSource={record.expandedData || []}
        pagination={false}
        size="small"
        rowKey={(book) => book.id}
        bordered
        scroll={{ x: true }}
        rowSelection={rowSelection}
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

  console.log(expandlerecord);

  const OrderDataFromSelector = useSelector((state) => state.SalesData.data);
  if (OrderDataFromSelector) {
    var count = OrderDataFromSelector.count;
    var OrderData = OrderDataFromSelector.results;
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
  const { filter, setFilter, page, setPage } = useFilter("OrderDatafilter");

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

  const cancel = () => {
    setEditingKey("");
    setEditingKeys("");
  };

  useEffect(() => {
    dispatch(
      GetOrderSalesData({
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
    } else if (column.dataIndex === "source") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "booking") {
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
        api: "/api/order/",
        method: "post",
        body: {
          common: row,
          post: 13,
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
      console.log("ddd", row);
      await api({
        api: "/api/order/",
        method: "post",
        body: {
          common: row,
          order: expandlerecord.id,
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
      message.error("Failed to save data.");
    }
  };

  const options = [
    { value: "Pipe", label: "Pipe" },
    { value: "Coil", label: "Coil" },
    { value: "other", label: "Scrap/Short length" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusss, setStatusss] = useState(null);
  const handleExportClick = () => {
    setModalVisible(true);
  };

  const handleChange = (selectedOption) => {
    setStatusss(selectedOption);
  };

  function export_data(statusss) {
    var from = startDate.format("YYYY-MM-DD");
    var to = endDate.format("YYYY-MM-DD");
    const key = localStorage.getItem("AuthToken");
    let url = "";

    if (statusss.value === "Pipe") {
      url =
        config.apiEndpoint +
        "/api/export/pipeorder/?from=" +
        from +
        "&to=" +
        to +
        "&token=" +
        key;
    } else if (statusss.value === "Coil") {
      url =
        config.apiEndpoint +
        "/api/export/coilorder/?from=" +
        from +
        "&to=" +
        to +
        "&token=" +
        key;
    } else if (statusss.value === "Other") {
      url =
        config.apiEndpoint +
        "/api/export/otherorder/?from=" +
        from +
        "&to=" +
        to +
        "&token=" +
        key;
    }

    window.open(url, "_blank");
  }
  const [planpipeWithExpandedData, setPlanpipeWithExpandedData] = useState([]);
  const updatePlanpipeWithExpandedData = () => {
    if (OrderData && Array.isArray(OrderData)) {
      const updatedPlanpipeWithExpandedData = OrderData.map((record) => ({
        ...record,
        expandedData:
          record.entity && Array.isArray(record.entity)
            ? record.entity.map((coiled) => ({
                id: coiled.id,
                weight: coiled.weight,
                rate: coiled.rate,
                discount: coiled.discount,
                grade: coiled.grade,
                amount: coiled.amount,
                bundle: coiled.bundle,
                length: coiled.length,
                pipe: coiled.no_of_pipe,
                brand: coiled.brand,
                shape: coiled.shape,
                stamp: coiled.stamp,
                status: coiled.status,
                coil: coiled.coil,
                statused: coiled.statused,
                statuss: coiled.final_status,
                stockId: coiled.stockId,
                weights: coiled.actual_weight,
                stocks: coiled.stocks,
                order_id: coiled.order_id,
                created_on: coiled.created_on,
                thickness: coiled.thickness,
                size: coiled.size,
              }))
            : [],
      }));
      setPlanpipeWithExpandedData(updatedPlanpipeWithExpandedData);
    }
  };

  useEffect(() => {
    updatePlanpipeWithExpandedData();
  }, [OrderData]);

  const handleAdd = () => {
    const currentDate = new Date();
    if (expandlerecord) {
      const index = OrderData.findIndex(
        (item) => item.id === expandlerecord.id
      );
      if (index !== -1) {
        let newBooking = {};
        if (expandlerecord.source === "Pipe") {
          newBooking = {
            stockId: "",
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
            pipe: "",
            weights: "",
            statuss: "Instock",
            bid_id: expandlerecord.id,
            created_on: currentDate.toISOString(),
          };
        } else if (expandlerecord.source === "Scrap") {
          newBooking = {
            grade: 0,
            rate: 0,
            discount: 0,
            weights: 0,
            statuss: "Instock",
            bid_id: expandlerecord.id,
            created_on: currentDate.toISOString(),
            amount: "o",
          };
        } else if (expandlerecord.source === "Short Length") {
          newBooking = {
            grade: 0,
            rate: 0,
            discount: 0,
            weights: 0,
            statuss: "Instock",
            bid_id: expandlerecord.id,
            created_on: currentDate.toISOString(),
            amount: "o",
          };
        } else if (expandlerecord.source === "Sheets") {
          newBooking = {
            size: "",
            grade: 0,
            rate: 0,
            discount: 0,
            weights: 0,
            statuss: "Instock",
            bid_id: expandlerecord.id,
            created_on: currentDate.toISOString(),
            amount: "o",
          };
        } else if (expandlerecord.source === "Coil") {
          newBooking = {
            size: "",
            grade: 0,
            rate: 0,
            discount: 0,
            weights: 0,
            statuss: "Instock",
            bid_id: expandlerecord.id,
            created_on: currentDate.toISOString(),
            amount: "o",
          };
        }

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
      }
    }
  };

  const OptionsStore = [
    { value: "Dispatch", label: "Dispatch" },
    { value: "Hold", label: "Hold" },
    { value: "Cancel", label: "Cancel" },
  ];

  const handleButtonClick = () => {
    try {
      // Send a POST request to disable the selected option
      api({
        api: "/api/order/",
        method: "post",
        body: {
          post: 14,
        },
      });
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

  const [selectedRows, setSelectedRows] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  function handleRowSelection(selectedRowKeys, selectedRows) {
    setSelectedRows(
      selectedRows.map((row) => ({ id: row.id, companyId: row.companyId }))
    );
    setSelectedOption(null);
    if (selectedRowKeys.length > 0) {
      setIsModalVisible(true); // Open the modal when at least one row is selected
    } else {
      setIsModalVisible(false); // Close the modal when no row is selected
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
      body: { form: selectedRows, status: selectedOption, post: 15 },
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

  const handlePostDatas = (e) => {
    e.preventDefault();
    console.log("Selected Row Data:", selectedRows);
    console.log("Selected Option:", selectedOption);
    api({
      api: "/api/order/",
      method: "post",
      body: {
        form: selectedRows,
        status: selectedOption,
        order: expandlerecord.id,
        post: 5,
      },
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
        <button
          onClick={handleAdd}
          className="btn btn-secondary add-btn"
          type="primary"
          style={{ marginBottom: "25px" }}>
          Add a row
        </button>
        <button
          className="btn btn-primary add-btn"
          style={{ marginBottom: "25px" }}
          onClick={handleButtonClick}>
          Refresh Priority
        </button>
        <Link
          className="btn btn-success add-btn"
          data-bs-toggle="modal"
          to="#exampleModalToggle"
          style={{ marginBottom: "30px" }}
          role="button">
          Order
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
        <Order_form />
        <Form form={form} component={false}>
          {planpipeWithExpandedData && (
            <Table
              columns={columnsWithFilter}
              dataSource={planpipeWithExpandedData}
              expandable={{
                expandedRowRender: renderExpandedRow,
                expandedRowKeys: expandlerecord ? [expandlerecord.id] : [],
                onExpand: (expanded, record) => {
                  // Check if record.source is "Pipe"
                  if (record.source === "Pipe") {
                    // Prevent expansion when record.source is "Pipe"
                    setExpandedRows(null);
                  } else {
                    // Allow expansion for other cases
                    setExpandedRows(expanded ? record : null);
                  }
                },
              }}
              rowKey={(record) => record.id}
              rowClassName="editable-row"
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
              title={() => "Sales Order"}
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
          onOk={() => export_data(statusss)}
          onCancel={() => setModalVisible(false)}>
          <div className="row">
            <div className="col-md-8">
              <DatePicker.RangePicker
                value={[startDate, endDate]}
                onChange={(dates) => {
                  setStartDate(dates[0]);
                  setEndDate(dates[1]);
                }}
              />
            </div>
            <Select
              className="col-md-4"
              value={statusss}
              onChange={handleChange}
              options={options}
            />
          </div>
        </Modal>
        {expandlerecord && expandlerecord.source === "Coil" ? (
          <Modal
            title="Coil Assign"
            open={isModalVisible}
            onOk={handlePostData}
            onCancel={() => setIsModalVisible(false)}>
            <div className="modal-content">
              <Select
                isMulti
                value={selectedOption}
                onChange={handleSelectOption}
                options={coils}
              />
            </div>
          </Modal>
        ) : (
          <Modal
            title="Pipe Assign"
            open={isModalVisible}
            onOk={handlePostDatas}
            onCancel={() => setIsModalVisible(false)}>
            <div className="modal-content">
              <Select
                value={selectedOption}
                onChange={handleSelectOption}
                options={OptionsStore}
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Order_JS;
