import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Typography,
  Form,
  Tag,
  message,
  DatePicker,
} from "antd";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SetModelId } from "../../redux/actions/modalAction";
import EditableCell from "../../components/Common/editablecell";
import useFilter from "../../components/Common/useFilter";
import dayjs from "dayjs";
import { GetRetantionData } from "../../redux/actions/salesAction";
import { api } from "../../services/api";
const Retantion = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        // If current date is greater than 3 days from the record date, show the edit button
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
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      width: "10%",
      sorter: (a, b) => a.company_name.localeCompare(b.company_name),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: "Phone No",
      dataIndex: "phone_no",
      key: "phone_no",
      sorter: (a, b) => a.phone_no.localeCompare(b.phone_no),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode

        // Helper function to format the date as "YYYY-MM-DD"
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        return isEditing ? (
          <DatePicker
            selected={new Date(text)}
            onChange={(date) => handleDateChange(date, record)} // Define a handler for date changes
            dateFormat="yyyy-MM-dd"
          />
        ) : (
          <span>{formatDate(new Date(text))}</span>
        );
      },
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      editable: true,
      sorter: (a, b) => a.remarks.localeCompare(b.remarks),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
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
            selectOptions={status}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Colour",
      dataIndex: "colour",
      key: "colour",
      align: "center",
      width: "7%",
      sorter: (a, b) => a.colour.localeCompare(b.colour),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="colour"
            title="Colour"
            inputType="select"
            record={record}
            index={index}
            selectOptions={colour}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
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

  const expandedColumns = [
    {
      title: "Created On",
      dataIndex: "created_on",
      key: "created_on",
      ellipsis: true,
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date", // Assuming you want to display the date from the first booking in each item
      key: "date",
      ellipsis: true,
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
    },
  ];

  const handleDelete = (key) => {
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/rentation/",
      method: "post",
      body: {
        post: 2,
        id: key,
      },
    });
    console.log("Data saved successfully!");
    message.success("Data saved successfully!");
    CloseModal();
  };

  const [DateTime, setDateTime] = useState("");
  const handleDateChange = (date, record) => {
    // For example, you can update the record's date value
    setDateTime((record.date = date.toISOString())); // Update the record's date to the new value
    // ...
  };

  const status = [
    { value: "Intersted", label: "Intersted" },
    { value: "Rate Issue", label: "Rate Issue" },
    { value: "Not Required", label: "Not Required" },
    { value: "Credit Issue", label: "Credit Issue" },
    { value: "Call Not Pickup", label: "Call Not Pickup" },
    { value: "Rate Given", label: "Rate Given" },
    { value: "Not Intersted", label: "Not Intersted" },
  ];

  const colour = [
    { value: "Blacklist", label: "Blacklist" },
    { value: "Whitelist", label: "Whitelist" },
  ];

  const expandedRowRender = (record) => {
    return (
      <Table
        columns={expandedColumns}
        dataSource={record.expandedData || []}
        pagination={false}
        size="small"
        rowKey={(book) => book.id}
        bordered
        scroll={{ x: true }}
        rowSelection={{
          type: "checkbox",
          columnTitle: "",
          columnWidth: "30px",
        }}
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

  const SalesPipeR = useSelector((state) => state.SalesData.retantionsdata);
  if (SalesPipeR) {
    var count = SalesPipeR.count;
    var Sales_PipeRet = SalesPipeR.results;
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
  const { filter, setFilter, page, setPage } = useFilter("Sales_PipeRetfilter");

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
      vehicle_no: "",
      vehicle_type: "",
      driver_name: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  useEffect(() => {
    dispatch(
      GetRetantionData({
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
    if (column.dataIndex === "comapny_name") {
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
        api: "/api/rentation/",
        method: "post",
        body: {
          common: row,
          date: DateTime,
          post: 1,
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

  const [planpipeWithExpandedData, setPlanpipeWithExpandedData] = useState([]);
  const updatePlanpipeWithExpandedData = () => {
    if (Sales_PipeRet && Array.isArray(Sales_PipeRet)) {
      const updatedPlanpipeWithExpandedData = Sales_PipeRet.map((record) => ({
        ...record,
        expandedData:
          record.calling && Array.isArray(record.calling)
            ? record.calling.map((coiled) => ({
                id: coiled.id,
                created_on: coiled.created_on,
                company_name: coiled.company_name,
                date: coiled.date,
                remarks: coiled.remarks,
                status: coiled.status,
              }))
            : [],
      }));
      setPlanpipeWithExpandedData(updatedPlanpipeWithExpandedData);
    }
  };

  useEffect(() => {
    updatePlanpipeWithExpandedData();
  }, [Sales_PipeRet]);

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
        <Form form={form} component={false}>
          {planpipeWithExpandedData && (
            <Table
              columns={columnsWithFilter}
              dataSource={planpipeWithExpandedData}
              expandable={{ expandedRowRender }}
              rowKey={(record) => record.id}
              rowClassName="editable-row"
              rowSelection={{
                type: "checkbox",
                columnTitle: "",
                columnWidth: "30px",
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
              title={() => "Retantion"}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
            />
          )}
        </Form>
      </div>
    </div>
  );
};

export default Retantion;
