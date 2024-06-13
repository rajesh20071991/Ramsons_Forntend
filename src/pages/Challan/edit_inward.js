import React, { useEffect, useState } from "react";
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
  Modal,
  DatePicker,
} from "antd";
import { GetInwardCoilData } from "../../redux/actions/inwardActions";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import Select from "react-select";
import { SetModelId } from "../../redux/actions/modalAction";
import { Link } from "react-router-dom";
import { InwardCoil_Form } from "../Inward/Form/coilinwardform";
import { Accessories_form } from "../Inward/Form/accesd_form";
import EditableCell from "../../components/Common/editablecell";
import "../../components/Common/style/button.css";
import dayjs from "dayjs";
import config from "../../config";
import { api } from "../../services/api";
import useFilter from "../../components/Common/useFilter";

const EditInwardCoil = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = record.status !== "Dispatch";
        const isCurrentlyEditing = editingKey === record.id;
        return editable ? (
          <span>
            {isCurrentlyEditing ? (
              <>
                <Typography.Link
                  onClick={() => save(record.id)}
                  style={{ marginRight: 8 }}>
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
      title: "Date",
      dataIndex: "created_on",
      render: (date) => {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
        var yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        return today;
      },
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Coil No",
      dataIndex: "coil_no",
      sorter: (a, b) => a.coil_no.localeCompare(b.coil_no),
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Company Name",
      dataIndex: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
      showOnResponse: true,
      showOnDesktop: true,
      width: "12%",
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="company"
            title="Company Name"
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
      title: "Challan No",
      dataIndex: "challan_no",
      sorter: (a, b) => a.challan_no.localeCompare(b.challan_no),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Origin Coil No.",
      dataIndex: "origin_coil_no",
      sorter: (a, b) => a.origin_coil_no.localeCompare(b.origin_coil_no),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Entity Brand",
      dataIndex: "entity_brand",
      sorter: (a, b) => a.entity_brand.localeCompare(b.entity_brand),
      ellipsis: true,
      width: "7%",
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="entity_brand"
            title="Job Type"
            inputType="select"
            record={record}
            index={index}
            selectOptions={entity_brand}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
      sorter: (a, b) => a.job_type.localeCompare(b.job_type),
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="job_type"
            title="Job Type"
            inputType="select"
            record={record}
            index={index}
            selectOptions={job_type}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Chalan Weight",
      dataIndex: "chalan_weight",
      sorter: (a, b) => a.chalan_weight - b.chalan_weight,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Chalan Width",
      dataIndex: "chalan_width",
      align: "center",
      sorter: (a, b) => a.chalan_width - b.chalan_width,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      sorter: (a, b) => a.grade.localeCompare(b.grade),
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
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
            selectOptions={GradeOptions}>
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
      sorter: (a, b) => a.thickness.localeCompare(b.thickness),
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="thickness"
            title="Thickness"
            inputType="select"
            record={record}
            index={index}
            selectOptions={Thicknessoptions}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      sorter: (a, b) => a.actual_weight - b.actual_weight,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Actual Weight",
      dataIndex: "actual_weight",
      sorter: (a, b) => a.actual_weight - b.actual_weight,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Actual Width",
      dataIndex: "actual_width",
      sorter: (a, b) => a.actual_width - b.actual_width,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
      render: (text) => (
        <Tag color={text === "Instock" ? "green" : "red"}>{text}</Tag>
      ),
    },
  ];
  var mothercoil = useSelector((state) => state.inwardData.mother_coil_data);

  if (mothercoil) {
    var count = mothercoil.count;
    var motherData = mothercoil.results;
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
  const { filter, setFilter, page, setPage } = useFilter("editMotherfilter");
  const [refresh, setRef] = useState(true);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState(10);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const [counts, setCount] = useState(0);
  const dispatch = useDispatch();

  const edit = (record) => {
    form.setFieldsValue({
      coil_no: "",
      company: "",
      grade: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const [coilNo, setcoilNo] = React.useState([]);
  const [VendorNames, setVendorNames] = React.useState([]);
  const [GradeOptions, setGradeOptions] = useState("");
  const [Thicknessoptions, setThicknessOptions] = useState("");
  useEffect(() => {
    api({ api: "/storeitem/coil_filter/" })
      .then((data) => {
        setcoilNo(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
    api({ api: "/storeitem/companyfilter/" })
      .then((data) => {
        setVendorNames(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
    api({ api: "/storeitem/gradelist/" })
      .then((data) => {
        setGradeOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
    api({ api: "/storeitem/thicknesslist/" })
      .then((data) => {
        setThicknessOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
  }, []);

  const cancel = () => {
    setEditingKey("");
  };

  useEffect(() => {
    dispatch(
      GetInwardCoilData({
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

  const options_value = [
    { value: "Instock", label: "Instock" },
    { value: "Planning", label: "Planning" },
    { value: "Test Certificate", label: "Test Certificate" },
    { value: "Tubemill", label: "Tubemill" },
    { value: "Polish", label: "Polish" },
    { value: "Non Polish", label: "Non Polish" },
    { value: "Polished", label: "Polished" },
    { value: "Slitting", label: "Slitting" },
    { value: "Dispatch", label: "Dispatch" },
    { value: "Dispatched", label: "Dispatched" },
  ];

  const entity_brand = [
    { value: "JSL", label: "JSL" },
    { value: "Chromnie", label: "Chromnie" },
    { value: "Other", label: "Other" },
  ];

  const job_type = [
    { value: "Job Work", label: "Job Work" },
    { value: "Production", label: "Production" },
  ];

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
    if (dataIndex === "company") {
      return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <Select
              isClearable
              style={{ width: "100%", marginBottom: 8, display: "block" }}
              value={
                selectedKeys[0]
                  ? { label: selectedKeys[0], value: selectedKeys[0] }
                  : null
              }
              onChange={(selectedOption) => {
                const value = selectedOption ? selectedOption.value : null;
                setSelectedKeys(value ? [value] : []);
                confirm();
                const updatedFilter = { ...filter, [dataIndex]: value };
                localStorage.setItem(
                  "currentFilter",
                  JSON.stringify(updatedFilter)
                );
                setFilter(updatedFilter);
              }}
              options={VendorNames.map((vendorname) => ({
                label: vendorname.label,
                value: vendorname.label,
              }))}
              menuPosition="fixed"
            />
            <br />
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
              <i className="fa fa-refresh me-1">Reset</i>
            </Button>
          </div>
        ),
        filterIcon: (filtered) => (
          <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
      };
    } else if (dataIndex === "created_on") {
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
    } else if (dataIndex === "coil_no") {
      return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <Select
              isClearable
              style={{ width: "100%", marginBottom: 8, display: "block" }}
              value={
                selectedKeys[0]
                  ? { label: selectedKeys[0], value: selectedKeys[0] }
                  : null
              }
              onChange={(selectedOption) => {
                const value = selectedOption ? selectedOption.value : null;
                setSelectedKeys(value ? [value] : []);
                confirm();
                const updatedFilter = { ...filter, [dataIndex]: value };
                localStorage.setItem(
                  "currentFilter",
                  JSON.stringify(updatedFilter)
                );
                setFilter(updatedFilter);
              }}
              options={coilNo.map((coil) => ({
                label: coil.label,
                value: coil.label,
              }))}
              menuPosition="fixed"
            />
            <br />
            <Button
              type="primary"
              onClick={() =>
                handleColumnFilter(selectedKeys, confirm, dataIndex)
              }
              size="small"
              style={{ width: "30%", marginRight: 8 }}>
              Filter
            </Button>
            <Button onClick={handleClearFilters} size="small" role="button">
              <i className="fa fa-refresh me-1">Reset</i>
            </Button>
          </div>
        ),
        filterIcon: (filtered) => (
          <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
      };
    } else if (dataIndex === "status") {
      return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <Select
              isClearable
              style={{ width: "100%", marginBottom: 8, display: "block" }}
              value={
                selectedKeys[0]
                  ? { label: selectedKeys[0], value: selectedKeys[0] }
                  : null
              }
              onChange={(selectedOption) => {
                const value = selectedOption ? selectedOption.value : null;
                setSelectedKeys(value ? [value] : []);
                confirm();
                const updatedFilter = { ...filter, [dataIndex]: value };
                localStorage.setItem(
                  "currentFilter",
                  JSON.stringify(updatedFilter)
                );
                setFilter(updatedFilter);
              }}
              options={options_value.map((status) => ({
                label: status.label,
                value: status.label,
              }))}
              menuPosition="fixed"
            />
            <br />
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
              <i className="fa fa-refresh me-1">Reset</i>
            </Button>
          </div>
        ),
        filterIcon: (filtered) => (
          <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
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
          inputType:
            column.dataIndex === "actual_weight" ||
            column.dataIndex === "actual_width" ||
            column.dataIndex === "chalan_width" ||
            column.dataIndex === "chalan_weight"
              ? "number"
              : "text",
          dataIndex: column.dataIndex,
          title: column.title,
          editing: isEditing(record),
        }),
      };
    }
    if (column.dataIndex === "coil_no") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "status") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "created_on") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "company") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "entity_brand") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "job_type") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

  const save = async (key) => {
    console.log("ddd", key);
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
      const apiData = {
        common: row,
        post: 6,
        id: key,
      };
      if (apiData.common.hasOwnProperty("company_0")) {
        apiData.common.company = apiData.common.company_0;
        delete apiData.common.company_0;
      }
      console.log(row);
      api({
        api: "/api/store_coil/",
        method: "post",
        body: {
          common: row,
          status: "Coil",
          post: 3,
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
      "/api/export/mothercoil/?from=" +
      from +
      "&to=" +
      to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

  return (
    <div
      className="border  table_body"
      style={{ overflowX: "auto", maxWidth: "100%", width: "100%" }}>
      <div className="table-container">
        <Typography.Title style={{ color: "blue" }} level={5}>
          Edit Inward Coil
        </Typography.Title>
        <div className="ms-auto filter-component">
          <Link
            className="btn btn-success add-btn"
            data-bs-toggle="modal"
            style={{ marginBottom: "27px" }}
            to="#exampleModalToggle"
            role="button">
            Inward
          </Link>
          <Link
            className="btn btn-success add-btn"
            data-bs-toggle="modal"
            style={{ marginBottom: "27px" }}
            to="#exampleModalToggle1"
            role="button">
            Item Add
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
        </div>
        <InwardCoil_Form />
        <Accessories_form />
        <Form form={form} component={false}>
          {motherData && (
            <Table
              columns={columnsWithFilter}
              dataSource={motherData}
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
              size="small"
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
              loading={motherData === null}
              onChange={(pagination, filters, sorter) => {
                setFilter(filters);
              }}
              mobileBreakPoint={768}
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
      </div>
    </div>
  );
};

export default EditInwardCoil;
