export const Non_Polish_Col = [
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
    name: "Entity Brand",
    wrap: true,
    selector: (row) => row.entity_brand,
    sortable: true,
  },
  {
    name: "Chalan Weight",
    wrap: true,
    selector: (row) => row.chalan_weight,
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
    name: "Pipe Type",
    wrap: true,
    selector: (row) => row.pipe_type,
    sortable: true,
  },
  {
    name: "No. of Pipe",
    wrap: true,
    selector: (row) => row.no_of_pipe,
    sortable: true,
  },
  {
    name: "Weight",
    wrap: true,
    selector: (row) => row.actual_weight,
    sortable: true,
  },
  {
    name: "Shape",
    wrap: true,
    selector: (row) => row.shape,
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.status,
    sortable: true,
  },
];

// Polish_columns

export const Polish_Col = [
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
    selector: (row) => row.company_name,
    sortable: true,
  },
  {
    name: "Origin Coil No",
    wrap: true,
    selector: (row) => row.origin_coil_no,
    sortable: true,
  },
  {
    name: "Challan No",
    wrap: true,
    selector: (row) => row.challan_no,
    sortable: true,
  },
  {
    name: "Entity Brand",
    wrap: true,
    selector: (row) => row.entity_brand,
    sortable: true,
  },
  {
    name: "Job Type",
    wrap: true,
    selector: (row) => row.job_type,
    sortable: true,
  },
  {
    name: "Chalan Weight",
    wrap: true,
    selector: (row) => row.chalan_weight,
    sortable: true,
  },
  {
    name: "Chalan Width",
    wrap: true,
    selector: (row) => row.chalan_width,
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
    name: "Pipe Type",
    wrap: true,
    selector: (row) => row.pipe_type,
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
    name: "Shape",
    wrap: true,
    selector: (row) => row.shape,
    sortable: true,
  },
];
