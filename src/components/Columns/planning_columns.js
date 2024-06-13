import React from "react";

export const Create_Plan_Coil_Col = [
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
    name: "Coil No.",
    wrap: true,
    selector: (row) => row.coil_no,
    sortable: true,
  },
  {
    name: "Company Name",
    wrap: true,
    selector: (row) => row.company_id.company_name,
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.grade,
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => row.thickness,
    sortable: true,
  },
  {
    name: "Actual Weight",
    wrap: true,
    selector: (row) => row.actual_weight,
    sortable: true,
  },
  {
    name: "Actual Width",
    wrap: true,
    selector: (row) => row.actual_width,
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.status,
    sortable: true,
  },
];

export const Create_Plan_Slit_Col = [
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
    name: "Slit Coil No.",
    wrap: true,
    selector: (row) => row.store_id.coil_no + "-" + row.coil_no,
    sortable: true,
  },
  {
    name: "Company Name",
    wrap: true,
    selector: (row) => row.company_id.company_name,
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.store_id.grade,
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => row.store_id.thickness,
    sortable: true,
  },
  {
    name: "Weight",
    wrap: true,
    selector: (row) => row.weight,
    sortable: true,
  },
  {
    name: "Width",
    wrap: true,
    selector: (row) => row.width,
    sortable: true,
  },
  {
    name: "Remaining_type",
    wrap: true,
    center: true,
    selector: (row) => {
      if (row.remaining_type) {
        return "Yes";
      } else {
        return "No";
      }
    },
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.slitting_status,
    sortable: true,
  },
];

export const Create_Plan_Polish_Col = [
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
    name: "Pipe Code",
    wrap: true,
    selector: (row) => row.coil_no,
    sortable: true,
  },
  {
    name: "Company Name",
    wrap: true,
    selector: (row) => row.company_id.company_name,
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.grade,
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => row.thickness,
    sortable: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.size,
    sortable: true,
  },
  {
    name: "No. of Pipe",
    wrap: true,
    selector: (row) => row.no_of_pipe,
    sortable: true,
  },
  {
    name: "Actual Weight",
    wrap: true,
    selector: (row) => row.actual_weight,
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.status,
    sortable: true,
  },
];

// Planning_pipe_columns
