import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { GetAccountView } from "../../redux/actions/companyAction";
import EditPayment_From from "./Form/editpayment";
import { api } from "../../services/api";
import { FcDeleteRow } from "react-icons/fc";
import CustomConfirmAlert from "../../components/Common/CustomConfirmAlert";
const Account_View = () => {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const Payment_Col = [
    {
      name: "Edit",
      wrap: true,
      selector: (row) => {
        return <EditPayment_From data={row} />;
      },
    },
    {
      name: "Date",
      wrap: true,
      selector: (row) => {
        var today = new Date(row.amount_date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        return today;
      },
      sortable: true,
    },
    {
      name: "Invoice No.",
      wrap: true,
      selector: (row) => row.Invoice,
      sortable: true,
    },
    {
      name: "Interest Payable",
      wrap: true,
      selector: (row) => row.interest,
      sortable: true,
    },
    {
      name: "Interest Receiver",
      wrap: true,
      selector: (row) => row.Reciever,
      sortable: true,
    },
    {
      name: "Amount",
      wrap: true,
      selector: (row) => row.Amount,
      sortable: true,
    },
    {
      name: "Actions",
      wrap: true,
      cell: (row) => (
        <div>
          <button color="danger" onClick={() => handleDelete(row.id)}>
            <FcDeleteRow size={30} />
          </button>
        </div>
      ),
    },
  ];

  var data = useSelector((state) => state.CompanyData.accountviews);
  const dispatch = useDispatch();
  let { id } = useParams();
  console.log(data);
  useEffect(() => {
    dispatch(GetAccountView("/api/amount/" + id + "/"));
  }, []);

  const handleDelete = (id) => {
    setIdToDelete(id);
    setShowConfirmAlert(true);
  };

  const [datas, setData] = useState([]);
  const confirmDelete = (id) => {
    api({
      api: "/api/amount/",
      method: "post",
      body: { common: idToDelete, post: 5 },
    })
      .then((result) => {
        if (result.status === "success") {
          const newData = datas.filter((row) => row.id !== idToDelete);
          setData(newData);
        } else {
          console.log(result.message);
          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
  };

  const cancelDelete = () => {
    setShowConfirmAlert(false);
    setIdToDelete(null);
  };

  return (
    <div className="view">
      <div className="table">
        <div className="border m-2 table_body table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#Payment Details</h4>
              <div className="ms-auto filter-component d-flex"></div>
            </div>
          </div>
          {data && (
            <DataTable
              columns={Payment_Col}
              data={data}
              selectableRowsComponent={Checkbox}
              dense
              highlightOnHover
              pointerOnHover
              selectableRows
              persistTableHead
              handleDelete={handleDelete}
              striped
              responsive
              noHeader
              onRowClicked={(row) => console.log(row)}
              onRowDoubleClicked={(row) => console.log(row)}
              actions={[
                {
                  icon: "trash",
                  tooltip: "Delete Payment",
                  onClick: handleDelete,
                },
              ]}
            />
          )}
        </div>
        {showConfirmAlert && (
          <CustomConfirmAlert
            title="Confirm Delete"
            message="Are you sure you want to delete this payment?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Account_View;
