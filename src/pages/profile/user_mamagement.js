import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetUserManagementData } from "../../redux/actions/accountAction";

const UserManagementTable = () => {
  const data = useSelector((state) => state.account.usermanage);
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);
  const [refresh, setRef] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetUserManagementData({
        size: size,
        page: page,
        // filter: filter,
      })
    );
  }, [page, size, refresh]);
  const columns = [
    {
      title: "Profile Pic",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        if (!image) {
          return "-";
        }
        return (
          <img
            src={image}
            alt="Profile Pic"
            style={{ width: 50, height: 50 }}
          />
        );
      },
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Employee ID",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Date of Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (birthday) => {
        const date = new Date(birthday);
        const formattedDate = `${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`;
        return formattedDate;
      },
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (gender === "m" ? "Male" : "Female"),
    },
    {
      title: "Phone No.",
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleAccess(record.id)}>
          Access
        </Button>
      ),
    },
  ];

  function handlePageChange(currentPage) {
    setPage(currentPage);
  }

  function handlePageSizeChange(currentSize) {
    setSize(currentSize);
  }
  const handleAccess = (userId) => {
    // Handle access button click, e.g., navigate to user access page
    console.log("Access button clicked for user ID:", userId);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: "16px", float: "right" }}
        //   onClick={() => handleAddUser()}
      >
        Add User
      </Button>
      {data && (
        <Table
          columns={columns}
          dataSource={data.results}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: size,
            total: data.count,
            onChange: handlePageChange,
            onShowSizeChange: handlePageSizeChange,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
          rowSelection={{
            type: "checkbox",
            columnTitle: "#",
          }}
          size="middle"
          bordered
          responsive
        />
      )}
    </>
  );
};

export default UserManagementTable;
