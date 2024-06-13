import React, { useEffect, useState } from "react";
import {
  Table,
  Checkbox,
  Input,
  Modal,
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
import { SetModelId } from "../../redux/actions/modalAction";
import { useDispatch } from "react-redux";
import { GetSlittingViewData } from "../../redux/actions/slittingAction";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import config from "../../config";
import { api } from "../../services/api";
import EditableCell from "../../components/Common/editablecell";
import { Create_slitting_form } from "./form/slitting_form";

const Slitted_Coil_Slitting = () => {
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

        if (diffInDays < 3) {
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
        } else {
          // If current date is not greater than 3 days from the record date, hide the edit button
          return null;
        }
      },
      width: 100,
    },
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
      sorter: true,
      width: 100,
    },
    {
      title: "Plan No.",
      dataIndex: "plan",
      key: "plan",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Coil No.",
      dataIndex: "coil",
      key: "coil",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      key: "thickness",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Coil Weight",
      dataIndex: "coil_weight",
      key: "coil_weight",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "No. of Slit",
      dataIndex: "no_of_coil",
      key: "no_of_coil",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Scrap weight",
      dataIndex: "scrap",
      key: "scrap",
      editable: true,
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Paper Weight",
      dataIndex: "paper",
      key: "paper",
      editable: true,
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Seleeve Weight",
      dataIndex: "seelve",
      key: "seelve",
      editable: true,
      sorter: true,
      width: 150,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        return record.id ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeletes(record.id)}>
            <Tag bordered={false} color="blue">
              Delete
            </Tag>
          </Popconfirm>
        ) : null;
      },
    },
  ];

  const handleDeletes = (key) => {
    api({
      api: "/api/slitting/",
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

  const expandedColumns = [
    {
      title: "Coil No",
      dataIndex: "coil",
      key: "coil",
      ellipsis: true,
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
      ellipsis: true,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      ellipsis: true,
    },
    {
      title: "Remaining Type",
      dataIndex: "remaining_type",
      key: "remaining_type",
      ellipsis: true,
      render: (remainingType) => (
        <Tag color={remainingType ? "green" : "red"}>
          {remainingType ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "slitting_status",
      key: "slitting_status",
      ellipsis: true,
    },
  ];

  const expandedRowRender = (record) => (
    <Table
      columns={expandedColumns}
      dataSource={record.expandedData || []}
      pagination={false}
      size="small"
      rowKey={(shift) => shift.id}
      bordered
      scroll={{ x: true }}
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

  var slittedCoil = useSelector((state) => state.SlittingData.Sliting_Data);

  if (slittedCoil) {
    var count = slittedCoil.count;
    var slitted_Coils = slittedCoil.results;
  }

  const filtCols = {
    id: [],
    coil: "",
    company: "",
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
  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem("slittedSScoilFilter");
    return storedFilter ? JSON.parse(storedFilter) : filtCols;
  });

  const [refresh, setRef] = useState(true);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("slittedSScoilPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [size, setSize] = useState(10);
  const [counts, setCount] = useState(0);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
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
      GetSlittingViewData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  useEffect(() => {
    const storedFilter = localStorage.getItem("slittedSScoilFilter");
    const storedPage = localStorage.getItem("slittedSScoilPage");
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
    localStorage.setItem("slittedSScoilFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("slittedSScoilPage", page.toString());
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
            column.dataIndex === "scrap" ||
            column.dataIndex === "paper" ||
            column.dataIndex === "seelve"
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
    } else if (column.dataIndex === "slitting_status") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "created_on") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "company") {
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
    } else if (column.dataIndex === "plan") {
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

  let planpipeWithExpandedData = [];
  if (slitted_Coils) {
    planpipeWithExpandedData = slitted_Coils.map((record) => ({
      ...record,
      expandedData: record.slittedcoil.map((coiled) => ({
        coil: coiled.coil,
        width: coiled.width,
        weight: coiled.weight,
        remaining_type: coiled.remaining_type,
        slitting_status: coiled.slitting_status,
        id: coiled.id,
      })),
    }));
  }

  const [data, setData] = useState([]);
  const updateData = (newData) => {
    setData(newData);
  };
  const save = async (key) => {
    console.log(key);
    try {
      const row = await form.validateFields();
      setData((prevData) => [...prevData, row]);
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
        api: "/api/slitting/",
        method: "post",
        body: {
          common: row,
          post: 4,
          id: key,
        },
      });
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
      "/export_Coil/?from=" +
      from +
      "&to=" +
      to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

  return (
    <div
      className="border  table_body"
      style={{ overflowX: "auto", maxWidth: "100%", width: "100%" }}>
      <div className="table-container">
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
          style={{ marginBottom: "27px" }}
          to="#exampleModalToggle"
          role="button">
          Slitted
        </Link>
        <Create_slitting_form />
        <Form form={form} component={false}>
          {slitted_Coils && (
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
              loading={slitted_Coils === null}
              onChange={(pagination, filters, sorter) => {
                setFilter(filters);
              }}
              size="small"
              mobileBreakPoint={768}
              responsive={{
                xs: "stack",
                sm: "stack",
                md: "stack",
                lg: "stack",
                xl: "stack",
                xxl: "stack",
              }}
              scroll={{ x: true }}
              title={() => "Slitted Coil"}
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

export default Slitted_Coil_Slitting;
