export const DeviceList_Col = [
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
    name: "Device ID",
    wrap: true,
    selector: (row) => row.code,
    sortable: true,
  },
  {
    name: "Modal No.",
    wrap: true,
    selector: (row) => row.model,
    sortable: true,
  },
  {
    name: "Serial No.",
    wrap: true,
    selector: (row) => row.serial,
    sortable: true,
  },
  {
    name: "Device Type",
    wrap: true,
    selector: (row) => row.device_type.name,
    sortable: true,
  },
  {
    name: "Bill No.",
    wrap: true,
    selector: (row) => row.bill,
    sortable: true,
  },
  {
    name: "Bill Date",
    wrap: true,
    selector: (row) => row.billdate,
    sortable: true,
  },
  {
    name: "Warranty",
    wrap: true,
    selector: (row) => row.warranty,
    sortable: true,
  },
  {
    name: "Name",
    wrap: true,
    selector: (row) => row.issue_name,
    sortable: true,
  },
  {
    name: "Issue Date",
    wrap: true,
    selector: (row) => row.issuedate,
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.status,
    sortable: true,
  },
];

export const DeviceIssue_Col = [
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
    name: "Modal No.",
    wrap: true,
    selector: (row) => row.device_type.model,
    sortable: true,
  },
  {
    name: "Serial No.",
    wrap: true,
    selector: (row) => row.device_type.serial,
    sortable: true,
  },
  {
    name: "Device Type",
    wrap: true,
    selector: (row) => row.device_type.device_type.name,
    sortable: true,
  },
  {
    name: "Charger",
    wrap: true,
    selector: (row) => row.charger,
    sortable: true,
  },
  {
    name: "Remarks",
    wrap: true,
    selector: (row) => row.remarks,
    sortable: true,
  },
  {
    name: "Employee ID",
    wrap: true,
    selector: (row) => row.employeeid,
    sortable: true,
  },
  {
    name: "Name",
    wrap: true,
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Mobile No.",
    wrap: true,
    selector: (row) => row.mobileno,
    sortable: true,
  },
];

export const DeviceReturn_Col = [
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
    name: "Modal No.",
    wrap: true,
    selector: (row) => row.issue.device_type.model,
    sortable: true,
  },
  {
    name: "Serial No.",
    wrap: true,
    selector: (row) => row.issue.device_type.serial,
    sortable: true,
  },
  {
    name: "Device Type",
    wrap: true,
    selector: (row) => row.issue.device_type.device_type.name,
    sortable: true,
  },
  {
    name: "Damage",
    wrap: true,
    selector: (row) => row.damage,
    sortable: true,
  },
  {
    name: "Employee ID",
    wrap: true,
    selector: (row) => row.issue.employeeid,
    sortable: true,
  },
  {
    name: "Name",
    wrap: true,
    selector: (row) => row.issue.name,
    sortable: true,
  },
  {
    name: "Mobile No.",
    wrap: true,
    selector: (row) => row.issue.mobileno,
    sortable: true,
  },
  {
    name: "Remarks",
    wrap: true,
    selector: (row) => row.remarks,
    sortable: true,
  },
];
