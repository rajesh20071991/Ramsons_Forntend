import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Typography,
  Popconfirm,
  Form,
  Tag,
  message,
  Modal,
  DatePicker,
  Input,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetPurchaseListData } from "../../redux/actions/storeActions";
import { Purc_Form } from "./form/ItemForm";
import { api } from "../../services/api";
import { SetModelId } from "../../redux/actions/modalAction";
import config from "../../config";
import dayjs from "dayjs";
import Select from "react-select";
import EditableCell from "../../components/Common/editablecell";
import { FaFilePdf } from "react-icons/fa";
import useFilter from "../../components/Common/useFilter";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Accessories2_form } from "../Inward/Form/accesd_form";

function ImageColumn({ images }) {
  return (
    <div>
      {images &&
        images.map((image, index) => (
          <a
            key={image.id}
            target="_blank"
            rel="noopener noreferrer"
            href={image.image}
            style={{ marginRight: "10px" }} // Add margin to the right of the image
          >
            Image {image.id}
          </a>
        ))}
    </div>
  );
}

const Purchaselist = () => {
  const Column_Col = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);

        if (record.final === "Pending") {
          // If status is 'Pending' and current date is greater than 3 days from the record date, show the edit button
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
      width: 70,
    },
    {
      title: "Date",
      dataIndex: "created_on",
      render: (created_on) => {
        const date = new Date(created_on);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return formattedDate;
      },
      width: 70, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fitting for this column
      sorter: true,
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("created_on"),
      }),
    },
    {
      title: "PO No.",
      dataIndex: "code",
      align: "center",
      sorter: true,
      width: 100, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("code"),
      }),
    },
    {
      title: "Company Name",
      dataIndex: "company",
      sorter: true,
      width: 150, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("company_id__company_name"),
      }),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="company"
            title="Company"
            inputType="select"
            record={record}
            index={index}
            selectOptions={companyNames}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Ship to",
      dataIndex: "ship",
      sorter: true,
      width: 150, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("ship_to__company_name"),
      }),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="ship"
            title="Ship To"
            inputType="select"
            record={record}
            index={index}
            selectOptions={companyNames}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Billing To.",
      dataIndex: "source",
      sorter: true,
      width: 150, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("source_type__company_name"),
      }),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="source"
            title="Source"
            inputType="select"
            record={record}
            index={index}
            selectOptions={companyNames}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      editable: true,
      sorter: true,
      width: 100, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("status"),
      }),
    },
    {
      title: "Freight",
      dataIndex: "freight",
      editable: true,
      sorter: true,
      width: 50, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("freight"),
      }),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      editable: true,
      sorter: true,
      width: 70, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("discount"),
      }),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      editable: true,
      sorter: true,
      width: 50, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("amount"),
      }),
    },
    {
      title: "Remark",
      dataIndex: "remarks",
      editable: true,
      sorter: true,
      width: 70, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("remarks"),
      }),
    },
    {
      title: "Budget",
      dataIndex: "budget",
      sorter: true,
      width: 100, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      // Pass the handleSort function as the onHeaderCell property
      onHeaderCell: () => ({
        onClick: () => handleSort("budget_id__type"),
      }),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="budget"
            title="Budget"
            inputType="select"
            record={record}
            index={index}
            selectOptions={budgets}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "final",
      sorter: true,
      autoFitWidth: true, // Enable auto fittin
      onHeaderCell: () => ({
        onClick: () => handleSort("final"),
      }),
    },
    {
      title: "Head Tally",
      dataIndex: "reference",
      sorter: true,
      width: 120, // Set a fixed width for this column
      autoFitWidth: true, // Enable auto fittin
      onHeaderCell: () => ({
        onClick: () => handleSort("reference"),
      }),
      render: (text, record, index) => {
        const isEditing = editingKey === record.id; // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="reference"
            title="Head Telly"
            inputType="select"
            record={record}
            index={index}
            selectOptions={budgetlists}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      autoFitWidth: true, // Enable auto fittin
      render: (imageArray, record) => {
        if (record.id === editingKey) {
          return (
            <div style={{ whiteSpace: "nowrap" }}>
              <input
                type="file"
                accept=".pdf,.jpg,.png" // Allow PDF, JPG, and PNG files
                onChange={(e) => onChangePicture(e, record)}
                multiple // Allow multiple file selection
              />
            </div>
          );
        } else {
          return <ImageColumn images={imageArray} />;
        }
      },
    },
    {
      title: "Generate PDF",
      dataIndex: "id",
      autoFitWidth: true, // Enable auto fittin
      render: (id, row) => (
        <PDFButton
          key={row.id}
          id={row.id}
          selected={selectedRow === row.id}
          handleSelection={handleSelection}
        />
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      with: 120,
      fixed: "right",
      render: (_, record) =>
        record.id ? (
          record.final === "Pending" ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeletes(record.id)}>
              <Tag bordered={false} color="blue">
                Delete
              </Tag>
            </Popconfirm>
          ) : (
            <Tag>-</Tag>
          )
        ) : null,
    },
  ];

  const expandedColumns = [
    {
      title: "Operation",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditings(record);
        if (record.status === "Pending") {
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => saves(record.id)}
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
              disabled={editingKeys !== ""}
              onClick={() => edits(record)}>
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
      title: "Code",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
      render: (text, record, index) => {
        const isEditing = isEditings(record); // Check if the current row is in edit mode
        return isEditing ? (
          <EditableCell
            editing={isEditing}
            dataIndex="code"
            title="Code"
            inputType="select"
            record={record}
            index={index}
            selectOptions={itemCode}>
            {text}
          </EditableCell>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "item_name",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description", // Assuming you want to display the rate from the first booking in each item
      key: "description",
      ellipsis: true,
    },
    {
      title: "Remarks",
      dataIndex: "rema", // Assuming you want to display the rate from the first booking in each item
      key: "rema",
      ellipsis: true,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: "rema",
        title: "Remarks",
        editing: isEditings(record),
      }),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      ellipsis: true,
    },
    {
      title: "GST %",
      dataIndex: "gst",
      key: "gst",
      ellipsis: true,
      // editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "gst",
        title: "GST %",
        editing: isEditings(record),
      }),
    },
    {
      title: "HSN Code",
      dataIndex: "hsnCode",
      key: "hsnCode",
      ellipsis: true,
      // editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "hsnCode",
        title: "HSN Code",
        editing: isEditings(record),
      }),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ellipsis: true,
      editable: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "quantity",
        title: "Quantity",
        editing: isEditings(record),
      }),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      ellipsis: true,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: "rate",
        title: "rate",
        editing: isEditings(record),
      }),
    },
    {
      title: "Total Amount",
      key: "amount",
      render: (_, record) => {
        const amount = record.quantity * record.rate;
        const totalGST = (record.gst * 100) / 100; // Assuming gst is already in percentage
        const total = amount * (1 + totalGST / 100);
        return total.toFixed(2); // Adjust the precision as needed
      },
      ellipsis: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        record.id ? (
          record.status === "Pending" ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}>
              <Tag bordered={false} color="blue">
                Delete
              </Tag>
            </Popconfirm>
          ) : null
        ) : (
          <Tag>"-"</Tag>
        ),
    },
  ];

  const updateDatas = (newItem) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = newData.findIndex((item) => newItem.key === item.key);
      if (index > -1) {
        newData.splice(index, 1, newItem);
      } else {
        newData.push(newItem);
      }
      return newData;
    });
  };

  const saves = async (key, record) => {
    console.log(key);
    try {
      const row = await form.validateFields();
      console.log(row);
      const newItem = {
        key: key, // Assuming the item has a 'key' property
        ...row,
      };
      updateDatas(newItem);
      setEditingKeys("");
      console.log("ddd", row);
      await api({
        api: "/api/polist/",
        method: "post",
        body: {
          common: row,
          post: 4,
          po: expandlerecord.id,
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
      message.error("Failed to save data.");
    }
  };

  const handleDeletes = (key) => {
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/polist/",
      method: "post",
      body: {
        post: 5,
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

  const handleDelete = (key) => {
    // Implement your delete logic here
    console.log("Deleting record with key:", key);
    // Delete the record from your data source
    api({
      api: "/api/polist/",
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

  const renderExpandedRow = (record) => {
    return (
      <Table
        columns={expandedColumns}
        dataSource={record.expandedData || []}
        pagination={false}
        size="small"
        rowKey={(book) => book.id}
        bordered
        scroll={{ x: true }}
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

  const PDFButton = ({ id, selected, handleSelection }) => {
    const handlePdfGeneration = () => {
      const pdfUrl =
        config.apiEndpoint + "/storeitem/poinvoice/pdf/" + id + "/0";
      window.open(pdfUrl, "_blank");
      handleSelection(id);
    };

    return (
      <Button
        onClick={handlePdfGeneration}
        style={{ backgroundColor: selected ? "red" : "inherit" }}>
        <FaFilePdf size={30} />
      </Button>
    );
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const handleSelection = (id) => {
    setSelectedRow(id);
  };

  var purchaselist = useSelector((state) => state.store.purchase_data);

  if (purchaselist) {
    var count = purchaselist.count;
    purchaselist = purchaselist.results;
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
  const { filter, setFilter, page, setPage } = useFilter("purchasedatafilter");

  const [refresh, setRef] = useState(false);
  const [form] = Form.useForm();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState(10);
  const [editingKey, setEditingKey] = useState("");
  const [editingKeys, setEditingKeys] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const isEditings = (record) => record.id === editingKeys;
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
    setEditingKeys("");
  };

  const edits = (record) => {
    form.setFieldsValue({
      vehicle_no: "",
      vehicle_type: "",
      driver_name: "",
      ...record,
    });
    setEditingKeys(record.id);
  };

  var [itemCode, setSkCode] = useState([]);
  var [item_names, setitemNames] = useState([]);
  var [description, setDesc] = useState([]);
  var [budgetlists, setBudgetlisted] = useState([]);
  var [budgets, setbudgets] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  useEffect(() => {
    api({ api: "/storeitem/itemlist/" }).then((data) => {
      setSkCode(data);
      var decs = [];
      data.map((item) => {
        decs.push({
          label: item.description,
          value: item.value,
          item_name: item.item_name,
          unit: item.item_unit,
          rate: item.rate,
          code: item.label,
        });
      });
      setDesc(decs);
      const names = data.map((item) => item.item_name);
      data = data.filter(
        ({ item_name }, index) => !names.includes(item_name, index + 1)
      );
      setOptions(data);
    });
    api({ api: "/storeitem/vendorlist/" }).then((data) => {
      setCompanyNames(data);
    });
    api({ api: "/storeitem/pbudget_filter/" }).then((data) => {
      setbudgets(data);
    });
    api({ api: "/storeitem/budgetlist/" }).then((data) => {
      setBudgetlisted(data);
    });
  }, []);

  function setOptions(data) {
    data.map((item) => {
      item_names.push({ label: item.item_name, value: item.value });
    });
    setitemNames([...item_names]);
  }

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
      GetPurchaseListData({
        size: size,
        page: page,
        filter: filter,
        order: { field: sortField, dir: sortDirection },
      })
    );
  }, [page, size, filter, refresh, sortField, sortDirection]);

  const handlePageChange = (pg) => {
    setPage(pg);
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

  const [storepoWithExpandedData, setStorepoWithExpandedData] = useState([]);

  const handleAdd = () => {
    const currentDate = new Date();
    if (expandlerecord) {
      const index = purchaselist.findIndex(
        (item) => item.id === expandlerecord.id
      );
      if (index !== -1) {
        let newBooking = {
          code: "",
          descriptions: "",
          gst: 0,
          hsncode: 0,
          item: "",
          quantity: 0,
          rate: 0,
          unit: "",
          bid_id: expandlerecord.id,
          status: "Pending",
          created_on: currentDate.toISOString(),
          amount: "0", // corrected typo "o" to "0"
        };

        // Clone the current state of expanded data
        const updatedPlanpipe = [...storepoWithExpandedData];

        // Find the record to update
        const recordToUpdate = updatedPlanpipe.find(
          (record) => record.id === expandlerecord.id
        );

        // Update the record with new expanded data
        if (recordToUpdate) {
          recordToUpdate.expandedData = [
            ...recordToUpdate.expandedData,
            newBooking,
          ];
        }

        // Update the state with the modified expanded data
        setStorepoWithExpandedData(updatedPlanpipe);
      }
    }
  };

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
    if (dataIndex === "company") {
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
    } else if (column.dataIndex === "company") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "ship") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "source") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "budget") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    } else if (column.dataIndex === "code") {
      return {
        ...column,
        ...getColumnSearchProps(column.dataIndex),
      };
    }
    return column;
  });

  const [expandlerecord, setExpandedRows] = useState();
  const [pictures, setPictures] = useState([]);

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
        api: "/api/polist/",
        method: "post",
        body: {
          common: row,
          post: 1,
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
      "/api/export/purchase/?from=" +
      from +
      "&to=" +
      to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

  const updateStorePoWithExpandedData = () => {
    if (purchaselist && Array.isArray(purchaselist)) {
      const updatedPlanpipeWithExpandedData = purchaselist.map((record) => ({
        ...record,
        expandedData:
          record.entity && Array.isArray(record.entity)
            ? record.entity.map((enty) => ({
                item_name: enty.item_name,
                description: enty.description,
                unit: enty.unit,
                rema: enty.rema,
                code: enty.code,
                gst: enty.gst,
                quantity: enty.quantity,
                hsnCode: enty.hsnCode,
                rate: enty.rate,
                status: enty.status,
                id: enty.id,
                po: enty.po_id,
              }))
            : [],
      }));
      setStorepoWithExpandedData(updatedPlanpipeWithExpandedData);
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

  useEffect(() => {
    updateStorePoWithExpandedData();
  }, [purchaselist]);

  return (
    <div className="purchaselist">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Purchase List</h4>
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
                <button
                  onClick={handleAdd}
                  className="btn btn-secondary add-btn"
                  type="primary"
                  style={{ marginBottom: "25px" }}>
                  Add a row
                </button>

                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle1"
                  role="button">
                  PO Generate
                </Link>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  style={{ marginBottom: "27px" }}
                  to="#exampleModalToggle2"
                  role="button">
                  Item Add
                </Link>
              </div>
              <Purc_Form />
              <Accessories2_form />
            </div>
          </div>
          <Form form={form} component={false}>
            {storepoWithExpandedData && (
              <Table
                columns={columnsWithFilter}
                dataSource={storepoWithExpandedData}
                expandable={{
                  expandedRowRender: renderExpandedRow,
                  expandedRowKeys: expandlerecord ? [expandlerecord.id] : [], // Use expandedRows state here
                  onExpand: (expanded, record) => {
                    setExpandedRows(expanded ? record : null);
                  },
                }}
                rowClassName="editable-row"
                rowKey={(record) => record.id}
                key={`${editingKey}-${selectedRow}`}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                loading={storepoWithExpandedData === null}
                pagination={{
                  total: count,
                  pageSize: size,
                  onChange: handlePageChange,
                  onShowSizeChange: handlePageSizeChange,
                  showSizeChanger: true,
                  pageSizeOptions: [10, 15, 20, 25, 30, 50, 70, 100],
                }}
                bordered
                size="small"
                scroll={{ x: 1500 }}
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

export default Purchaselist;
