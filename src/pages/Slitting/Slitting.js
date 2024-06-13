import React, { useEffect, useState } from "react";
import { Table, Input, Button, Form, DatePicker } from "antd";
import { useSelector } from "react-redux";
import { GetSlitCoilData } from "../../redux/actions/planningAction";
import { useDispatch } from "react-redux";
import { SetModelId } from "../../redux/actions/modalAction";
import { Create_slitting_form } from "./form/slitting_form";
import { Link } from "react-router-dom";
import "../../components/Common/style/button.css";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const Slitting = () => {
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
      dataIndex: "coil",
      key: "coil",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
    },
    {
      title: "Width",
      dataIndex: "widths",
      key: "widths",
      sorter: true,
    },
    {
      title: "Total Widths",
      dataIndex: "total_widths",
      key: "total_widths",
      sorter: true,
      render: (text) => <span>{Number(text).toFixed(2)}</span>,
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      sorter: true,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "planning_status",
      key: "planning_status",
      sorter: true,
    },
  ];
  var slitting_plan = useSelector((state) => state.PlanningData.plan_viewcoil);
  if (slitting_plan) {
    var count = slitting_plan.count;
    var slitting_plan_data = slitting_plan.results;
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
  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem("slittedFilter");
    return storedFilter ? JSON.parse(storedFilter) : filtCols;
  });

  const [refresh, setRef] = useState(true);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("slittedPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [size, setSize] = useState(10);
  const [counts, setCount] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetSlitCoilData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  const refreshTableData = () => {
    dispatch(
      GetSlitCoilData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  };

  useEffect(() => {
    const storedFilter = localStorage.getItem("slittedFilter");
    const storedPage = localStorage.getItem("slittedPage");
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
    localStorage.setItem("slittingfmsFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("slittingfmsPage", page.toString());
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
          {slitting_plan_data && (
            <Table
              columns={columnsWithFilter}
              dataSource={slitting_plan_data}
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
              loading={slitting_plan_data === null}
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
              title={() => "Slitting"}
            />
          )}
        </Form>
      </div>
    </div>
  );
};

export default Slitting;
