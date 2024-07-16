import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { GetEaapListData } from "../../redux/actions/storeActions";
import { api } from "../../services/api";
import { SetModelId } from "../../redux/actions/modalAction";
import Select from "react-select";
import config from "../../config";
import dayjs from "dayjs";
import useFilter from "../../components/Common/useFilter";
import EditableCell from "../../components/Common/editablecell";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { FaFilePdf } from "react-icons/fa";

const SelectedRowsActions = ({
  selectedRowCount,
  onSelectOptions,
  isVisible,
}) => {
  if (!isVisible) return null; // If no rows selected or isVisible is false, don't render the component

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

function ImageColumn({ images }) {
  return (
    <div>
      {images &&
        images.map((image, index) => (
          <a
            key={image.id || index}
            target="_blank"
            rel="noopener noreferrer"
            href={image.image}
            style={{ marginRight: "10px" }} // Add margin to the right of the image
          >
            Image {image.id || index}
          </a>
        ))}
    </div>
  );
}

const EAPURlist = () => {
  const Column_Col = [
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
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("created_on"),
      }),
    },
    {
      title: "PO No.",
      dataIndex: "code",
      align: "center",
      width: "100px",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("code"),
      }),
    },
    {
      title: "Company Name",
      dataIndex: "company",
      width: 150,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("company_id__company_name"),
      }),
    },
    {
      title: "Ship to",
      dataIndex: "ship",
      width: 150,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("ship_to__company_name"),
      }),
    },
    {
      title: "Billing To.",
      dataIndex: "source",
      width: 150,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("source_type__company_name"),
      }),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("status"),
      }),
    },
    {
      title: "Freight",
      dataIndex: "freight",
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("freight"),
      }),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("discount"),
      }),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("amount"),
      }),
    },
    {
      title: "Remark",
      dataIndex: "remarks",
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("remarks"),
      }),
    },
    {
      title: "Approve Remark",
      dataIndex: "remarks1",
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("remarks1"),
      }),
    },
    {
      title: "Budget",
      dataIndex: "budget",
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("budget_id__type"),
      }),
    },
    {
      title: "Status",
      dataIndex: "final",
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("final"),
      }),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageArray, record) => {
        return <ImageColumn images={imageArray} />;
      },
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

  const expandedColumns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
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
      title: "Remarks",
      dataIndex: "rema", // Assuming you want to display the rate from the first booking in each item
      key: "rema",
      ellipsis: true,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      ellipsis: true,
    },
    {
      title: "GST %",
      dataIndex: "gst",
      key: "gst",
      ellipsis: true,
    },
    {
      title: "HSN Code",
      dataIndex: "hsnCode",
      key: "hsnCode",
      ellipsis: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ellipsis: true,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      ellipsis: true,
    },
    {
      title: "Total Amount",
      key: "amount",
      render: (_, record) => {
        const amount = record.quantity * record.rate;
        const totalGST = (record.gst * 100) / 100; // Assuming gst is already in percentage
        const total = amount * (1 + totalGST / 100);
        return total.toFixed(2); // Adjust the precision as needed
      },
      ellipsis: true,
    },
  ];

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

  const PDFButton = ({ id, selected, handleSelection }) => {
    const handlePdfGeneration = () => {
      const pdfUrl =
        config.apiEndpoint + "/storeitem/poinvoice/pdf/" + id + "/0";
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

  var purchaselist = useSelector((state) => state.store.eapurchase_data);

  if (purchaselist) {
    var count = purchaselist.count;
    purchaselist = purchaselist.results;
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
  const { filter, setFilter, page, setPage } = useFilter(
    "purchaseapprovefilter"
  );

  const [refresh, setRef] = useState(false);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState(10);
  const [counts, setCount] = useState(0);
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState(""); // State variable for sort column
  const [sortDirection, setSortDirection] = useState("");

  useEffect(() => {
    // Update local storage whenever count changes
    localStorage.setItem("counts", counts.toString());
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
      GetEaapListData({
        size: size,
        page: page,
        filter: filter,
        order: { field: sortField, dir: sortDirection },
      })
    );
  }, [page, size, filter, refresh, sortField, sortDirection]);

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
    } else if (column.dataIndex === "code") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

  const [expandlerecord, setExpandedRows] = useState();

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
      "/api/export/purchase/?from=" +
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
    if (purchaselist && Array.isArray(purchaselist)) {
      const updatedPlanpipeWithExpandedData = purchaselist.map((record) => ({
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
                po: enty.po_id,
              }))
            : [],
      }));
      setStorepoWithExpandedData(updatedPlanpipeWithExpandedData);
    }
  };

  useEffect(() => {
    updateStorePoWithExpandedData();
  }, [purchaselist]);

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

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showProcessButton, setShowProcessButton] = useState(true);
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
      api: "/api/poraw/",
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

  useEffect(() => {
    // Reset showProcessButton state when selectedRowsCount changes
    setShowProcessButton(selectedRowsCount > 0);
  }, [selectedRowsCount]);

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
                gap: "10px",
              }}>
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Purchase Approve List</h4>
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
                rowSelection={{
                  type: "checkbox",
                  component: Checkbox,
                  onSelect: handleRowSelection,
                  onSelectAll: handleSelectAll,
                  selectedRowKeys: selectedRows,
                }}
                loading={storepoWithExpandedData === null}
                onChange={(pagination, filters, sorter) => {
                  setFilter(filters);
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

export default EAPURlist;
