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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { GetTube } from "../../redux/actions/pipeAction";
import { SetModelId } from "../../redux/actions/modalAction";
import { Inprocess_Form } from "./form/inprocess_form";
import EditableCell from "../../components/Common/editablecell";
import "../../components/Common/style/button.css";
import config from "../../config";
import { api } from "../../services/api";
import dayjs from "dayjs";
import { Manpower_Form } from "./form/manpower";

const TubeMillShift = () => {
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
          // If 1 day has passed, give all users access
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
        } else if (diffInDays <= 10) {
          const user = localStorage.getItem("username"); // Assuming 'user' is the key for storing the user type in localStorage
          if (
            user === "admin" ||
            user === "EMP293" ||
            user === "EMP198" ||
            user === "EMP396"
          ) {
            // If the user is 'admin' or 'emp001', provide access
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
          }
        } else {
          return null;
        }
      },
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "date",
      style: {
        textAlign: "center",
      },
      render: (createdOn) => {
        const date = new Date(createdOn);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return formattedDate;
      },
      sorter: true,
      ellipsis: true,
      showOnResponse: true,
      editable: true,
      showOnDesktop: true,
    },
    {
      title: "Plan No.",
      dataIndex: "plan",
      sorter: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Shift No.",
      dataIndex: "shift",
      sorter: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="shift"
            title="Shift"
            inputType="select"
            record={record}
            index={index}
            selectOptions={shift}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Coil No.",
      dataIndex: "coil",
      sorter: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      sorter: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      sorter: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      sorter: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Mill No.",
      dataIndex: "mill",
      sorter: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Actual Weight",
      dataIndex: "crane_weight",
      sorter: true,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Pipe Weight",
      dataIndex: "pipe_weight",
      sorter: true,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Pipe",
      dataIndex: "total_pipe",
      sorter: true,
      editable: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Die Scrap",
      dataIndex: "die_scrap",
      sorter: true,
      editable: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Repair Pipe",
      dataIndex: "repair_pipe",
      sorter: true,
      editable: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Repair Weight",
      dataIndex: "repair_weight",
      sorter: true,
      editable: true,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        record.total_pipe === "0.000" && record.pipe_weight === "0.000" ? (
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

  const handleDelete = (key) => {
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/tubeshiftdata/",
      method: "post",
      body: {
        post: 11,
        id: key,
      },
    })
      .then(() => {
        console.log("Data deleted successfully!");
        message.success("Data deleted successfully!");
        CloseModal();
      })
      .catch((error) => {
        console.log("Error while deleting data:", error);
        message.error("Failed to delete data.");
      });
  };

  const expandedColumns = [
    {
      title: "Hole Pipe",
      dataIndex: "hole_pipe",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "hole_pipe",
        title: "Hole Pipe",
        editing: isEditing(record),
      }),
    },
    {
      title: "Hole Weight",
      dataIndex: "hweight",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "hweight",
        title: "Hole Weight",
        editing: isEditing(record),
      }),
    },
    {
      title: "Scrap Weight",
      dataIndex: "scrap_weight",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "scrap_weight",
        title: "Scrap Weight",
        editing: isEditing(record),
      }),
    },
    {
      title: "S/L Tube",
      dataIndex: "short_length",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "short_length",
        title: "S/L Tube",
        editing: isEditing(record),
      }),
    },
    {
      title: "S/L Weight",
      dataIndex: "short_weight",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "short_weight",
        title: "S/L Weight",
        editing: isEditing(record),
      }),
    },
    {
      title: "Operator",
      dataIndex: "operator_name",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "operator_name",
        title: "Operator",
        editing: isEditing(record),
      }),
    },
    {
      title: "Helper",
      dataIndex: "helper_name",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "helper_name",
        title: "Helper",
        editing: isEditing(record),
      }),
    },
    {
      title: "Stoppage Reasons",
      dataIndex: "stopage_reasons",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "stopage_reasons",
        title: "Stoppage Reasons",
        editing: isEditing(record),
      }),
    },
    {
      title: "Manpower",
      dataIndex: "manpower",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "manpower",
        title: "Manpower",
        editing: isEditing(record),
      }),
    },
    {
      title: "Planning ",
      dataIndex: "planning",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "planning",
        title: "Planning ",
        editing: isEditing(record),
      }),
    },
    {
      title: "Power Cut",
      dataIndex: "power_cut",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "power_cut",
        title: "Power Cut",
        editing: isEditing(record),
      }),
    },
    {
      title: "Stoppage",
      dataIndex: "stoppage",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "stoppage",
        title: "Stoppage",
        editing: isEditing(record),
      }),
    },
    {
      title: "Running Hours",
      dataIndex: "running_hrs",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "running_hrs",
        title: "Running Hours",
        editing: isEditing(record),
      }),
    },
  ];

  const shift = [
    { value: "Shift A", label: "Shift A" },
    { value: "Shift B", label: "Shift B" },
  ];

  const expandedRowRender = (record) => (
    <Table
      columns={expandedColumns}
      dataSource={record.expandedData || []}
      pagination={false}
      size="small"
      rowKey={(record) => record.id}
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      bordered
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

  const pipetubeshift = useSelector((state) => state.PipeData.tubeshift_data);

  if (pipetubeshift) {
    var count = pipetubeshift.count;
    var pipetubesshift = pipetubeshift.results;
  }
  const dispatch = useDispatch();

  const filtCols = {
    id: [],
    code: "",
    company: "",
    status: "",
    customer: "",
    phone: "",
    created_on: {
      start: "",
      end: "",
    },
  }; //filter
  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem("currentFilter");
    return storedFilter ? JSON.parse(storedFilter) : filtCols;
  });
  const [refresh, setRef] = useState(true);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState(10);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const [counts, setCount] = useState(0);
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });

  const edit = (record) => {
    form.setFieldsValue({
      coil_no: "",
      company: "",
      grade: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  useEffect(() => {
    dispatch(
      GetTube({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  useEffect(() => {
    const storedFilter = localStorage.getItem("tubeshiftFilter");
    const storedPage = localStorage.getItem("TubeShiftPage");
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
    localStorage.setItem("tubeshiftFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("TubeShiftPage", page.toString());
  }, [page]);

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
          inputType:
            column.dataIndex === "crane_weight" ||
            column.dataIndex === "pipe_weight" ||
            column.dataIndex === "total_pipe" ||
            column.dataIndex === "hweight" ||
            column.dataIndex === "hole_pipe" ||
            column.dataIndex === "short_length" ||
            column.dataIndex === "scrap_weight" ||
            column.dataIndex === "short_weight"
              ? "number"
              : "text",
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
    } else if (column.dataIndex === "created_on") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "plan") {
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
    } else if (column.dataIndex === "size") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "mill") {
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
        api: "/api/tubeshiftdata/",
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
      "/export_tube/?from=" +
      from +
      "&to=" +
      to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

  let pipetubesshiftWithExpandedData = [];
  if (pipetubesshift) {
    pipetubesshiftWithExpandedData = pipetubesshift.map((record) => ({
      ...record,
      expandedData: [
        // Populate the expandedData array with the corresponding data
        {
          hole_pipe: record.hole_pipe,
          hweight: record.hweight,
          scrap_weight: record.scrap_weight,
          short_length: record.short_length,
          short_weight: record.short_weight,
          operator_name: record.operator_name,
          helper_name: record.helper_name,
          stopage_reasons: record.stopage_reasons,
          manpower: record.manpower,
          planning: record.planning,
          power_cut: record.power_cut,
          stoppage: record.stoppage,
          running_hrs: record.running_hrs,
          status: record.status,
          id: record.id,
        },
        // Add more objects for additional rows in the expanded table
      ],
    }));
  }
  const refreshData = () => {
    setRef(!refresh);
  };

  return (
    <div
      className="border  table_body"
      style={{ overflowX: "auto", maxWidth: "100%", width: "100%" }}>
      <div className="table-container">
        <Typography.Title style={{ color: "blue" }} level={5}>
          Tubemill
        </Typography.Title>
        <div className="ms-auto filter-component">
          <Link
            className="btn btn-success add-btn"
            data-bs-toggle="modal"
            style={{ marginBottom: "27px" }}
            to="#exampleModalToggle"
            role="button">
            Add Item
          </Link>
          <Link
            className="btn btn-success add-btn"
            data-bs-toggle="modal"
            style={{ marginBottom: "27px" }}
            to="#exampleModalToggle1"
            role="button">
            Manpower Details
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
        <Inprocess_Form refreshData={refreshData} />
        <Manpower_Form />
        <Form form={form} component={false}>
          {pipetubesshift && (
            <Table
              columns={columnsWithFilter}
              dataSource={pipetubesshiftWithExpandedData}
              expandable={{ expandedRowRender }}
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
              loading={pipetubesshift === null}
              onChange={(pagination, filters, sorter) => {
                setFilter(filters);
              }}
              responsive={{
                xs: "stack",
                sm: "stack",
                md: "stack",
                lg: "stack",
                xl: "stack",
                xxl: "stack",
              }}
              scroll={{ x: true }}
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

export default TubeMillShift;
