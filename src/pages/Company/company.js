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
  DatePicker,
} from "antd";
import { useSelector } from "react-redux";
import { GetCompanyData } from "../../redux/actions/companyAction";
import { useDispatch } from "react-redux";
import { SetModelId } from "../../redux/actions/modalAction";
import { Companylist_Form } from "./form/companycreate";
import { Link } from "react-router-dom";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { api } from "../../services/api";
import Select from "react-select";
import EditableCell from "../../components/Common/editablecell";
import dayjs from "dayjs";

const Company_List_Data = () => {
  var companyData = useSelector((state) => state.CompanyData.company_data);
  var count;
  if (companyData) {
    count = companyData.count;
    var company_data = companyData.results;
  }
  const Company_Col = [
    {
      title: "Date",
      dataIndex: "created_on",
      render: (created_on) => {
        var today = new Date(created_on);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        return today;
      },
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Company ID",
      dataIndex: "company_id",
      sorter: (a, b) => a.company_id - b.company_id,
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Person Name",
      dataIndex: "person_name",
      sorter: (a, b) => a.person_name.localeCompare(b.person_name),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      sorter: (a, b) => a.company_name.localeCompare(b.company_name),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "GST No.",
      dataIndex: "gst_no",
      sorter: (a, b) => a.gst_no.localeCompare(b.gst_no),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Email ID",
      dataIndex: "emailid",
      sorter: (a, b) => a.emailid.localeCompare(b.emailid),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Phone No.",
      dataIndex: "phone_no",
      sorter: (a, b) => a.phone_no.localeCompare(b.phone_no),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Alternate No.",
      dataIndex: "alternate_no",
      sorter: (a, b) => a.alternate_no.localeCompare(b.alternate_no),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
      ellipsis: true,
      editable: true,
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "State",
      dataIndex: "state",
      sorter: (a, b) => a.state.localeCompare(b.state),
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Pin Code",
      dataIndex: "pincode",
      sorter: (a, b) => a.pincode - b.pincode,
      ellipsis: true,
      editable: true,
      showOnResponse: true,
      showOnDesktop: true,
    },
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
  ];

  const filtCols = {
    id: [],
    person_name: "",
    phone_no: "",
    created_on: {
      start: "",
      end: "",
    },
  }; //filter
  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem("currentFilter");
    return storedFilter ? JSON.parse(storedFilter) : filtCols;
  });

  const [refresh, setRef] = useState(true); //refresh table data

  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [size, setSize] = React.useState(10);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const [isMobileView, setIsMobileView] = useState(false);
  const dispatch = useDispatch();
  const [counts, setCount] = useState(0);
  const edit = (record) => {
    form.setFieldsValue({
      phone_no: "",
      address: "",
      city: "",
      ...record,
    });
    console.log("ddd", record);
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
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

  useEffect(() => {
    const storedFilter = localStorage.getItem("companyFilter");
    const storedPage = localStorage.getItem("companyPage");
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
    dispatch(
      GetCompanyData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  useEffect(() => {
    localStorage.setItem("companyFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("companyPage", page.toString());
  }, [page]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };

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
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleFilterColumnChange = (selectedOption) => {
    setSelectedColumn(selectedOption ? selectedOption.value : null);
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
    if (dataIndex === "company_name") {
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

  const columnsWithFilter = Company_Col.map((column) => {
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
          editing: isEditing(record),
        }),
      };
    }
    if (column.dataIndex === "created_on") {
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
        api: "/api/company/",
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

  const handleFilterKeywordChange = (e) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [selectedColumn]: value.trim() !== "" ? value : undefined,
    }));
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
    <div
      className="border  table_body"
      style={{ overflowX: "auto", maxWidth: "100%", width: "100%" }}>
      <div className="table-container">
        <Typography.Title style={{ color: "blue" }} level={5}>
          Company List
        </Typography.Title>
        <div className="ms-auto filter-component">
          <Link
            className="btn btn-success add-btn"
            style={{ textAlign: "center" }}
            data-bs-toggle="modal"
            to="#exampleModalToggle"
            role="button">
            <i className="fa fa-plus me-1">Add Item</i>
          </Link>
        </div>
        <Companylist_Form />
        <Form form={form} component={false}>
          {company_data && (
            <Table
              columns={columnsWithFilter}
              dataSource={company_data}
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
              responsive={{
                xs: "stack",
                sm: "stack",
                md: "stack",
                lg: "stack",
                xl: "stack",
                xxl: "stack",
              }}
              scroll={{ x: true }}
              loading={company_data === null}
              onChange={(pagination, filters, sorter) => {
                setFilter(filters);
              }}
              mobileBreakPoint={768}
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

export default Company_List_Data;
