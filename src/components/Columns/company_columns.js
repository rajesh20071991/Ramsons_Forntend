import PaymentFrom from "../../pages/Accounts/Form/Payment";
import EditAmountFrom from "../../pages/Accounts/Form/editamount";
import EditCompanyViewForm from "../../pages/Company/edit_company";
import EditDetailsFrom from "../../pages/Summary/form/editdetails";
import { Link } from "react-router-dom";
export const Accounts_Col = [
  {
    name: "Remarks Update",
    wrap: true,
    selector: (row) => {
      return <EditDetailsFrom data={row} />;
    },
  },
  {
    name: "Date",
    wrap: true,
    selector: (row) => {
      var today = new Date(row.date);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    sortable: true,
  },
  {
    name: "Type",
    wrap: true,
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Sub Type",
    wrap: true,
    selector: (row) => row.subtype,
    sortable: true,
  },
  {
    name: "Quantity",
    wrap: true,
    selector: (row) => row.quantity,
    sortable: true,
  },
  {
    name: "Amount",
    wrap: true,
    selector: (row) => row.amount,
    sortable: true,
  },
];

export const Amounts_Col = [
  {
    name: "Edit",
    wrap: true,
    selector: (row) => {
      return <EditAmountFrom data={row} />;
    },
  },
  {
    name: "Invoice No.",
    sortable: true,
    wrap: true,
    cell: (row) => (
      <div>
        <Link to={"/Accounts/account_view/" + row.id + "/"}>{row.invoice}</Link>
      </div>
    ),
  },

  {
    name: "Invoice Date",
    wrap: true,
    selector: (row) => {
      var today = new Date(row.date);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    sortable: true,
  },
  {
    name: "Due Date",
    wrap: true,
    selector: (row) => {
      const dueDate = new Date(row.date);
      dueDate.setDate(dueDate.getDate() + 7);
      const dd = dueDate.getDate().toString().padStart(2, "0");
      const mm = (dueDate.getMonth() + 1).toString().padStart(2, "0");
      const yyyy = dueDate.getFullYear().toString();
      return `${dd}/${mm}/${yyyy}`;
    },
    sortable: true,
  },
  {
    name: "Invoice Amount",
    wrap: true,
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: "Payment Update",
    wrap: true,
    selector: (row) => row.payment,
    sortable: true,
  },
  {
    name: "Amount Due",
    wrap: true,
    selector: (row) => Number(row.amount) - Number(row.payment),
    sortable: true,
  },
  {
    name: "Interest Payable",
    wrap: true,
    selector: (row) => row.interest_paid,
    sortable: true,
  },
  {
    name: "Interest Reciever",
    wrap: true,
    selector: (row) => row.interest_reciver,
    sortable: true,
  },
  // {
  //   name: "Interest Charges",
  //   wrap: true,
  //   selector: (row) => {
  //     const amount = Number(row.amount);
  //     const payment = Number(row.payment);
  //     const dueDate = new Date(row.date);
  //     dueDate.setDate(dueDate.getDate() + 7);

  //     if (!payment && new Date() > dueDate) {
  //       const interest = amount * 0.11;
  //       return interest.toFixed(2);
  //     } else if (payment < amount && new Date() > dueDate) {
  //       const unpaidAmount = amount - payment;
  //       const interest = unpaidAmount * 0.11;
  //       return interest.toFixed(2);
  //     } else if (payment && new Date(payment) <= dueDate) {
  //       return "0.00";
  //     } else {
  //       return "0.00";
  //     }
  //   },
  //   sortable: true,
  // },
  {
    name: "Click to Pay",
    wrap: true,
    selector: (row) => {
      return <PaymentFrom data={row} />;
    },
  },
];

export const Accoun_Col = [
  {
    name: "S.No.",
    wrap: true,
    selector: (row) => row.serial,
    sortable: true,
  },
  {
    name: "Type",
    wrap: true,
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Quantity",
    wrap: true,
    selector: (row) => row.total_quantity,
    sortable: true,
  },
  {
    name: "Amount",
    wrap: true,
    selector: (row) => row.total_amount,
    sortable: true,
  },
];

export const Ledger_Col = [
  {
    name: "Edit",
    wrap: true,
    selector: (row) => {
      return <EditCompanyViewForm data={row} />;
    },
  },
  {
    name: "Date",
    wrap: true,
    selector: (row) => {
      var today = new Date(row.created_on);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    sortable: true,
  },
  {
    name: "Name",
    wrap: true,
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Month",
    wrap: true,
    selector: (row) => row.month,
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Amount",
    wrap: true,
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: "Remarks",
    wrap: true,
    selector: (row) => row.remarks,
    sortable: true,
  },
];
