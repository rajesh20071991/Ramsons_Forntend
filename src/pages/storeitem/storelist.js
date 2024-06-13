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
import { GetStoreListData } from "../../redux/actions/storeActions";
import { api } from "../../services/api";
import { SetModelId } from "../../redux/actions/modalAction";
import Select from "react-select";
import config from "../../config";
import dayjs from "dayjs";
import useFilter from "../../components/Common/useFilter";
import EditableCell from "../../components/Common/editablecell";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Store_Form } from "./form/storeform";
import CreatableSelect from "react-select/creatable";

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

const Storelist = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        if (record.status === "Not Verified") {
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
          // If status is not 'Pending' or current date is not greater than 3 days from the record date, hide the edit button
          return null;
        }
      },
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "created_on",
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
      title: "PO No.",
      dataIndex: "code",
      align: "center",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Company Name",
      dataIndex: "company",
      width: 200,
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Invoice",
      dataIndex: "invoice",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        record.id ? (
          record.status === "Not Verified" ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeletes(record.id)}>
              <Tag bordered={false} color="blue">
                Delete
              </Tag>
            </Popconfirm>
          ) : (
            <Tag>-</Tag>
          )
        ) : null,
    },
  ];

  const expandedColumns = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditings(record);
        if (record.status === "Not Verified") {
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
          return null;
        }
      },
      width: 100,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
      editable: true,
      render: (text, record, index) => {
        const isEditing = isEditings(record); // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="code"
            title="Code"
            inputType="select"
            record={record}
            index={index}
            selectOptions={itemCode}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "item_name",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description", // Assuming you want to display the rate from the first booking in each item
      key: "description",
      ellipsis: true,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      ellipsis: true,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      ellipsis: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "rate",
        title: "Rate",
        editing: isEditings(record),
      }),
    },
    {
      title: "Quantity",
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
      title: "Total Amount",
      key: "amount",
      render: (_, record) => {
        const total = record.quantity * record.rate;
        return total.toFixed(2); // Adjust the precision as needed
      },
      ellipsis: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        record.id ? (
          record.status === "Not Verified" ? (
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

  const saves = async (key, record) => {
    console.log(key, record);
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

      api({
        api: "/api/storelist/",
        method: "post",
        body: {
          common: row,
          post: 4,
          po: expandlerecord.id,
          id: key,
          status: expandlerecord.status,
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

  const handleDeletes = (key) => {
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/storelist/",
      method: "post",
      body: {
        post: 6,
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

  const handleDelete = (key) => {
    console.log("777777", expandlerecord.entity.status);
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/storelist/",
      method: "post",
      body: {
        post: 5,
        status: expandlerecord.status,
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

  const renderExpandedRow = (record) => {
    return (
      <Table
        columns={expandedColumns}
        dataSource={record.expandedData || []}
        pagination={false}
        size="small"
        rowKey={(book) => book.id}
        bordered
        scroll={{ x: true }}
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

  var storelistdata = useSelector((state) => state.store.storelist_data);

  if (storelistdata) {
    var count = storelistdata.count;
    storelistdata = storelistdata.results;
  }

  const filtCols = {
    id: [],
    company_name: "",
    company_id__id: "",
    chalan_width: "",
    status: "",
    created_on: {
      start: "",
      end: "",
    },
  }; //filter
  const { filter, setFilter, page, setPage } = useFilter("storelistdatafilter");

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

  var [itemCode, setSkCode] = useState([]);
  var [item_names, setitemNames] = useState([]);
  var [descriptions, setDesc] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  useEffect(() => {
    api({ api: "/storeitem/itemlist/" }).then((data) => {
      setSkCode(data);
      var decs = [];
      data.map((item) => {
        decs.push({
          label: item.description,
          value: item.value,
          item_name: item.item_name,
          unit: item.item_unit,
          rate: item.rate,
          code: item.label,
          status: item.status,
        });
      });
      setDesc(decs);
      const names = data.map((item) => item.item_name);
      data = data.filter(
        ({ item_name }, index) => !names.includes(item_name, index + 1)
      );
      setOptions(data);
    });
    api({ api: "/storeitem/companydatalist/" }).then((data) => {
      setCompanyNames(data);
    });
  }, []);

  function setOptions(data) {
    data.map((item) => {
      item_names.push({ label: item.item_name, value: item.value });
    });
    setitemNames([...item_names]);
  }

  useEffect(() => {
    // Update local storage whenever count changes
    localStorage.setItem("counts", counts.toString());
  }, []);

  useEffect(() => {
    dispatch(
      GetStoreListData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  const handlePageChange = (pg) => {
    setPage(pg);
  };

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

  const [storepoWithExpandedData, setStorepoWithExpandedData] = useState([]);

  const handleAdd = () => {
    const currentDate = new Date();
    if (expandlerecord) {
      const index = storelistdata.findIndex(
        (item) => item.id === expandlerecord.id
      );
      if (index !== -1) {
        let newBooking = {
          code: "",
          descriptions: "",
          gst: 0,
          hsncode: 0,
          item: "",
          quantity: 0,
          rate: 0,
          unit: "",
          bid_id: expandlerecord.id,
          status: "Not Verified",
          created_on: currentDate.toISOString(),
          amount: "0", // corrected typo "o" to "0"
        };

        // Clone the current state of expanded data
        const updatedPlanpipe = [...storepoWithExpandedData];

        // Find the record to update
        const recordToUpdate = updatedPlanpipe.find(
          (record) => record.id === expandlerecord.id
        );

        // Update the record with new expanded data
        if (recordToUpdate) {
          recordToUpdate.expandedData = [
            ...recordToUpdate.expandedData,
            newBooking,
          ];
        }

        // Update the state with the modified expanded data
        setStorepoWithExpandedData(updatedPlanpipe);
      }
    }
  };

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
              options={
                Array.isArray(companyNames)
                  ? companyNames.map((vendorname) => ({
                      label: vendorname.label,
                      value: vendorname.label,
                    }))
                  : []
              }
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
            column.dataIndex === "phone_no" ||
            column.dataIndex === "alternate_no"
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
    } else if (column.dataIndex === "company") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "ship") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "source") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "budget") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

  const [expandlerecord, setExpandedRows] = useState();

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
        api: "/api/storelist/",
        method: "post",
        body: {
          common: row,
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
      "/api/export/storeexport/?from=" +
      from +
      "&to=" +
      to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

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

  const updateStorePoWithExpandedData = () => {
    if (storelistdata && Array.isArray(storelistdata)) {
      const updatedPlanpipeWithExpandedData = storelistdata.map((record) => ({
        ...record,
        expandedData:
          record.entity && Array.isArray(record.entity)
            ? record.entity.map((enty) => ({
                item_name: enty.item_name,
                description: enty.description,
                unit: enty.unit,
                rema: enty.rema,
                code: enty.code,
                gst: enty.gst,
                quantity: enty.quantity,
                hsnCode: enty.hsnCode,
                rate: enty.rate,
                status: enty.status,
                id: enty.id,
                po: enty.store_id,
              }))
            : [],
      }));
      setStorepoWithExpandedData(updatedPlanpipeWithExpandedData);
    }
  };

  useEffect(() => {
    updateStorePoWithExpandedData();
  }, [storelistdata]);

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [optionsed, setOptionsed] = useState([
    { value: "Rajesh Wrong Entry", label: "Rajesh Wrong Entry" },
    { value: "Po Raise Wrong", label: "Po Raise Wrong" },
    { value: "Bill Incorrect", label: "Bill Incorrect" },
    { value: "Verified", label: "Verified" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);
  const [showProcessButton, setShowProcessButton] = useState(true);

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

  const handleCreateOption = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptionsed([...optionsed, newOption]);
    setSelectedValue(newOption.value);
  };

  const handleModalOk = () => {
    // Get the selected row IDs
    const selectedRowIds = selectedRows;

    // Post data to the server
    api({
      api: "/api/storelist/",
      method: "post",
      body: {
        post: 7,
        id: selectedRowIds,
        options: selectedValue,
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
              <h4 className="filterPageTitle mt-2">#️⃣Stock In List</h4>
              <div className="ms-auto filter-component d-flex">
                <div className="button" data-tooltip="Size: 4Mb">
                  <div className="button-wrapper">
                    <div
                      className="text"
                      style={{
                        marginBottom: "20px",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}>
                      Download
                    </div>
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
                <button
                  onClick={handleAdd}
                  className="btn btn-secondary add-btn"
                  type="primary"
                  style={{
                    alignItems: "center",
                    fontWeight: "bold",
                  }}>
                  Add a row
                </button>
                <Link
                  className="btn btn-success add-btn"
                  style={{
                    fontWeight: "bold",
                    alignItems: "center",
                  }}
                  data-bs-toggle="modal"
                  to="#exampleModalToggle1"
                  role="button">
                  Item Add
                </Link>
              </div>
              <Store_Form />
            </div>
          </div>
          {showProcessButton && ( // Render the "Process" button only if showProcessButton is true
            <SelectedRowsActions
              selectedRowCount={selectedRowsCount}
              onSelectOptions={handleSelectOptions}
              isVisible={selectedRowsCount > 0}
            />
          )}
          <Form form={form} component={false}>
            {storepoWithExpandedData && (
              <Table
                columns={columnsWithFilter}
                dataSource={storepoWithExpandedData}
                expandable={{
                  expandedRowRender: renderExpandedRow,
                  expandedRowKeys: expandlerecord ? [expandlerecord.id] : [], // Use expandedRows state here
                  onExpand: (expanded, record) => {
                    setExpandedRows(expanded ? record : null);
                  },
                }}
                rowClassName="editable-row"
                rowKey={(record) => record.id}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                loading={storepoWithExpandedData === null}
                onChange={(pagination, filters, sorter) => {
                  setFilter(filters);
                }}
                rowSelection={{
                  type: "checkbox",
                  component: Checkbox,
                  onSelect: handleRowSelection,
                  onSelectAll: handleSelectAll,
                  selectedRowKeys: selectedRows,
                }}
                pagination={{
                  total: count,
                  pageSize: size,
                  onChange: handlePageChange,
                  onShowSizeChange: handlePageSizeChange,
                  showSizeChanger: true,
                  pageSizeOptions: [10, 15, 20, 25, 30, 50, 70, 100],
                }}
                bordered
                size="small"
                scroll={{ x: "max-content" }}
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
              <CreatableSelect
                id="my-select"
                options={optionsed}
                onChange={handleChange}
                onCreateOption={handleCreateOption}
                isClearable
                isSearchable
                placeholder="Select or type an option"
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Storelist;
