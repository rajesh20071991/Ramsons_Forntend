import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { api } from "../../services/api";
import Select from "react-select";
import { SetModelId } from "../../redux/actions/modalAction";
import { GetVendorapproveData } from "../../redux/actions/storeActions";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import config from "../../config";
import {
  Table,
  Checkbox,
  Input,
  Button,
  Form,
  message,
  Modal,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import useFilter from "../../components/Common/useFilter";

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

const Vendor_Approve_Data = () => {
  const Column_Col = [
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
      title: "Company ID",
      dataIndex: "company_code",
      align: "center",
      sorter: (a, b) => a.company_code.localeCompare(b.company_code),
    },
    {
      title: "Person Name",
      dataIndex: "contact_name",
      sorter: (a, b) => a.contact_name.localeCompare(b.contact_name),
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.company_name.localeCompare(b.company_name),
    },
    {
      title: "GST No.",
      dataIndex: "gst_no",
      width: 150,
      sorter: (a, b) => a.gst_no.localeCompare(b.gst_no),
    },
    {
      title: "Email ID",
      dataIndex: "email_id",
      key: "email",
      sorter: (a, b) => a.email_id.localeCompare(b.email_id),
    },
    {
      title: "Phone No.",
      dataIndex: "mobile_no",
      key: "phone",
      sorter: (a, b) => a.mobile_no.localeCompare(b.mobile_no),
    },
    {
      title: "Address",
      dataIndex: "shipping_add",
      key: "address",
      sorter: (a, b) => a.shipping_add.localeCompare(b.shipping_add),
      width: 200, // Set initial width for the column
    },
    {
      title: "City",
      dataIndex: "shipping_city",
      key: "city",
      sorter: (a, b) => a.shipping_city.localeCompare(b.shipping_city),
    },
    {
      title: "State",
      dataIndex: "shipping_state",
      key: "state",
      sorter: (a, b) => a.shipping_state.localeCompare(b.shipping_state),
    },
    {
      title: "Pin Code",
      dataIndex: "pin_code",
      key: "pinCode",
      sorter: (a, b) => a.pin_code.localeCompare(b.pin_code),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageArray, record) => {
        const imageUrl =
          imageArray && imageArray.length > 0 ? imageArray[0].image : "";
        return imageUrl ? (
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: "10px" }}>
            Image
          </a>
        ) : null;
      },
    },
  ];

  var vendorlists = useSelector((state) => state.store.vendor_data);

  if (vendorlists) {
    var count = vendorlists.count;
    vendorlists = vendorlists.results;
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
  const { filter, setFilter, page, setPage } = useFilter("vendorApprovefilter");
  const [refresh, setRef] = useState(false);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [size, setSize] = React.useState(10);
  const [counts, setCount] = useState(0);
  const dispatch = useDispatch();

  const [companyNames, setCompanyNames] = useState("");
  useEffect(() => {
    api({ api: "/storeitem/vendorlist/" })
      .then((data) => {
        setCompanyNames(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
  }, []);

  useEffect(() => {
    // Update local storage whenever count changes
    localStorage.setItem("counts", counts.toString());
  }, []);

  useEffect(() => {
    dispatch(
      GetVendorapproveData({
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

  const handleClearFilters = () => {
    setFilter({ ...filtCols });
    setRef((prevRef) => !prevRef);
    resetAllFilters();
    CloseModal();
  };

  const getColumnSearchProps = (dataIndex) => {
    if (dataIndex === "company_name") {
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
        }),
      };
    }
    if (column.dataIndex === "created_on") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "image") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

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
      "/api/export/vendor/?from=" +
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
      api: "/api/vendorlist/",
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
    <div className="vendor">
      <div className="table">
        <div className="border m-3 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#Vendor List</h4>
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
                <br />
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
            {vendorlists && (
              <Table
                columns={columnsWithFilter}
                dataSource={vendorlists}
                loading={vendorlists === null}
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
                rowKey="id"
                scroll={{ x: "max-content" }} // Add this if you have horizontal scroll
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

export default Vendor_Approve_Data;
