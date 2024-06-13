import React, { useEffect, useState } from "react";
import {
  Table,
  Checkbox,
  Menu,
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
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetModelId } from "../../redux/actions/modalAction";
import { EndPointApi, api } from "../../services/api";
import config from "../../config";
import EditableCell from "../../components/Common/editablecell";
import useFilter from "../../components/Common/useFilter";
import dayjs from "dayjs";
import { GetScrap_DatDispatch } from "../../redux/actions/dispatchAction";
import { Scrapdata_form } from "../Dispatch/form/scrap_from";
const ScrapData_Dispatch = () => {
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
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
    },
    {
      title: "Dispatch Code",
      dataIndex: "dispatch_code",
      key: "dispatch_code",
      sorter: (a, b) => a.dispatch_code.localeCompare(b.dispatch_code),
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      width: "7%",
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Scrap",
      dataIndex: "scrap_weight",
      key: "scrap_weight",
      align: "center",
      sorter: (a, b) => a.scrap_weight.localeCompare(b.scrap_weight),
    },
    {
      title: "Paper",
      dataIndex: "paper_weight",
      key: "paper_weight",
      align: "center",
      sorter: (a, b) => a.paper_weight.localeCompare(b.paper_weight),
    },
    {
      title: "Seleeve",
      dataIndex: "seleeve_weight",
      key: "seleeve_weight",
      align: "center",
      sorter: (a, b) => a.seleeve_weight.localeCompare(b.seleeve_weight),
    },
    {
      title: "Total Weight",
      dataIndex: "chalan_weight",
      key: "chalan_weight",
      align: "center",
      sorter: (a, b) => a.chalan_weight - b.chalan_weight,
      render: (text, record) => {
        const totalWeight =
          (Number(record.paper_weight) || 0) +
          (Number(record.seleeve_weight) || 0) +
          (Number(record.scrap_weight) || 0);

        return Number.isNaN(totalWeight) || totalWeight === 0
          ? ""
          : totalWeight.toFixed(2);
      },
    },
    {
      title: "Vehicl Entry",
      children: [
        {
          title: "Ship To",
          dataIndex: "ship_to",
          key: "ship_to",
          width: "12%",
          sorter: (a, b) => a.ship_to - b.ship_to,
          render: (text, record, index) => {
            const isEditing = editingKey === record.id; // Check if the current row is in edit mode
            return isEditing ? (
              <EditableCell
                editing={isEditing}
                dataIndex="ship_to"
                title="Ship to"
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
          title: "Vehicle No.",
          dataIndex: "vehicle_no",
          sorter: (a, b) => a.vehicle_no - b.vehicle_no,
          render: (_, record) => {
            const editable = isEditing(record);

            return editable ? (
              <Form.Item
                name="vehicle_no"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please input the vehicle number",
                  },
                ]}>
                <Input />
              </Form.Item>
            ) : (
              <div style={{ cursor: "pointer" }} onClick={() => edit(record)}>
                {record.vehicle_no}
              </div>
            );
          },
        },
        {
          title: "Vehicle Type",
          dataIndex: "vehicle_type",
          key: "vehicle_type",
          sorter: (a, b) => a.vehicle_type - b.vehicle_type,
          render: (text, record, index) => {
            const isEditing = editingKey === record.id; // Check if the current row is in edit mode
            return isEditing ? (
              <EditableCell
                editing={isEditing}
                dataIndex="vehicle_type"
                title="Ship to"
                inputType="select"
                record={record}
                index={index}
                selectOptions={Vehicle}>
                {text}
              </EditableCell>
            ) : (
              <span>{text}</span>
            );
          },
        },
        {
          title: "Driver Name",
          dataIndex: "driver_name",
          key: "driver_name",
          sorter: (a, b) => a.driver_name - b.driver_name,
          render: (_, record) => {
            const editable = isEditing(record);

            return editable ? (
              <Form.Item
                name="driver_name"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please input the vehicle number",
                  },
                ]}>
                <Input />
              </Form.Item>
            ) : (
              <div style={{ cursor: "pointer" }} onClick={() => edit(record)}>
                {record.driver_name}
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        const menu = (
          <Menu onClick={(e) => handleMenuClick(record.id, e)}>
            <Menu.Item key="pdf">PDF</Menu.Item>
            <Menu.Item key="email">Email Send</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              style={{ color: "blue" }}
              onClick={(e) => e.preventDefault()}>
              PDF Menu
            </a>
          </Dropdown>
        );
      },
    },
  ];

  function handleMenuClick(id, e) {
    const action = e.key;
    let endpoint = "";

    switch (action) {
      case "pdf":
        endpoint = `${EndPointApi}/dispatch/generatescrap/pdf/${id}/0`;
        break;
      case "email":
        endpoint = `${EndPointApi}/dispatch/generatescrap/pdf/${id}/1`;
        break;
      default:
        break;
    }
    window.open(endpoint, "_blank");
    // You can perform any action with the generated endpoint here, such as opening a new tab or sending a request.

    console.log("Endpoint:", endpoint);
  }

  const Vehicle = [
    { value: "Truck", label: "Truck" },
    { value: "Tractor", label: "Tractor" },
    { value: "Pickup", label: "Pickup" },
    { value: "Tempo", label: "Tempo" },
    { value: "Auto", label: "Auto" },
  ];

  const expandedColumns = [
    {
      title: "Coil No",
      dataIndex: "coil",
      key: "coil",
      ellipsis: true,
    },
    {
      title: "origin Coil No.",
      dataIndex: "origin",
      key: "origin",
      ellipsis: true,
    },
    {
      title: "Challan No.",
      dataIndex: "challan_no",
      key: "challan_no",
      ellipsis: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      ellipsis: true,
    },
    {
      title: "Net Weight",
      dataIndex: "net_weight",
      key: "net_weight",
      ellipsis: true,
    },
    {
      title: "Scrap",
      dataIndex: "weight",
      key: "weight",
      ellipsis: true,
    },
    {
      title: "Paper",
      dataIndex: "paper_weight",
      key: "paper_weight",
      ellipsis: true,
    },
    {
      title: "Seleeve",
      dataIndex: "seleeve_weight",
      key: "seleeve_weight",
      ellipsis: true,
    },
    {
      title: "Total Weight",
      dataIndex: "weights",
      key: "weights",
      ellipsis: true,
      render: (value) => parseFloat(value).toFixed(2),
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
      rowSelection={{
        type: "checkbox",
        columnTitle: "",
        columnWidth: "30px",
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
  const scrapjdispatch = useSelector((state) => state.DispatchData.Coil_data);

  if (scrapjdispatch) {
    var count = scrapjdispatch.count;
    var ScrapJWDispatch = scrapjdispatch.results;
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
  const { filter, setFilter, page, setPage } = useFilter("ScrapJWDfilter");
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
      GetScrap_DatDispatch({
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
    if (column.dataIndex === "dispatch_code") {
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

  let planpipeWithExpandedData = [];
  if (ScrapJWDispatch && Array.isArray(ScrapJWDispatch)) {
    planpipeWithExpandedData = ScrapJWDispatch.map((record) => ({
      ...record,
      expandedData:
        record.scrap && Array.isArray(record.scrap)
          ? record.scrap.map((coiled) => ({
              coil: coiled.coil,
              grade: coiled.grade,
              net_weight: coiled.net_weight,
              origin: coiled.origin,
              challan_no: coiled.challan_no,
              weight: coiled.weight,
              paper_weight: coiled.paper_weight,
              seleeve_weight: coiled.seleeve_weight,
              weights: coiled.weights,
            }))
          : [],
    }));
  }

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
        api: "/api/coil_extra/",
        method: "post",
        body: {
          common: row,
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
      "/api/export/dsjobwork/?from=" +
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
      style={{
        overflowX: "auto",
        maxWidth: "100%",
        width: "100%",
        marginTop: "150px",
      }}>
      <div className="table-container">
        <Link
          className="btn btn-success add-btn"
          data-bs-toggle="modal"
          to="#exampleModalToggle"
          style={{ marginBottom: "20px" }}
          role="button">
          Scrap Details
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
        <Scrapdata_form />
        <Form form={form} component={false}>
          {ScrapJWDispatch && (
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
              loading={ScrapJWDispatch === null}
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
              title={() => "Job Work Dispatch"}
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

export default ScrapData_Dispatch;
