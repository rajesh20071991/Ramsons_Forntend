import React, { useEffect, useState } from "react";
import {
  Table,
  Popconfirm,
  Input,
  Button,
  message,
  Form,
  Modal,
  DatePicker,
} from "antd";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { GetPlanStatusData } from "../../redux/actions/planningAction";
import { SetModelId } from "../../redux/actions/modalAction";
import { useDispatch } from "react-redux";
import "../../components/Common/style/button.css";
import dayjs from "dayjs";
import Select from "react-select";
import { DeleteOutlined } from "@ant-design/icons";
import { api } from "../../services/api";

const Planning_Status = () => {
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
      sorter: true,
      width: 100,
    },
    {
      title: "Plan No.",
      dataIndex: "plan_no",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Coil No.",
      dataIndex: "combined_id",
      sorter: true,
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Mill No.",
      dataIndex: "mill_no",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "No Of Pipe",
      dataIndex: "noofpipe",
      sorter: true,
      width: 150,
    },
    {
      title: (
        <div>
          <div style={{ whiteSpace: "normal", textAlign: "center" }}>
            TubeMill
          </div>
          <div
            style={{
              whiteSpace: "normal",
              textAlign: "center",
              fontSize: "12px",
            }}>
            Pipe Weight
          </div>
        </div>
      ),
      dataIndex: "pipe_weight",
      sorter: true,
      ellipsis: true,
    },
    {
      title: (
        <div>
          <div style={{ whiteSpace: "normal", textAlign: "center" }}>
            TubeMill
          </div>
          <div
            style={{
              whiteSpace: "normal",
              textAlign: "center",
              fontSize: "12px",
            }}>
            No of Pipe
          </div>
        </div>
      ),
      dataIndex: "total_pipe",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Pipe Diff.",
      dataIndex: "pipe_difference",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Complete Date",
      dataIndex: "out_date",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "planning_status",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Live Today",
      dataIndex: "created_on",
      align: "center",
      render: (createdOn, record) => {
        const timerValue = timerValues[record.id];
        return timerValue;
      },
      sorter: true,
      ellipsis: true,
    },
  ];

  const expandedColumns = [
    {
      title: "Actions",
      dataIndex: "actions",
      width: "3%",
      render: (_, record) =>
        record && record.id ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}>
            <DeleteOutlined size={20} />
          </Popconfirm>
        ) : null,
    },
    {
      title: "Actual Weight",
      dataIndex: "crane_weight",
      ellipsis: true,
    },
    {
      title: "Weight",
      dataIndex: "pipe_weight",
      ellipsis: true,
    },
    {
      title: "Pipe",
      dataIndex: "total_pipe",
      ellipsis: true,
    },
    {
      title: "S/L Weight",
      dataIndex: "short_weight",
      ellipsis: true,
    },
    {
      title: "Scrap",
      dataIndex: "scrap_weight",
      ellipsis: true,
    },
    {
      title: "S/L Pipe",
      dataIndex: "short_length",
      ellipsis: true,
    },
    {
      title: "S/L Weight",
      dataIndex: "short_weight",
      ellipsis: true,
    },
    {
      title: "Hole Pipe",
      dataIndex: "hole_pipe",
      ellipsis: true,
    },
    {
      title: "Hole Weight",
      dataIndex: "hweight",
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

  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log(`Deleting item with id: ${id}`);
    api({
      api: "/api/planning/",
      method: "post",
      body: { id: id, post: 7 },
    })
      .then(() => {
        setTimeout(() => {
          console.log("Data saved successfully!");
          message.success("Data saved successfully!");
          setIsModalVisible(false);
          CloseModal();
        }, 1000);
      })
      .catch((errInfo) => {
        console.log("Validate Failed:", errInfo);
        message.success("Validate Failed:", errInfo);
      });
  };

  var planpipe = useSelector((state) => state.PlanningData.PlanStatus_Pipe);

  if (planpipe) {
    var count = planpipe.count;
    var plan_pipe = planpipe.results;
  }

  const [timerValues, setTimerValues] = useState({});

  useEffect(() => {
    updateTimerValues();

    const timerInterval = setInterval(updateTimerValues, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [plan_pipe]);

  const updateTimerValues = () => {
    const currentTime = new Date();

    if (Array.isArray(plan_pipe?.results)) {
      const updatedTimerValues = {};

      plan_pipe?.results.forEach((row) => {
        if (row.created_on) {
          const createdDate = new Date(row.created_on);

          if (!isNaN(createdDate.getTime())) {
            let timerValue = "";

            if (!row.out_date) {
              const diffInMilliseconds = currentTime - createdDate;
              const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

              const seconds = diffInSeconds % 60;
              const minutes = Math.floor(diffInSeconds / 60) % 60;
              const hours = Math.floor(diffInSeconds / 3600);

              timerValue = `${hours}:${minutes}:${seconds}`;
            }

            updatedTimerValues[row.id] = timerValue;
          }
        }
      });

      setTimerValues(updatedTimerValues);
    }
  };

  const filtCols = {
    id: [],
    plan: "",
    company: "",
    size: "",
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
    const storedFilter = localStorage.getItem("planPolishFilter");
    return storedFilter ? JSON.parse(storedFilter) : filtCols;
  });

  const [refresh, setRef] = useState(true);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("PlanPolishPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [size, setSize] = useState(10);
  const [counts, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetPlanStatusData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  useEffect(() => {
    const storedFilter = localStorage.getItem("planPolishFilter");
    const storedPage = localStorage.getItem("PlanPolishPage");
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
    localStorage.setItem("planPolishFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("PlanPolishPage", page.toString());
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
    if (column.dataIndex) {
      // Add a check for editable columns
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

  const status = [
    { value: "Checked", label: "Checked" },
    { value: "Not Checked", label: "Not Checked" },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleRowSelection(selectedRowKeys, selectedRows) {
    setSelectedRows(selectedRows.map((row) => row.id));
    setSelectedOption(null);

    if (selectedRowKeys.length > 0) {
      setIsModalVisible(true); // Open the modal when at least one row is selected
    } else {
      setIsModalVisible(false); // Close the modal when no row is selected
    }
  }
  function handleSelectOption(option) {
    setSelectedOption(option.value); // Store only the label in the selectedOption state
  }

  const handlePostData = async (e) => {
    e.preventDefault();
    console.log("Selected Row Data:", selectedRows);
    console.log("Selected Option:", selectedOption);
    api({
      api: "/api/planning/",
      method: "post",
      body: { form: selectedRows, status: selectedOption, post: 5 },
    })
      .then(() => {
        setTimeout(() => {
          console.log("Data saved successfully!");
          message.success("Data saved successfully!");
          setIsModalVisible(false);
          CloseModal();
        }, 1000);
      })
      .catch((errInfo) => {
        console.log("Validate Failed:", errInfo);
        message.success("Validate Failed:", errInfo);
      });
  };

  let planpipeWithExpandedData = [];
  if (plan_pipe) {
    planpipeWithExpandedData = plan_pipe.map((record) => ({
      ...record,
      expandedData: record.tubemill_shifts.map((shift) => ({
        shift: shift.shift,
        pipe_weight: shift.pipe_weight,
        crane_weight: shift.crane_weight,
        total_pipe: shift.total_pipe,
        repair_pipe: shift.repair_pipe,
        repair_weight: shift.repair_weight,
        hole_pipe: shift.hole_pipe,
        scrap_weight: shift.scrap_weight,
        hweight: shift.hweight,
        short_length: shift.short_length,
        short_weight: shift.short_weight,
        id: shift.id,
      })),
    }));
  }

  return (
    <div
      className="border  table_body"
      style={{ overflowX: "auto", maxWidth: "100%", width: "100%" }}>
      <div className="table-container">
        <Form form={form} component={false}>
          {plan_pipe && (
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
                onChange: handleRowSelection,
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
              loading={plan_pipe === null}
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
              title={() => "Planning Status"}
            />
          )}
        </Form>
        <Modal
          title="Verified Non Polish Pipe"
          open={isModalVisible}
          onOk={handlePostData}
          onCancel={() => setIsModalVisible(false)} // Close the modal on cancel
        >
          <div className="modal-content">
            <Select
              onChange={handleSelectOption}
              options={status.map((option) => ({
                label: option.label,
                value: option.label,
              }))} // Map the options array to include only the label
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Planning_Status;
