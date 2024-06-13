import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Modal,
  Button,
  Form,
  message,
  DatePicker,
  Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { GetMotherCoilDataW } from "../../redux/actions/inwardActions";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { api } from "../../services/api";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { SetModelId } from "../../redux/actions/modalAction";

const MotherCoilW = () => {
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
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
    },
    {
      title: "Coil No.",
      dataIndex: "coil",
      key: "coil",
      align: "center",
      sorter: (a, b) => a.coil - b.coil,
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      align: "center",
      width: "20%",
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Origin Coil No",
      dataIndex: "origin_coil_no",
      key: "origin_coil_no",
      align: "center",
      sorter: (a, b) => a.origin_coil_no.localeCompare(b.origin_coil_no),
    },
    {
      title: "Challan No",
      dataIndex: "challan_no",
      key: "challan_no",
      align: "center",
      sorter: (a, b) => a.challan_no.localeCompare(b.challan_no),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      sorter: (a, b) => a.grade.localeCompare(b.grade),
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      key: "thickness",
      align: "center",
      sorter: (a, b) => a.thickness - b.thickness,
    },
    {
      title: "Challan Weight",
      dataIndex: "chalan_weight",
      key: "chalan_weight",
      align: "center",
      sorter: (a, b) => a.chalan_weight - b.chalan_weight,
    },
    {
      title: "Scrap",
      dataIndex: "scrap",
      key: "scrap",
      align: "center",
      sorter: (a, b) => a.scrap - b.scrap,
    },
    {
      title: "Paper",
      dataIndex: "paper",
      key: "paper",
      align: "center",
      sorter: (a, b) => a.paper - b.paper,
    },
    {
      title: "Seelve",
      dataIndex: "seelve",
      key: "seelve",
      align: "center",
      sorter: (a, b) => a.seelve - b.seelve,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      sorter: (a, b) => a.status - b.status,
    },
  ];

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
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      ellipsis: true,
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
      rowSelection={{
        type: "checkbox",
        columnTitle: "",
        columnWidth: "30px",
        onChange: handleRowSelection,
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

  var coildispatch = useSelector((state) => state.inwardData.mother_coil_data);
  if (coildispatch) {
    var count = coildispatch.count;
    var coil_disp = coildispatch.results;
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
    const storedFilter = localStorage.getItem("slittedcoilFilter");
    return storedFilter ? JSON.parse(storedFilter) : filtCols;
  });

  const [refresh, setRef] = useState(true);
  const [columns, setColumns] = useState([]);
  const [form] = Form.useForm();
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("slittedcoilPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [size, setSize] = useState(10);
  const [counts, setCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetMotherCoilDataW({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, filter, refresh]);

  useEffect(() => {
    const storedFilter = localStorage.getItem("slittedcoilFilter");
    const storedPage = localStorage.getItem("slittedcoilPage");
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
    localStorage.setItem("slittedcoilFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("slittedcoilPage", page.toString());
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

  let planpipeWithExpandedData = [];
  if (coil_disp && Array.isArray(coil_disp)) {
    planpipeWithExpandedData = coil_disp.map((record) => ({
      ...record,
      expandedData:
        record.slittedcoil && Array.isArray(record.slittedcoil)
          ? record.slittedcoil.map((coiled) => ({
              coil: coiled.coil,
              width: coiled.width,
              weight: coiled.weight,
              final_status: coiled.final_status,
              slitting_status: coiled.slitting_status,
              remaining_type: coiled.remaining_type,
              companyId: coiled.companyId,
              coilId: coiled.storeId,
              id: coiled.id,
            }))
          : [],
    }));
  }

  const [scrap, setscrap] = React.useState([]);
  useEffect(() => {
    api({ api: "/storeitem/storei/" })
      .then((data) => {
        setscrap(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor names:", error);
      });
  }, []);

  const statusdata = [
    { value: "Mother Coil", label: "Mother Coil" },
    { value: "Slitted Coil", label: "Slitted Coil" },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCoil, setSelectedCoil] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scrapValue, setScrapValue] = useState(0);
  const [seelveValue, setSeelveValue] = useState(0);
  const [paperValue, setPaperValue] = useState(0);
  function handleRowSelection(selectedRowKeys, selectedRows) {
    const selectedRowData = selectedRows.map((row) => ({
      id: row.id,
      coil: row.coil,
      status: row.final_status,
      coil_id: row.coilId,
      company: row.companyId,
    }));
    setSelectedRows(selectedRowData);
    setSelectedOption(null);

    if (selectedRowKeys.length > 0) {
      setIsModalVisible(true); // Open the modal when at least one row is selected
    } else {
      setIsModalVisible(false); // Close the modal when no row is selected
    }
  }
  const handleSelectOption = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectedStatus(selectedOption.value);
  };

  const handleSelectOptions = (selectedCoil) => {
    setSelectedCoil(selectedCoil);
    if (selectedCoil) {
      const selectedScrap = scrap.find(
        (item) => item.label === selectedCoil.label
      );
      if (selectedScrap) {
        setScrapValue(selectedScrap.balance);
        setSeelveValue(selectedScrap.seleeve_weight);
        setPaperValue(selectedScrap.paper_weight);
      } else {
        setScrapValue(0);
        setSeelveValue(0);
        setPaperValue(0);
      }
    } else {
      setScrapValue(0);
      setSeelveValue(0);
      setPaperValue(0);
    }
  };

  const handlePostData = async (e) => {
    e.preventDefault();
    console.log("Selected Row Data:", selectedRows);
    console.log("Selected Option:", selectedStatus);
    console.log("Selected Coil:", selectedCoil);
    console.log("Scrap Value:", scrapValue);
    console.log("Seelve Value:", seelveValue);
    console.log("Paper Value:", paperValue);
    api({
      api: "/api/coil_dispatch/",
      method: "post",
      body: {
        form: selectedRows,
        status: selectedOption,
        coil: selectedCoil,
        scrap: scrapValue,
        seelve: seelveValue,
        paper: paperValue,
        post: 1,
      },
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

  const closeModals = () => {
    setIsModalVisible(false);
  };

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
        <Form form={form} component={false}>
          {coil_disp && (
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
                getCheckboxProps: (record) => ({
                  checked: record.status === "Instock", // Check the row if the value is 'Instock'
                  disabled: record.status !== "Instock", // Disable the checkbox if the value is not 'Instock'
                }),
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
              loading={coil_disp === null}
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
            />
          )}
        </Form>

        <Modal
          title="Coil Dispatch"
          layout="inline"
          open={isModalVisible}
          onOk={handlePostData}
          style={{ maxWidth: 600 }}
          onCancel={closeModals} // Close the modal on cancel
        >
          <Form.Item label="Dispatch">
            <Select
              value={selectedOption}
              onChange={handleSelectOption}
              options={statusdata}
            />
          </Form.Item>

          {selectedStatus === "Slitted Coil" && (
            <>
              <Form.Item label="Status">
                <Select
                  value={selectedCoil}
                  onChange={handleSelectOptions}
                  options={scrap}
                />
              </Form.Item>
              <Form.Item className="control-label" label="Scrap">
                <Input
                  type="number"
                  placeholder="Scrap"
                  value={scrapValue}
                  onChange={(e) => setScrapValue(Number(e.target.value))}
                />
              </Form.Item>
              <Form.Item label="Seelve">
                <Input
                  type="number"
                  placeholder="Seelve"
                  value={seelveValue}
                  onChange={(e) => setSeelveValue(Number(e.target.value))}
                />
              </Form.Item>
              <Form.Item label="Paper">
                <Input
                  type="number"
                  placeholder="Paper"
                  value={paperValue}
                  onChange={(e) => setPaperValue(Number(e.target.value))}
                />
              </Form.Item>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MotherCoilW;
