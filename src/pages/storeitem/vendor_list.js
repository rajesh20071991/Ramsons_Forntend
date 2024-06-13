import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { api } from "../../services/api";
import Select from "react-select";
import { SetModelId } from "../../redux/actions/modalAction";
import { GetVendorData } from "../../redux/actions/storeActions";
import { Link } from "react-router-dom";
import { Vendor_forms } from "./form/vendorForm";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import config from "../../config";
import {
  Table,
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
import dayjs from "dayjs";
import useFilter from "../../components/Common/useFilter";
import EditableCell from "../../components/Common/editablecell";

const Vendor_List_Data = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);

        if (record.status === "Pending") {
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
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("created_on"),
      }),
    },
    {
      title: "Company ID",
      dataIndex: "company_code",
      align: "center",
      render: (company_code, row) => (
        <Link to={`/storeitem/vendorlistview/${row.id}`}>{company_code}</Link>
      ),
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("company_code"),
      }),
    },
    {
      title: "Person Name",
      dataIndex: "contact_name",
      editable: true,
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("contact_name"),
      }),
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      width: 200,
      editable: true,
      ellipsis: true,
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("company_name"),
      }),
    },
    {
      title: "GST No.",
      dataIndex: "gst_no",
      width: 150,
      editable: true,
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("gst_no"),
      }),
    },
    {
      title: "Email ID",
      dataIndex: "email_id",
      key: "email",
      editable: true,
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("email_id"),
      }),
    },
    {
      title: "Phone No.",
      dataIndex: "mobile_no",
      key: "phone",
      editable: true,
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("mobile_no"),
      }),
    },
    {
      title: "Address",
      dataIndex: "shipping_add",
      key: "address",
      editable: true,
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("shipping_add"),
      }),
      width: 200, // Set initial width for the column
    },
    {
      title: "City",
      dataIndex: "shipping_city",
      key: "city",
      editable: true,
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("shipping_city"),
      }),
    },
    {
      title: "State",
      dataIndex: "shipping_state",
      key: "state",
      editable: true,
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("shipping_state"),
      }),
    },
    {
      title: "Pin Code",
      dataIndex: "pin_code",
      key: "pinCode",
      editable: true,
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("pin_code"),
      }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("status"),
      }),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageArray, record) => {
        const imageUrl =
          imageArray && imageArray.length > 0 ? imageArray[0].image : "";
        if (record.id === editingKey) {
          return (
            <div style={{ whiteSpace: "nowrap" }}>
              {/* Ensure input stays in one line */}
              <input
                type="file"
                onChange={(e) => onChangePicture(e, record)}
                multiple // Allow multiple file selection
              />
            </div>
          );
        } else {
          return imageUrl ? (
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: "10px" }}>
              Image
            </a>
          ) : null;
        }
      },
    },
  ];

  var vendorlists = useSelector((state) => state.store.vendor_data);

  if (vendorlists) {
    var count = vendorlists.count;
    vendorlists = vendorlists.results;
  }

  const filtCols = {
    id: [],
    company_name: "",
    company_id__id: "",
    chalan_width: "",
    status: "",
    created_on: {
      start: "",
      end: "",
    },
  }; //filter
  const { filter, setFilter, page, setPage } = useFilter("vendorlistfilter");
  const [refresh, setRef] = useState(false);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState(10);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const [counts, setCount] = useState(0);
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState(""); // State variable for sort column
  const [sortDirection, setSortDirection] = useState("");

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

  const [companyNames, setCompanyNames] = useState("");
  useEffect(() => {
    api({ api: "/storeitem/vendorlist/" })
      .then((data) => {
        setCompanyNames(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
  }, []);

  useEffect(() => {
    // Update local storage whenever count changes
    localStorage.setItem("counts", counts.toString());
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      console.log("89890", sortField);
      // If the same field is clicked again, toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      console.log("89890", sortField);
      // If a different field is clicked, set the sort field to the new field and default the direction to 'asc'
      setSortField(field);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    dispatch(
      GetVendorData({
        size: size,
        page: page,
        filter: filter,
        order: { field: sortField, dir: sortDirection },
      })
    );
  }, [page, size, filter, refresh, sortField, sortDirection]);

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
              options={
                Array.isArray(companyNames)
                  ? companyNames.map((vendorname) => ({
                      label: vendorname.label,
                      value: vendorname.label,
                    }))
                  : []
              }
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
    } else if (column.dataIndex === "image") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

  const [pictures, setPictures] = useState([]);
  console.log(pictures);

  const onChangePicture = (e) => {
    const newPictures = Array.from(e.target.files);

    const promises = newPictures.map((picture) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const { result } = event.target;
          resolve(result);
        };

        reader.onerror = (err) => {
          reject(err);
        };

        reader.readAsDataURL(picture);
      });
    });

    Promise.all(promises)
      .then((base64Pictures) => {
        setPictures((prevPictures) => [...prevPictures, ...base64Pictures]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateData = (newData) => {
    setData(newData);
  };

  const save = async (key) => {
    try {
      // assuming you have form and api functions defined
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
      await api({
        api: "/api/vendorlist/",
        method: "post",
        body: {
          common: row,
          post: 4,
          id: key,
          images: pictures,
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
      message.error("Validate Failed:", errInfo);
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
      "/api/export/vendor/?from=" +
      from +
      "&to=" +
      to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

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
    <div className="vendor">
      <div className="table">
        <div className="border m-3 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#Vendor List</h4>
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
                <br />
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button">
                  <i className="fa fa-plus me-1">Add Item</i>
                </Link>
              </div>
              <Vendor_forms />
            </div>
          </div>
          <Form form={form} component={false}>
            {vendorlists && (
              <Table
                columns={columnsWithFilter}
                dataSource={vendorlists}
                rowClassName="editable-row"
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                loading={vendorlists === null}
                onChange={(pagination, filters, sorter) => {
                  setFilter(filters);
                }}
                pagination={{
                  total: count,
                  pageSize: size,
                  onChange: handlePageChange,
                  onShowSizeChange: handlePageSizeChange,
                  showSizeChanger: true,
                  pageSizeOptions: [10, 15, 20, 25, 30, 50, 70, 100],
                }}
                rowKey="id"
                scroll={{ x: "max-content" }} // Add this if you have horizontal scroll
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
    </div>
  );
};

export default Vendor_List_Data;
