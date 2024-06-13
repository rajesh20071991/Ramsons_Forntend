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
import { FaFilePdf } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GetPlanCoilData } from "../../redux/actions/planningAction";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { SetModelId } from "../../redux/actions/modalAction";
import { api } from "../../services/api";
import { useDispatch } from "react-redux";
import Select from "react-select";
import config from "../../config";
import { Accessories_form } from "../Inward/Form/accesd_form";
import { Create_plan_form } from "./form/planning_form";
import { Link } from "react-router-dom";
import EditableCell from "../../components/Common/editablecell";
import "../../components/Common/style/button.css";
import dayjs from "dayjs";

const SelectedRowsActions = ({
  selectedRowCount,
  onSelectOptions,
  isVisible,
}) => {
  if (!isVisible) return null; // If no rows selected, don't render the component

  return (
    <div
      className="selected-rows-actions d-flex justify-content-between align-items-center"
      style={{ marginTop: 10 }}>
      <span className="selected-count">
        {selectedRowCount} {selectedRowCount === 1 ? "item" : "items"} selected
      </span>
      <button className="btn btn-secondary" onClick={onSelectOptions}>
        Process
      </button>
    </div>
  );
};

const Planning_Coil = () => {
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
      dataIndex: "coil",
      sorter: (a, b) => a.coil_no - b.coil_no,
      ellipsis: true,
      width: "7%",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Company Name",
      dataIndex: "company",
      sorter: (a, b) => a.company - b.company,
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
    },
    {
      title: "Plan No.",
      dataIndex: "plan_no",
      sorter: (a, b) => a.plan_no - b.plan_no,
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
      title: "Charges",
      dataIndex: "charges",
      sorter: (a, b) => a.charges - b.charges,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="charges"
            title="Charges"
            inputType="select"
            record={record}
            index={index}
            selectOptions={chargesSelect}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      align: "center",
      sorter: (a, b) => a.comment - b.comment,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      align: "center",
      sorter: (a, b) => a.remarks - b.remarks,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Widths",
      dataIndex: "widths",
      sorter: (a, b) => a.widths - b.widths,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      width: "10%",
      showOnDesktop: true,
      render: (text) => (
        <div style={{ width: 150, textAlign: "center" }}>{text}</div>
      ),
    },
    {
      title: "Total Widths",
      dataIndex: "total_widths",
      sorter: (a, b) => a.total_widths - b.total_widths,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
      render: (text) => <span>{Number(text).toFixed(2)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
      render: (text) => (
        <Tag color={text === "Part-1" ? "green" : "red"}>{text}</Tag>
      ),
    },
    {
      title: "Planning Status",
      dataIndex: "planning_status",
      sorter: (a, b) => a.planning_status.localeCompare(b.planning_status),
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
      render: (text) => (
        <Tag color={text === "Slitting" ? "green" : "red"}>{text}</Tag>
      ),
    },
    {
      title: "Generate PDF",
      dataIndex: "id",
      render: (id, row) => (
        <PDFButton
          key={row.id}
          id={row.id}
          selected={selectedRow === row.id}
          handleSelection={handleSelection}
        />
      ),
    },
  ];

  const PDFButton = ({ id, selected, handleSelection }) => {
    const handlePdfGeneration = () => {
      const pdfUrl = config.apiEndpoint + "/planning/generate/pdf/" + id;
      window.open(pdfUrl, "_blank");
      handleSelection(id);
    };

    return (
      <Button
        onClick={handlePdfGeneration}
        style={{ backgroundColor: selected ? "red" : "inherit" }}>
        <FaFilePdf size={30} />
      </Button>
    );
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const handleSelection = (id) => {
    setSelectedRow(id);
  };

  var plannedCoil = useSelector((state) => state.PlanningData.plan_viewcoil);

  if (plannedCoil) {
    var count = plannedCoil.count;
    var planCoil = plannedCoil.results;
  }

  const filtCols = {
    id: [],
    plan: "",
    company: "",
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
  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem("planningCoilFilter");
    return storedFilter ? JSON.parse(storedFilter) : filtCols;
  });

  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("planningCoilPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [refresh, setRef] = useState(false);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState(10);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const [isMobileView, setIsMobileView] = useState(false);
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
  useEffect(() => {
    api({ api: "/storeitem/planscoil_filter/" })
      .then((data) => {
        setcoilNo(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
    api({ api: "/storeitem/companies_filter/" })
      .then((data) => {
        setVendorNames(data);
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
      GetPlanCoilData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  useEffect(() => {
    const storedFilter = localStorage.getItem("planningCoilFilter");
    const storedPage = localStorage.getItem("planningCoilPage");
    if (storedFilter) {
      setFilter(JSON.parse(storedFilter));
    }
    if (storedPage) {
      setPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever count changes
    localStorage.setItem("counts", counts.toString());
  }, []);

  useEffect(() => {
    localStorage.setItem("planningCoilFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("planningCoilPage", page.toString());
  }, [page]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };

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

  const chargesSelect = [
    { value: "Reslit", label: "Reslit" },
    { value: "Packing Charges", label: "Packing Charges" },
    { value: "Baby Coil", label: "Baby Coil" },
    { value: "less than 3500kg", label: "less than 3500kg" },
    { value: "More than 15 Coils", label: "More than 15 Coils" },
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
    } else if (dataIndex === "planning_status") {
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
          dataIndex: column.dataIndex,
          title: column.title,
          editing: isEditing(record),
        }),
      };
    }
    if (column.dataIndex === "coil") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "planning_status") {
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
    } else if (column.dataIndex === "thickness") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "grade") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "plan_no") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);

  const handleRowSelection = (record, selected) => {
    const updatedSelectedRows = selected
      ? [...selectedRows1, record.id]
      : selectedRows1.filter((id) => id !== record.id);

    setSelectedRows1(updatedSelectedRows);
    setSelectedRowsCount(updatedSelectedRows.length);
  };

  const handleSelectOptions = () => {
    setIsModalVisible(true);
  };

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedValue(selectedOption.value);
    } else {
      setSelectedValue(null);
    }
  };

  const [showProcessButton, setShowProcessButton] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedRows1, setSelectedRows1] = useState([]);
  const [optionsed, setOptionsed] = useState([
    { value: "Slitting", label: "Slitting" },
    { value: "Hold", label: "Hold" },
    { value: "Cancel", label: "Cancel" },
    { value: "Instock", label: "Instock" },
  ]);

  const handleCreateOption = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptionsed([...optionsed, newOption]);
    setSelectedValue(newOption.value);
  };

  const handlePostData = (e) => {
    e.preventDefault();
    api({
      api: "/api/planning/",
      method: "post",
      body: { form: selectedRows1, status: selectedValue, post: 3 },
    })
      .then((response) => {
        // Assuming your API returns success message or some indicator for successful operation
        console.log("Data saved successfully!");
        message.success("Data saved successfully!");
        // Assuming you have a function to refresh table data
        setIsModalVisible(false);
        setShowProcessButton(false);
        setSelectedValue(null); // Reset selected value
        setSelectedRowsCount(0);
        CloseModal();
      })
      .catch((error) => {
        // Handle error if API call fails
        console.error("Error saving data:", error);
        message.error(
          "Error occurred while saving data. Please try again later."
        );
        // Close the modal
        setIsModalVisible(false);
      });
  };

  const updateData = (newData) => {
    setData(newData);
  };
  const save = async (key) => {
    console.log(key);
    try {
      const row = await form.validateFields();

      // Set editing key and update server data
      setEditingKey("");
      await api({
        api: "/api/planning/",
        method: "post",
        body: {
          common: row,
          status: "Coil",
          post: 1,
          id: key,
        },
      });

      // Update local state
      setData((prevData) => [...prevData, row]);
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

      // Wait for state to be updated before closing modal
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
  const [statusss, setStatusss] = useState(null);
  const handleExportClick = () => {
    setModalVisible(true);
  };

  function export_data(statusss) {
    var from = startDate.format("YYYY-MM-DD");
    var to = endDate.format("YYYY-MM-DD");
    const key = localStorage.getItem("AuthToken");
    let url = "";

    if (statusss.value === "Planning") {
      url =
        config.apiEndpoint +
        "/api/export/plancoil/?from=" +
        from +
        "&to=" +
        to +
        "&token=" +
        key;
    } else if (statusss.value === "Slitted") {
      url =
        config.apiEndpoint +
        "/api/export/slitted/?from=" +
        from +
        "&to=" +
        to +
        "&token=" +
        key;
    }

    window.open(url, "_blank");
  }

  const options = [
    { value: "Planning", label: "Planning" },
    { value: "Slitted", label: "Slitted" },
  ];

  const handleSelectAll = (selected, selectedRows, changeRows) => {
    const selectedRowKeys = selected ? selectedRows.map((row) => row.id) : [];
    setSelectedRows1(selectedRowKeys);
    setSelectedRowsCount(selected ? selectedRows.length : 0);
  };

  return (
    <div
      className="border  table_body"
      style={{ overflowX: "auto", maxWidth: "100%", width: "100%" }}>
      <div className="table-container">
        <Typography.Title style={{ color: "blue" }} level={5}>
          Planning Coil
        </Typography.Title>
        <div className="ms-auto filter-component">
          <Link
            className="btn btn-success add-btn"
            data-bs-toggle="modal"
            style={{ marginBottom: "27px" }}
            to="#exampleModalToggle"
            role="button">
            Planning
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
        <Create_plan_form />
        <Accessories_form />
        {showProcessButton && ( // Render the "Process" button only if showProcessButton is true
          <SelectedRowsActions
            selectedRowCount={selectedRowsCount}
            onSelectOptions={handleSelectOptions}
            isVisible={selectedRowsCount > 0}
          />
        )}
        <Form form={form} component={false}>
          {planCoil && (
            <div className="mobile-table-container">
              <Table
                columns={columnsWithFilter}
                dataSource={planCoil}
                rowClassName="editable-row"
                rowSelection={{
                  type: "checkbox",
                  component: Checkbox,
                  onSelect: handleRowSelection,
                  onSelectAll: handleSelectAll,
                  selectedRowKeys: selectedRows1,
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
                loading={planCoil === null}
                onChange={(pagination, filters, sorter) => {
                  setFilter(filters);
                }}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
              />
            </div>
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
        {isModalVisible && (
          <Modal
            title="Select Options"
            open={isModalVisible}
            onOk={handlePostData}
            onCancel={() => setIsModalVisible(false)}>
            <Select
              id="my-select"
              options={optionsed}
              onChange={handleChange}
              onCreateOption={handleCreateOption}
              isClearable
              isSearchable
              placeholder="Select"
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Planning_Coil;
