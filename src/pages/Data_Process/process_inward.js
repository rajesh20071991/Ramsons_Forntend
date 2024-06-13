import React, { useEffect, useState } from "react";
import {
  Table,
  Checkbox,
  message,
  Input,
  Button,
  Form,
  Modal,
  DatePicker,
} from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { GetInwardProcessData } from "../../redux/actions/data_processAction";
import { SetModelId } from "../../redux/actions/modalAction";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import PlannedTime_Format from "../../components/Common/plannedtime";
import Select from "react-select";
import dayjs from "dayjs";
import { Tag } from "antd";
const Inward_Data = () => {
  const Column_Col = [
    {
      title: "Date",
      dataIndex: "created_on",
      key: "date",
      render: (created_on) => {
        const today = new Date(created_on);
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      },
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
    },
    {
      title: "Coil No.",
      dataIndex: "coil_no",
      key: "coil_no",
      sorter: true,
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      sorter: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      sorter: true,
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      key: "thickness",
      sorter: true,
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
      sorter: true,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: true,
    },
    {
      title: "Planned",
      dataIndex: "planned",
      key: "planned",
      render: (text, record) => {
        if (record.step === "Step-1") {
          return PlannedTime_Format({
            date: record.created_on,
            hours: 6,
            mintues: 0,
          });
        } else if (record.step === "Step-2") {
          return PlannedTime_Format({
            date: record.created_on,
            hours: 1,
            mintues: 0,
          });
        } else {
          return PlannedTime_Format({
            date: record.created_on,
            hours: 1,
            mintues: 0,
          });
        }
      },
    },
    {
      title: "Step",
      dataIndex: "step",
      key: "step",
      sorter: true,
    },
    {
      title: "Task Name",
      dataIndex: "task_name",
      key: "task_name",
      sorter: true,
    },
    {
      title: "Time Remaining",
      dataIndex: "created_on",
      key: "time_remaining",
      render: (createdOn, record) => {
        const plannedTime = new Date(createdOn);
        // Add the planned hours and minutes to the planned time
        if (record.step === "Step-1") {
          plannedTime.setHours(plannedTime.getHours() + 6);
        } else {
          plannedTime.setHours(plannedTime.getHours() + 1);
        }

        // Calculate the time difference in milliseconds
        const timeDifference = currentTime.getTime() - plannedTime.getTime();
        const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const remainingMinutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const remainingSeconds = Math.floor(
          (timeDifference % (1000 * 60)) / 1000
        );

        // Format the remaining time as HH:MM:SS
        const formattedTime = `${remainingHours
          .toString()
          .padStart(2, "0")}:${remainingMinutes
          .toString()
          .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

        const color = formattedTime <= 0 ? "green" : "red";

        return <Tag color={color}>{formattedTime}</Tag>;
      },
    },
  ];

  var inwardfms = useSelector(
    (state) => state.DataProcessData.inwardProcess_data
  );
  if (inwardfms) {
    var count = inwardfms.count;
    var inwardfms_data = inwardfms.results;
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
    const storedFilter = localStorage.getItem("inwardfmsFilter");
    return storedFilter ? JSON.parse(storedFilter) : filtCols;
  });

  const [refresh, setRef] = useState(true);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("inwardfmsPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [size, setSize] = useState(10);
  const [counts, setCount] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetInwardProcessData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  useEffect(() => {
    const storedFilter = localStorage.getItem("inwardfmsFilter");
    const storedPage = localStorage.getItem("inwardfmsPage");
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
    localStorage.setItem("inwardfmsFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("inwardfmsPage", page.toString());
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

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleRowSelection(selectedRowKeys, selectedRows) {
    const selectedRowData = selectedRows.map((row) => ({
      id: row.id,
      step: row.step,
    }));

    setSelectedRows(selectedRowData);
    setSelectedOption(null);

    if (selectedRowKeys.length > 0) {
      setIsModalVisible(true); // Open the modal when at least one row is selected
    } else {
      setIsModalVisible(false); // Close the modal when no row is selected
    }
  }
  function handleSelectOption(option) {
    setSelectedOption(option); // Store only the label in the selectedOption state
  }

  const handlePostData = (e) => {
    e.preventDefault();

    if (selectedRows && selectedOption) {
      const selectedValue = selectedOption.value;
      const selectedLabel = selectedOption.label;
      console.log("Selected Row Data:", selectedRows);
      console.log("Selected Option Value:", selectedValue);
      console.log("Selected Option Label:", selectedLabel);

      api({
        api: "/api/inward_data/",
        method: "post",
        body: { form: selectedRows, status: selectedValue, post: 1 },
      })
        .then(() => {
          console.log("Data saved successfully!");
          message.success("Data saved successfully!");
          setSelectedRows(null);
          setSelectedOption(null);
          setIsModalVisible(false);
          CloseModal();
        })
        .catch((err) => {
          console.log("Error:", err);
          message.error("Error occurred while saving data.");
        });
    }
  };

  const status = [
    { value: "Done", label: "Done" },
    { value: "Pending", label: "Pending" },
  ];

  return (
    <div
      className="border  table_body"
      style={{
        overflowX: "auto",
        maxWidth: "100%",
        width: "100%",
        marginTop: "120px",
      }}>
      <div className="table-container">
        <Form form={form} component={false}>
          {inwardfms_data && (
            <Table
              columns={columnsWithFilter}
              dataSource={inwardfms_data}
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
              loading={inwardfms_data === null}
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
              title={() => "Inward Coil"}
            />
          )}
        </Form>
        <Modal
          title="FMS"
          open={isModalVisible}
          onOk={handlePostData}
          onCancel={() => setIsModalVisible(false)} // Close the modal on cancel
        >
          <div className="modal-content">
            <Select
              onChange={handleSelectOption}
              options={status} // Map the options array to include only the label
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Inward_Data;
