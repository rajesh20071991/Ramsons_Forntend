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
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { GetpolishinsPipeData } from "../../redux/actions/pipeAction";
import { SetModelId } from "../../redux/actions/modalAction";
import { Polish_Form } from "./form/polish_form";
import EditableCell from "../../components/Common/editablecell";
import "../../components/Common/style/button.css";
import config from "../../config";
import { api } from "../../services/api";
import dayjs from "dayjs";

const { Option } = Select;
const Polish_Inspection = () => {
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
      editable: true,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      ellipsis: true,
    },
    {
      title: "Coil No.",
      dataIndex: "combined_id",
      key: "coil_no",
      sorter: (a, b) => a.coil_no.localeCompare(b.coil_no),
      ellipsis: true,
    },
    {
      title: (
        <div style={{ whiteSpace: "normal", textAlign: "center" }}>
          Polish No.
        </div>
      ),
      dataIndex: "code",
      key: "code",
      align: "center",
      sorter: (a, b) => a.code.localeCompare(b.code),
      ellipsis: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      sorter: (a, b) => a.grade.localeCompare(b.grade),
      ellipsis: true,
    },
    {
      title: (
        <div style={{ whiteSpace: "normal", textAlign: "center" }}>
          Thickness
        </div>
      ),
      dataIndex: "thickness",
      key: "thickness",
      align: "center",
      sorter: (a, b) => a.thickness - b.thickness,
      ellipsis: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      align: "center",
      sorter: (a, b) => a.size - b.size,
      ellipsis: true,
    },
    {
      title: (
        <div style={{ whiteSpace: "normal", textAlign: "center" }}>
          No. of Pipe
        </div>
      ),
      dataIndex: "no_pipe",
      key: "no_pipe",
      align: "center",
      sorter: (a, b) => a.no_pipe - b.no_pipe,
      ellipsis: true,
      editable: true,
    },
    {
      title: (
        <div style={{ whiteSpace: "normal", textAlign: "center" }}>Weight</div>
      ),
      dataIndex: "batch_weight",
      key: "batch_weight",
      sorter: (a, b) => a.batch_weight - b.batch_weight,
      ellipsis: true,
      editable: true,
    },
    {
      title: (
        <div style={{ whiteSpace: "normal", textAlign: "center" }}>Bundle</div>
      ),
      dataIndex: "bundle",
      key: "bundle",
      align: "center",
      sorter: (a, b) => a.no_pipe - b.no_pipe,
      ellipsis: true,
      editable: true,
    },
    {
      title: (
        <div style={{ whiteSpace: "normal", textAlign: "center" }}>
          Loose Pipe
        </div>
      ),
      dataIndex: "loosepipe",
      key: "loosepipe",
      sorter: (a, b) => a.batch_weight - b.batch_weight,
      ellipsis: true,
      editable: true,
    },
    {
      title: "Hole Pipe",
      dataIndex: "hole_pipe",
      ellipsis: true,
      editable: true,
    },
    {
      title: "Hole Weight",
      dataIndex: "hweight",
      ellipsis: true,
      editable: true,
    },
    {
      title: "S/L Pipe",
      dataIndex: "short_length",
      ellipsis: true,
      editable: true,
    },
    {
      title: "S/L Weight",
      dataIndex: "short_weight",
      ellipsis: true,
      editable: true,
    },
    {
      title: "Scrap Weight",
      dataIndex: "scrap",
      ellipsis: true,
      editable: true,
    },
    {
      title: "Mill No.",
      dataIndex: "mill",
      ellipsis: true,
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.remarks.localeCompare(b.remarks),
      ellipsis: true,
    },
  ];

  const expandedColumns = [
    {
      title: "Welding",
      dataIndex: "welding",
      onCell: (record) => ({
        record,
        inputType: "select", // Change inputType to "select"
        dataIndex: "welding",
        title: "Welding",
        editing: isEditing(record),
        selectOptions: [
          { label: "Ok", value: "Ok" },
          { label: "Not Ok", value: "Not Ok" },
        ], // Add select options with non-null values
      }),
    },
    {
      title: "OD ",
      dataIndex: "od",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "select",
        dataIndex: "od",
        title: "OD ",
        editing: isEditing(record),
        selectOptions: [
          { label: "Ok", value: "Ok" },
          { label: "Not Ok", value: "Not Ok" },
        ],
      }),
    },
    {
      title: "Type of Rejection",
      dataIndex: "type_of_rejection",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "select",
        dataIndex: "type_of_rejection",
        title: "Type of Rejection",
        editing: isEditing(record),
        selectOptions: [
          { value: "Hole", label: "Hole" },
          { value: "Wave", label: "Wave" },
          { value: "Deep Welding", label: "Deep Welding" },
          { value: "Open", label: "Open" },
          { value: "No Issue", label: "No Issue" },
        ],
      }),
    },
    {
      title: "STR",
      dataIndex: "str",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "select",
        dataIndex: "str",
        title: "STR",
        editing: isEditing(record),
        selectOptions: [
          { label: "Ok", value: "Ok" },
          { label: "Not Ok", value: "Not Ok" },
        ],
      }),
    },
    {
      title: "Mark",
      dataIndex: "mark",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "select",
        dataIndex: "mark",
        title: "Mark",
        editing: isEditing(record),
        selectOptions: [
          { value: "Flap", label: "Flap" },
          { value: "Roll", label: "Roll" },
          { value: "Minnor Roll Marking", label: "Minnor Roll Marking" },
          { value: "No Issue", label: "No Issue" },
        ],
      }),
    },
    {
      title: "Stamp",
      dataIndex: "stamp",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "select",
        dataIndex: "stamp",
        title: "Stamp",
        editing: isEditing(record),
        selectOptions: [
          { value: "Ok", label: "Ok" },
          { value: "Not Ok", label: "Not Ok" },
          { value: "Without Stamp", label: "Without Stamp" },
        ],
      }),
    },
    {
      title: "Finish",
      dataIndex: "finish",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "select",
        dataIndex: "finish",
        title: "Finish",
        editing: isEditing(record),
        selectOptions: [
          { value: "Ok", label: "Ok" },
          { value: "Not Ok", label: "Not Ok" },
          { value: "Medium Quality", label: "Medium Quality" },
        ],
      }),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "remarks",
        title: "Remarks",
        editing: isEditing(record),
      }),
    },
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

  const polishInspect = useSelector((state) => state.PipeData.pol_data);

  if (polishInspect) {
    var count = polishInspect.count;
    var polishInspection = polishInspect.results;
  }

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
  const [refresh, setRef] = useState(false);
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

  const cancel = () => {
    setEditingKey("");
  };

  useEffect(() => {
    dispatch(
      GetpolishinsPipeData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, filter, size, refresh]);

  useEffect(() => {
    const storedFilter = localStorage.getItem("polishInspFilter");
    const storedPage = localStorage.getItem("polishInspPage");
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
    localStorage.setItem("polishInspFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("polishInspPage", page.toString());
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
    console.log("yyy");
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
    if (column.dataIndex === "combined_id") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "created_on") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "code") {
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
        api: "/api/tubeshiftdata/",
        method: "post",
        body: {
          common: row,
          post: 10,
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
      "/export_polish/?from=" +
      from +
      "&to=" +
      to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

  let pipetubesshiftWithExpandedData = [];
  if (polishInspection) {
    pipetubesshiftWithExpandedData = polishInspection.map((record) => ({
      ...record,
      expandedData: [
        // Populate the expandedData array with the corresponding data
        {
          loosepipe: record.loosepipe,
          no_rework_pipe: record.no_rework_pipe,
          hole_pipe: record.hole_pipe,
          hweight: record.hweight,
          rejected_weight: record.rejected_weight,
          short_length: record.short_length,
          short_weight: record.short_weight,
          scrap: record.scrap,
          welding: record.welding,
          od: record.od,
          type_of_rejection: record.type_of_rejection,
          lining: record.lining,
          bundle: record.bundle,
          str: record.str,
          mark: record.mark,
          stamp: record.stamp,
          finish: record.finish,
          remarks: record.remarks,
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
        <Polish_Form refreshData={refreshData} />
        <Form form={form} component={false}>
          {polishInspection && (
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
              loading={polishInspection === null}
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

export default Polish_Inspection;
