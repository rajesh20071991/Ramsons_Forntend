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
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetIssueListData } from "../../redux/actions/storeActions";
import { SetModelId } from "../../redux/actions/modalAction";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Select from "react-select";
import config from "../../config";
import { api } from "../../services/api";
import useFilter from "../../components/Common/useFilter";
import { Issue_Form } from "./form/issueForm";
import EditableCells from "../../components/Common/editablecells";

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

const Issuelist = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "operation",
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
    },
    {
      title: "Date",
      dataIndex: "created_on",
      key: "date",
      render: (created_on) => {
        const date = new Date(created_on);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return formattedDate;
      },
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
    },
    {
      title: "Item Code",
      dataIndex: "code",
      key: "itemCode",
      width: "150px",
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCells
            editing={isEditing}
            dataIndex="code"
            title="Code"
            inputType="select"
            record={record}
            index={index}
            handleSave={handleSave}
            selectOptions={itemCode}>
            {text}
          </EditableCells>
        ) : (
          <span>{text}</span>
        );
      },
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "itemName",
      width: "150px",
      sorter: (a, b) => a.item_name.localeCompare(b.item_name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      sorter: (a, b) => a.unit.unit.localeCompare(b.unit.unit),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      editable: true,
      sorter: (a, b) => a.rate - b.rate,
    },
    {
      title: "Issue Item",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Person Name",
      dataIndex: "person_name",
      key: "person_name",
      editable: true,
      sorter: (a, b) => a.person_name - b.person_name,
    },
    {
      title: "Cost Status",
      dataIndex: "status",
      key: "status",
      width: "150px",
      render: (text, record, index) => {
        const isEditing = editingKey === record.id;
        return isEditing ? (
          <EditableCells
            editing={isEditing}
            dataIndex="status"
            title="Status"
            inputType="select"
            record={record}
            index={index}
            handleSave={(value) => {
              handleSave(value, "status", record);
              setSelectedCostStatus(value); // Update selectedCostStatus when a value is selected
            }}
            selectOptions={mill_type}>
            {text}
          </EditableCells>
        ) : (
          <span>{text}</span>
        );
      },
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "Status",
      dataIndex: "final_status",
      key: "final_status",
      width: "150px",
      render: (text, record, index) => {
        const isEditing = editingKey === record.id;
        return isEditing ? (
          <EditableCells
            editing={isEditing}
            dataIndex="final_status"
            title="Status"
            inputType="select"
            record={record}
            index={index}
            handleSave={handleSave}
            selectOptions={item_type}
            parentValue={selectedCostStatus} // Pass the selectedCostStatus to filter options
          >
            {text}
          </EditableCells>
        ) : (
          <span>{text}</span>
        );
      },
      sorter: (a, b) => a.final_status.localeCompare(b.final_status),
    },
    {
      title: "Serial No.",
      dataIndex: "serno",
      key: "serno",
      editable: true,
      sorter: (a, b) => a.serno.localeCompare(b.serno),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      editable: true,
      sorter: (a, b) => a.remarks.localeCompare(b.remarks),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        record.id ? (
          record.verified === "Not Verified" ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}>
              <Tag bordered={false} color="blue">
                Delete
              </Tag>
            </Popconfirm>
          ) : (
            "-"
          )
        ) : null,
    },
  ];

  const handleDelete = (key) => {
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/issue/",
      method: "post",
      body: {
        post: 10,
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

  const mill_type = [
    { value: "Mill", label: "Mill" },
    { value: "Office", label: "Office" },
    { value: "Polish", label: "Polish" },
    { value: "Slitting", label: "Slitting" },
    { value: "Repair", label: "Repair" },
    { value: "House Hold", label: "House Hold" },
    { value: "Housekeeping", label: "Housekeeping" },
    { value: "Return of Goods", label: "Return of Goods" },
  ];

  const [selectedCostStatus, setSelectedCostStatus] = useState(null);
  const item_type = [
    { parent: "Mill", value: "Mill-1", label: "Mill-1" },
    { parent: "Mill", value: "Mill-2", label: "Mill-2" },
    { parent: "Mill", value: "Mill-3", label: "Mill-3" },
    { parent: "Mill", value: "Mill-4", label: "Mill-4" },
    { parent: "Mill", value: "Mill-5", label: "Mill-5" },
    { parent: "Mill", value: "Mill-6", label: "Mill-6" },
    { parent: "Mill", value: "Mill-7", label: "Mill-7" },
    { parent: "Mill", value: "Mill-8", label: "Mill-8" },
    { parent: "Mill", value: "Mill-9", label: "Mill-9" },
    { parent: "Mill", value: "Mill-10", label: "Mill-10" },
    { parent: "Mill", value: "Mill-11", label: "Mill-11" },
    { parent: "Mill", value: "Mill-12", label: "Mill-12" },
    { parent: "Mill", value: "Mill-13", label: "Mill-13" },
    { parent: "Mill", value: "Mill-14", label: "Mill-14" },
    { parent: "Mill", value: "Mill-15", label: "Mill-15" },
    { parent: "Mill", value: "Mill-16", label: "Mill-16" },
    { parent: "Mill", value: "Project", label: "Project" },
    { parent: "Mill", value: "Plot No. 128", label: "Plot No. 128" },
    { parent: "Mill", value: "Mill-101", label: "Mill-101" },
    { parent: "Mill", value: "Mill-102", label: "Mill-102" },
    { parent: "Mill", value: "Electrical", label: "Electrical" },
    { parent: "Mill", value: "Mechanical", label: "Mechanical" },
    { parent: "Mill", value: "Repair", label: "Repair" },
    { parent: "Office", value: "Office", label: "Office" },
    { parent: "Office", value: "Housekeeping", label: "Housekeeping" },
    { parent: "Office", value: "Fixed Cost", label: "Fixed Cost" },
    {
      parent: "Office",
      value: "Returnable Device",
      label: "Returnable Device",
    },
    { parent: "Polish", value: "Mill-1", label: "Mill-1" },
    { parent: "Polish", value: "Mill-2", label: "Mill-2" },
    { parent: "Polish", value: "Mill-3", label: "Mill-3" },
    { parent: "Polish", value: "Mill-4", label: "Mill-4" },
    { parent: "Polish", value: "Mill-5", label: "Mill-5" },
    { parent: "Polish", value: "Mill-6", label: "Mill-6" },
    { parent: "Polish", value: "Mill-7", label: "Mill-7" },
    { parent: "Polish", value: "Project", label: "Project" },
    { parent: "Polish", value: "Electrical", label: "Electrical" },
    { parent: "Polish", value: "Mechanical", label: "Mechanical" },
    { parent: "Polish", value: "Repair", label: "Repair" },
    { parent: "Slitting", value: "Slitting", label: "Slitting" },
    { parent: "Slitting", value: "Project", label: "Project" },
    { parent: "Slitting", value: "Repair", label: "Repair" },
    { parent: "Slitting", value: "Electrical", label: "Electrical" },
    { parent: "Slitting", value: "Mechanical", label: "Mechanical" },
    { parent: "House Hold", value: "House Hold", label: "House Hold" },
    { parent: "Housekeeping", value: "Housekeeping", label: "Housekeeping" },
    {
      parent: "Return of Goods",
      value: "Return to Buyer",
      label: "Return to Buyer",
    },
    {
      parent: "Return of Goods",
      value: "Job",
      label: "Job",
    },
    {
      parent: "Return of Goods",
      value: "Repair",
      label: "Repair",
    },
    {
      parent: "Maintaince",
      value: "Electrical",
      label: "Electrical",
    },
    {
      parent: "Maintaince",
      value: "Slitting",
      label: "Slitting",
    },
    { parent: "Maintaince", value: "Mechanical", label: "Mechanical" },
    { parent: "Maintaince", value: "Operational", label: "Operational" },
    { parent: "Repair", value: "Repair", label: "Repair" },
  ];

  let Issuelist = useSelector((state) => state.store.issuelist_data);

  if (Issuelist) {
    var count = Issuelist.count;
    Issuelist = Issuelist.results;
  }

  const filtCols = {
    id: [],
    person_name: "",
    phone_no: "",
    created_on: {
      start: "",
      end: "",
    },
  }; //filter

  const { filter, setFilter, page, setPage } = useFilter("Issuelistfilter");

  const [refresh, setRef] = useState(true); //refresh table data

  const [size, setSize] = React.useState(10);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const dispatch = useDispatch();

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
  };

  const [ItemdataNames, setItemdataNames] = useState([]);
  const [CodeName, setCodeNames] = useState([]);
  useEffect(() => {
    api({ api: "/storeitem/itemdata_filter/" }).then((data) => {
      setItemdataNames(data);
    });
    api({ api: "/storeitem/itemcode_filter/" }).then((data) => {
      setCodeNames(data);
    });
  }, []);

  useEffect(() => {
    dispatch(
      GetIssueListData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

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

  const handleSave = (selectedValue, dataIndex, record) => {
    console.log(selectedValue, dataIndex);
    if (dataIndex === "status") {
      const updatedItemTypes = item_type.filter(
        (item) => item.parent === selectedValue
      );
      console.log("Updated item types:", updatedItemTypes);
      // Update item_type directly
      item_type.length = 0; // Clear item_type array
      Array.prototype.push.apply(item_type, updatedItemTypes); // Push filtered items back to item_type
      console.log("item_type after update:", item_type);
      // You can perform further actions if needed
    }
  };

  var [itemCode, setSkCode] = useState([]);
  useEffect(() => {
    api({ api: "/storeitem/itemIssuelist/" }).then((data) => {
      setSkCode(data);
      var decs = [];
      data.map((item) => {
        decs.push({
          label: item.description,
          value: item.value,
          item_name: item.item_name,
          stockin: item.stockin,
          unit: item.item_unit,
          code: item.label,
          rate: item.rate,
        });
      });
    });
  }, []);

  const handleClearFilters = () => {
    setFilter({ ...filtCols });
    setRef((prevRef) => !prevRef);
    resetAllFilters();
    CloseModal();
    localStorage.removeItem("currentFilter");
  };
  const getColumnSearchProps = (dataIndex) => {
    if (dataIndex === "item_name") {
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
              options={ItemdataNames.map((vendorname) => ({
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
    } else if (dataIndex === "code") {
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
              options={CodeName.map((vendorname) => ({
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
            column.dataIndex === "rate" ||
            column.dataIndex === "quantity" ||
            column.dataIndex === "quantity"
              ? "number"
              : "text",
          dataIndex: column.dataIndex,
          title: column.title,
          editing: isEditing(record),
        }),
      };
    }
    if (column.dataIndex === "created_on") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "item_name") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "description") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "code") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
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
        api: "/api/issue/",
        method: "post",
        body: {
          common: row,
          post: 2,
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
      "/api/export/issue/?from=" +
      from +
      "&to=" +
      to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);

  const handleRowSelection = (record, selected) => {
    const updatedSelectedRows = selected
      ? [...selectedRows, record.id]
      : selectedRows.filter((id) => id !== record.id);

    setSelectedRows(updatedSelectedRows);
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [optionsed, setOptionsed] = useState([
    { value: "Verified", label: "Verified" },
    { value: "Recheck", label: "Recheck" },
  ]);

  const handleCreateOption = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptionsed([...optionsed, newOption]);
    setSelectedValue(newOption.value);
  };

  const handleModalOk = (e) => {
    e.preventDefault();
    // Get the selected row IDs
    const selectedRowIds = selectedRows;

    const remarksValue = document.getElementById("remarksInput").value;
    // Post data to the server
    api({
      api: "/api/issue/",
      method: "post",
      body: {
        post: 5,
        id: selectedRowIds,
        options: selectedValue,
        remarks: remarksValue,
      },
    })
      .then((response) => {
        // Assuming your API returns success message or some indicator for successful operation
        console.log("Data saved successfully!");
        message.success("Data saved successfully!");
        // Assuming you have a function to refresh table data
        setIsModalVisible(false);
        setShowProcessButton(false);
        setSelectedRows([]); // Reset selected rows
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

  const handleSelectAll = (selected, selectedRows, changeRows) => {
    const selectedRowKeys = selected ? selectedRows.map((row) => row.id) : [];
    setSelectedRows(selectedRowKeys);
    setSelectedRowsCount(selected ? selectedRows.length : 0);
  };

  return (
    <div className="purchaselist">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div
              className="d-flex"
              style={{
                padding: "inherit",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}>
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Issue Item List</h4>
              <div className="ms-auto filter-component d-flex">
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
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button">
                  Item Issue
                </Link>
              </div>
            </div>
            <Issue_Form />
          </div>
          {showProcessButton && ( // Render the "Process" button only if showProcessButton is true
            <SelectedRowsActions
              selectedRowCount={selectedRowsCount}
              onSelectOptions={handleSelectOptions}
              isVisible={selectedRowsCount > 0}
            />
          )}
          <Form form={form} component={false}>
            {Issuelist && (
              <Table
                columns={columnsWithFilter}
                dataSource={Issuelist}
                rowClassName="editable-row"
                rowSelection={{
                  type: "checkbox",
                  component: Checkbox,
                  onSelect: handleRowSelection,
                  onSelectAll: handleSelectAll,
                  selectedRowKeys: selectedRows,
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
                loading={Issuelist === null}
                onChange={(pagination, filters, sorter) => {
                  setFilter(filters);
                }}
                mobileBreakPoint={768}
                components={{
                  body: {
                    cell: EditableCells,
                  },
                }}
                bordered
                size="middle"
                scroll={{ x: true }}
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
          {isModalVisible && (
            <Modal
              title="Select Options"
              open={isModalVisible}
              onOk={handleModalOk}
              onCancel={() => setIsModalVisible(false)}>
              <div className="row">
                <div className="col-md-6">
                  <Select
                    id="my-select"
                    options={optionsed}
                    onChange={handleChange}
                    onCreateOption={handleCreateOption}
                    isClearable
                    isSearchable
                    placeholder="Select"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    id="remarksInput"
                    placeholder="Remarks"
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Issuelist;
