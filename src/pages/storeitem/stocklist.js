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
import { GetItemListData } from "../../redux/actions/storeActions";
import { SetModelId } from "../../redux/actions/modalAction";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Select from "react-select";
import config from "../../config";
import { api } from "../../services/api";
import useFilter from "../../components/Common/useFilter";
import { Item_form, Unit_form } from "./form/ItemForm";
import EditableCell from "../../components/Common/editablecell";

const Stocklist = () => {
  const renderOperationColumn = (_, record) => {
    const currentDate = new Date();
    const recordDate = new Date(record.created_on);
    const daysDifference = Math.floor(
      (currentDate - recordDate) / (1000 * 60 * 60)
    );

    if (record.id) {
      if (daysDifference <= 4) {
        return (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeletes(record.id)}>
            <Tag bordered={false} color="blue">
              Delete
            </Tag>
          </Popconfirm>
        );
      } else {
        return <Tag>-</Tag>;
      }
    }
    return null;
  };

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
      render: (code, row) => (
        <Link to={`/storeitem/stock_view/${row.id}`}>{code}</Link>
      ),
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "itemName",
      editable: true,
      sorter: (a, b) => a.item_name.localeCompare(b.item_name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Rack No.",
      dataIndex: "rack_no",
      key: "rackNo",
      editable: true,
      sorter: (a, b) => a.rack_no.localeCompare(b.rack_no),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="unit"
            title="Unit"
            inputType="select"
            record={record}
            index={index}
            selectOptions={Units}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
      sorter: (a, b) => a.unit.unit.localeCompare(b.unit.unit),
    },
    {
      title: "HSN Code",
      dataIndex: "hsn_code",
      key: "hsnCode",
      sorter: (a, b) => a.hsn_code.localeCompare(b.hsn_code),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      sorter: (a, b) => a.rate - b.rate,
    },
    {
      title: "Stock In",
      dataIndex: "stock_in",
      key: "stockIn",
      sorter: (a, b) => a.stock_in - b.stock_in,
    },
    {
      title: "Stock Out",
      dataIndex: "stock_out",
      key: "stockOut",
      sorter: (a, b) => a.stock_out - b.stock_out,
    },
    {
      title: "Balance",
      key: "balance",
      render: (text, row) => row.stock_in - row.stock_out,
      sorter: (a, b) => a.stock_in - a.stock_out - (b.stock_in - b.stock_out),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: renderOperationColumn,
    },
  ];

  const handleDeletes = (key) => {
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/itemlist/",
      method: "post",
      body: {
        post: 3,
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

  let stocklist = useSelector((state) => state.store.ItemList_data);

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

  const { filter, setFilter, page, setPage } = useFilter("stocklistfilter");

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
  const [UnitsFilter, setfilterUnits] = useState([]);
  const [Units, setUnits] = useState([]);
  useEffect(() => {
    api({ api: "/storeitem/itemdata_filter/" }).then((data) => {
      setItemdataNames(data);
    });
    api({ api: "/storeitem/itemcode_filter/" }).then((data) => {
      setCodeNames(data);
    });
    api({ api: "/storeitem/itemunit_filter/" }).then((data) => {
      setfilterUnits(data);
    });
    api({ api: "/storeitem/unitlist/" }).then((data) => {
      setUnits(data);
    });
  }, []);

  useEffect(() => {
    dispatch(
      GetItemListData({
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
        api: "/api/itemlist/",
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

  function export_data() {
    const key = localStorage.getItem("AuthToken");
    let url = config.apiEndpoint + "/api/export/item/?token=" + key;
    window.open(url, "_blank");
  }

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
                        onClick={export_data}
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
                  to="#exampleModalToggle2"
                  role="button">
                  Item Add
                </Link>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle5"
                  role="button">
                  Unit Add
                </Link>
              </div>
              <Item_form />
              <Unit_form />
            </div>
          </div>
          <Form form={form} component={false}>
            {stocklist && (
              <Table
                columns={columnsWithFilter}
                dataSource={stocklist}
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
            onCancel={() => setModalVisible(false)}></Modal>
        </div>
      </div>
    </div>
  );
};

export default Stocklist;
