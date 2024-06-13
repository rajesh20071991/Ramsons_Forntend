import React, { useEffect, useState } from "react";
import {
  Table,
  Checkbox,
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
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetItemListViewData } from "../../redux/actions/storeActions";
import { SetModelId } from "../../redux/actions/modalAction";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Select from "react-select";
import config from "../../config";
import { api } from "../../services/api";
import useFilter from "../../components/Common/useFilter";
import EditableCell from "../../components/Common/editablecell";

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

const ItemList_View = () => {
  const Column_Col = [
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
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("created_on"),
      }),
    },
    {
      title: "Item Code",
      dataIndex: "code",
      key: "itemCode",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("code"),
      }),
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "itemName",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("item_name"),
      }),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("description"),
      }),
    },
    {
      title: "Rack No.",
      dataIndex: "rack_no",
      key: "rackNo",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("rack_no"),
      }),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("unit__unit"),
      }),
    },
    {
      title: "HSN Code",
      dataIndex: "hsn_code",
      key: "hsnCode",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("hsn_code"),
      }),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("rate"),
      }),
    },
    {
      title: "Stock In",
      dataIndex: "stock_in",
      key: "stockIn",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("stock_in"),
      }),
    },
    {
      title: "Stock Out",
      dataIndex: "stock_out",
      key: "stockOut",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("stock_out"),
      }),
    },
    {
      title: "Balance",
      key: "balance",
      render: (text, row) => row.stock_in - row.stock_out,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("balance"),
      }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("status"),
      }),
    },
  ];

  let stocklist = useSelector((state) => state.store.ItemListview_data);

  if (stocklist) {
    var count = stocklist.count;
    stocklist = stocklist.results;
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

  const { filter, setFilter, page, setPage } = useFilter("itemviewfilter");

  const [refresh, setRef] = useState(true); //refresh table data

  const [size, setSize] = React.useState(10);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState(""); // State variable for sort column
  const [sortDirection, setSortDirection] = useState("");

  const [ItemdataNames, setItemdataNames] = useState([]);
  const [CodeName, setCodeNames] = useState([]);
  const [Units, setUnits] = useState([]);
  useEffect(() => {
    api({ api: "/storeitem/itemdata_filter/" }).then((data) => {
      setItemdataNames(data);
    });
    api({ api: "/storeitem/itemcode_filter/" }).then((data) => {
      setCodeNames(data);
    });
    api({ api: "/storeitem/itemunit_filter/" }).then((data) => {
      setUnits(data);
    });
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      console.log("89890", sortField);
      // If the same field is clicked again, toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      console.log("89890", sortField);
      // If a different field is clicked, set the sort field to the new field and default the direction to 'asc'
      setSortField(field);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    dispatch(
      GetItemListViewData({
        size: size,
        page: page,
        filter: filter,
        order: { field: sortField, dir: sortDirection },
      })
    );
  }, [page, size, filter, refresh, sortField, sortDirection]);

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
            column.dataIndex === "hsn_code" || column.dataIndex === "rate"
              ? "number"
              : "text",
          dataIndex: column.dataIndex,
          title: column.title,
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
    } else if (column.dataIndex === "Rack No.") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "Status") {
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
      "/api/export/item/?from=" +
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
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
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
      api: "/api/itemAppr/",
      method: "post",
      body: {
        post: 1,
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
        CloseModal();
        // Close the modal
        setIsModalVisible(false);
        setShowProcessButton(false);
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
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Stock List</h4>
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
              </div>
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
            {stocklist && (
              <Table
                columns={columnsWithFilter}
                dataSource={stocklist}
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
                loading={stocklist === null}
                onChange={(pagination, filters, sorter) => {
                  setFilter(filters);
                }}
                mobileBreakPoint={768}
                components={{
                  body: {
                    cell: EditableCell,
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

export default ItemList_View;
