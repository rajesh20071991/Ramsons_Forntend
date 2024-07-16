import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { SetModelId } from "../../redux/actions/modalAction";
import Select from "react-select";
import { Link } from "react-router-dom";
import { GeChalanListData } from "../../redux/actions/challanAction";
import { ChallansList_Form } from "./form/chalan_form2";
import config from "../../config";
import dayjs from "dayjs";
import useFilter from "../../components/Common/useFilter";
import EditableCell from "../../components/Common/editablecell";
import { FaFilePdf } from "react-icons/fa";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { api } from "../../services/api";

const Challanlist = () => {
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
        console.log(diffInDays);
        if (diffInDays < 1) {
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
      dataIndex: "chalan_date",
      key: "date",
      editable: true,
      render: (chalan_date) => {
        const date = new Date(chalan_date);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return formattedDate;
      },
      sorter: true,
    },
    {
      title: "Challan No.",
      dataIndex: "challan_no",
      key: "challanNo",
      width: "100px",
      editable: true,
      render: (challan_no, row) => (
        <Link to={`/Challan/chalanview/${row.id}/`}>{challan_no}</Link>
      ),
      sorter: true,
    },
    {
      title: "Source Name",
      dataIndex: "source",
      key: "sourceName",
      sorter: true,
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "companyName",
      sorter: true,
      width: "150px",
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
      title: "Ship To",
      dataIndex: "ship",
      key: "shipTo",
      width: "150px",
      sorter: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="ship"
            title="Ship To"
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      width: "120px",
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
            selectOptions={status1}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Vehicle No.",
      dataIndex: "vehicle_no",
      key: "vehicleNo",
      sorter: true,
      editable: true,
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicleType",
      sorter: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="vehicle_type"
            title="Vehicle Type"
            inputType="select"
            record={record}
            index={index}
            selectOptions={veichle}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Fixed Quantity",
      dataIndex: "fixed_quantity",
      key: "fixedQuantity",
      sorter: true,
      editable: true,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "statusTag",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
      sorter: true,
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
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const currentDate = new Date();
        const recordDate = new Date(record.created_on);
        const diffInDays = Math.floor(
          (currentDate - recordDate) / (1000 * 60 * 60 * 24)
        );

        return record.id ? (
          diffInDays < 10 ? (
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
        ) : null;
      },
    },
  ];

  const handleDeletes = (key) => {
    api({
      api: "/api/chalanentity/",
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

  const [selectedRow, setSelectedRow] = useState(null);
  const handleSelection = (id) => {
    setSelectedRow(id);
  };

  const veichle = [
    { value: "Truck", label: "Truck" },
    { value: "Tractor", label: "Tractor" },
    { value: "Pick up", label: "Pick up" },
    { value: "Tempo", label: "Tempo" },
  ];

  const status1 = [
    { value: "Job Charges", label: "Job Charges" },
    { value: "Handling", label: "Handling" },
  ];

  const PDFButton = ({ id, selected, handleSelection }) => {
    const handlePdfGeneration = () => {
      const pdfUrl = config.apiEndpoint + "/dispatch/challan/pdf/" + id + "/0";
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

  const challancreate = useSelector(
    (state) => state.ChallanData.chalanlist_view
  );

  if (challancreate) {
    var count = challancreate.count;
    var challancreates = challancreate.results;
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
  const { filter, setFilter, page, setPage } = useFilter("challancreatefilter");
  const [refresh, setRef] = useState(false);
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
      challan_no: "",
      company: "",
      grade: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const [VendorNames, setVendorNames] = React.useState([]);

  useEffect(() => {
    api({ api: "/storeitem/companyfilter/" })
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
      GeChalanListData({
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

  const handlePageChange = (page) => {
    setPage(page);
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
              options={status1.map((status) => ({
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
          inputType: column.dataIndex === "weight" ? "number" : "text",
          dataIndex: column.dataIndex,
          title: column.title,
          editing: isEditing(record),
        }),
      };
    }
    if (column.dataIndex === "status") {
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
    } else if (column.dataIndex === "status") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

  const updateData = (newData) => {
    setData(newData);
  };
  const save = async (key) => {
    console.log(key);
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
        api: "/api/chalanentity/",
        method: "post",
        body: {
          common: row,
          post: 2,
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

  return (
    <div className="purchaselist">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Challan Details</h4>
              <div className="ms-auto filter-component d-flex">
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button">
                  Challan
                </Link>
              </div>
              <ChallansList_Form />
            </div>
          </div>
          <Form form={form} component={false}>
            {challancreates && (
              <div className="mobile-table-container">
                <Table
                  columns={columnsWithFilter}
                  dataSource={challancreates}
                  z
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
                  loading={challancreates === null}
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
        </div>
      </div>
    </div>
  );
};

export default Challanlist;
