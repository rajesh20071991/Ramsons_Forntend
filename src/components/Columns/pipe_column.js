import React from "react";
import { Link } from "react-router-dom";

export const Pipe_Plans_Col = [
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
    selector: (row) => {
      if (row.coil_id === null) {
        return row.slit_id.store_id.coil_no + "-" + row.slit_id.coil_no;
      } else {
        return row.coil_id.coil_no;
      }
    },
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => {
      if (row.coil_id === null) {
        return row.slit_id.store_id.thickness;
      } else {
        return row.coil_id.thickness;
      }
    },
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => {
      if (row.coil_id === null) {
        return row.slit_id.store_id.grade;
      } else {
        return row.coil_id.grade;
      }
    },
    sortable: true,
  },
  {
    name: "Weight",
    wrap: true,
    selector: (row) => {
      if (row.coil_id === null) {
        return row.slit_id.weight;
      } else {
        return row.coil_id.actual_weight;
      }
    },
    sortable: true,
  },
  {
    name: "Plan No.",
    selector: (row) => row.plan_no,
    sortable: true,
    wrap: true,
  },
  {
    name: "Mill No",
    selector: (row) => row.mill_no,
    sortable: true,
    wrap: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => {
      if (row.pipe_id) {
        return row.pipe_id.size;
      } else {
        return row.size;
      }
    },
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.planning_status,
    sortable: true,
  },
];

export const Pipe_Polish_Plans_Col = [
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
    selector: (row) => row.pipe_id.coil_no,
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => row.pipe_id.thickness,
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.pipe_id.grade,
    sortable: true,
  },
  {
    name: "Weight",
    selector: (row) => row.pipe_id.actual_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Plan No.",
    selector: (row) => row.plan_no,
    sortable: true,
    wrap: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => {
      if (row.pipe_id) {
        return row.pipe_id.size;
      } else {
        return row.size;
      }
    },
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.planning_status,
    sortable: true,
  },
];

// inprocess_columns

export const First_Obser_Col = [
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
    name: "Shift",
    selector: (row) => row.shift,
    sortable: true,
    wrap: true,
  },
  {
    name: "Coil No.",
    wrap: true,
    selector: (row) => {
      if (row.plan_id.coil_id === null) {
        return (
          row.plan_id.slit_id.store_id.coil_no +
          "-" +
          row.plan_id.slit_id.coil_no
        );
      }
      return row.plan_id.coil_id.coil_no;
    },
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => {
      if (row.plan_id.coil_id === null) {
        return row.plan_id.slit_id.store_id.thickness;
      }
      return row.plan_id.coil_id.thickness;
    },
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => {
      if (row.plan_id.coil_id === null) {
        return row.plan_id.slit_id.store_id.grade;
      }
      return row.plan_id.coil_id.grade;
    },
    sortable: true,
  },
  {
    name: "Plan No",
    wrap: true,
    selector: (row) => {
      if (row.plan_id.coil_id === null) {
        return row.plan_id.plan_no;
      }
      return row.plan_id.plan_no;
    },
    sortable: true,
  },
  {
    name: "Mill No",
    wrap: true,
    selector: (row) => row.plan_id.mill_no,
    sortable: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.plan_id.size,
    sortable: true,
  },
  {
    name: "Crane Weight",
    wrap: true,
    selector: (row) => row.crane_weight,
    sortable: true,
  },
  {
    name: "Stamp",
    wrap: true,
    selector: (row) => row.stamp,
    sortable: true,
  },
  {
    name: "Edge Quality:",
    selector: (row) => row.edge_quality,
    sortable: true,
    wrap: true,
  },
  {
    name: "Surface Quality: ",
    selector: (row) => row.surface_quality,
    sortable: true,
    wrap: true,
  },
  {
    name: "Operator Name:",
    wrap: true,
    selector: (row) => row.operator_name,
    sortable: true,
  },
  {
    name: "Helper Name:",
    wrap: true,
    selector: (row) => row.helper_name,
    sortable: true,
  },
];

//inprocess data

export const Inprocess_Col = [
  {
    name: "Date",
    center: true,
    selector: (row) => {
      var today = new Date(row.created_on);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Shift",
    selector: (row) => row.fao_id.shift,
    sortable: true,
    wrap: true,
  },
  {
    name: "Coil No.",
    wrap: true,
    selector: (row) => {
      if (row.fao_id.plan_id.coil_id === null) {
        return (
          row.fao_id.plan_id.slit_id.store_id.coil_no +
          "-" +
          row.fao_id.plan_id.slit_id.coil_no
        );
      }
      return row.fao_id.plan_id.coil_id.coil_no;
    },
    sortable: true,
  },
  {
    name: "Thickness",
    selector: (row) => {
      if (row.fao_id.plan_id.coil_id === null) {
        return row.fao_id.plan_id.slit_id.store_id.thickness;
      }
      return row.fao_id.plan_id.coil_id.thickness;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Grade",
    selector: (row) => {
      if (row.fao_id.plan_id.coil_id === null) {
        return row.fao_id.plan_id.slit_id.store_id.grade;
      }
      return row.fao_id.plan_id.coil_id.grade;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Weight",
    selector: (row) => {
      if (row.fao_id.plan_id.coil_id === null) {
        return row.fao_id.plan_id.slit_id.weight;
      }
      return row.fao_id.plan_id.coil_id.actual_weight;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Diff. Weight",
    selector: (row) => {
      if (row.fao_id.plan_id.coil_id === null) {
        return Math.round(
          row.fao_id.plan_id.slit_id.weight - row.fao_id.crane_weight
        );
      }
      return Math.round(
        row.fao_id.plan_id.coil_id.actual_weight - row.fao_id.crane_weight
      );
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Mill No",
    selector: (row) => {
      if (row.fao_id.plan_id.coil_id === null) {
        return row.fao_id.plan_id.mill_no;
      }
      return row.fao_id.plan_id.mill_no;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.fao_id.plan_id.size,
    sortable: true,
  },
  {
    name: "Speed",
    wrap: true,
    selector: (row) => row.speed,
    sortable: true,
  },
  {
    name: "RPM",
    wrap: true,
    selector: (row) => row.rpm,
    sortable: true,
  },
  {
    name: "Voltage",
    wrap: true,
    selector: (row) => row.voltage,
    sortable: true,
  },
  {
    name: "Current",
    wrap: true,
    selector: (row) => row.current,
    sortable: true,
  },
  {
    name: "Gas Flow",
    wrap: true,
    selector: (row) => row.gas_flow,
    sortable: true,
  },
  {
    name: "Stamp",
    wrap: true,
    selector: (row) => row.stamp,
    sortable: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.size,
    sortable: true,
  },
  {
    name: "Welding",
    wrap: true,
    selector: (row) => row.welding,
    sortable: true,
  },
  {
    name: "Marking",
    wrap: true,
    selector: (row) => row.marking,
    sortable: true,
  },
  {
    name: "Helper Name:",
    wrap: true,
    selector: (row) => row.fao_id.helper_name,
    sortable: true,
  },
];

// tubemil_columns

export const TubeMillViewShift_Col = [
  {
    name: "Date",
    selector: (row) => {
      var today = new Date(row.created_on);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Plan No.",
    wrap: true,
    selector: (row) => row.planno,
    sortable: true,
  },
  {
    name: "Shift",
    wrap: true,
    selector: (row) => row.faoshift,
    sortable: true,
  },
  {
    name: "Coil No.",
    wrap: true,
    selector: (row) => row.coilno,
    sortable: true,
  },
  {
    name: "Size",
    selector: (row) => row.plansize,
    sortable: true,
    wrap: true,
  },
  {
    name: "Weight",
    selector: (row) => row.weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Pipe Weight",
    selector: (row) => row.pipe_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Scrap weight",
    selector: (row) => row.scrap_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "S/L Weight",
    selector: (row) => row.short_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Hole Weight",
    selector: (row) => row.hweight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Total Pipe",
    selector: (row) => row.total_pipe,
    sortable: true,
    wrap: true,
  },
  {
    name: "Hole Pipe",
    selector: (row) => row.hole_pipe,
    sortable: true,
    wrap: true,
  },
  {
    name: "S/L Pipe",
    selector: (row) => row.short_length,
    sortable: true,
    wrap: true,
  },
  {
    name: "S/L Pipe",
    selector: (row) => row.short_length,
    sortable: true,
    wrap: true,
  },
  {
    name: "Stoppage Reasons",
    selector: (row) => row.stopage_reasons,
    sortable: true,
    wrap: true,
  },
  {
    name: "Other Reasons",
    selector: (row) => row.other_reasons,
    sortable: true,
    wrap: true,
  },
  {
    name: "Running Hrs",
    selector: (row) => row.running_hrs,
    sortable: true,
    wrap: true,
  },
  // {
  //   name: "Edit",
  //   wrap: true,
  //   selector: (row) => {
  //     return <EdittubemillForm data={row} />;
  //   },
  // },
];

export const Productionfao_Col = [
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
    name: "Plan No.",
    wrap: true,
    selector: (row) => row.planno,
    sortable: true,
  },
  {
    name: "Shift",
    wrap: true,
    selector: (row) => row.shift,
    sortable: true,
  },
  {
    name: "Coil No.",
    wrap: true,
    selector: (row) => row.coilno,
    sortable: true,
  },
  {
    name: "Size",
    selector: (row) => row.plansize,
    sortable: true,
    wrap: true,
  },
  {
    name: "Mill No",
    selector: (row) => row.planmill,
    sortable: true,
    wrap: true,
  },
  {
    name: "Crane Weight",
    wrap: true,
    selector: (row) => row.crane_weight,
    sortable: true,
  },
  {
    name: "Stamp",
    wrap: true,
    selector: (row) => row.stamp,
    sortable: true,
    right: true,
  },
  {
    name: "Edge Quality:",
    selector: (row) => row.edge_quality,
    sortable: true,
    wrap: true,
  },
  {
    name: "Surface Quality: ",
    selector: (row) => row.surface_quality,
    sortable: true,
    wrap: true,
  },
  {
    name: "Operator Name:",
    selector: (row) => row.operator_name,
    sortable: true,
    wrap: true,
  },
  {
    name: "Helper Name:",
    selector: (row) => row.helper_name,
    sortable: true,
    wrap: true,
  },
  // {
  //   name: "Edit",
  //   wrap: true,
  //   selector: (row) => {
  //     return <EditfirstForm data={row} />;
  //   },
  // },
];

export const ProductionInp_Col = [
  {
    name: "Date",
    center: true,
    selector: (row) => {
      var today = new Date(row.created_on);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Coil No.",
    wrap: true,
    selector: (row) => row.coilno,
    sortable: true,
  },
  {
    name: "Shift",
    wrap: true,
    selector: (row) => row.faoshift,
    sortable: true,
    right: true,
  },
  {
    name: "Speed",
    wrap: true,
    selector: (row) => row.speed,
    sortable: true,
    right: true,
  },
  {
    name: "RPM",
    wrap: true,
    selector: (row) => row.rpm,
    sortable: true,
    right: true,
  },
  {
    name: "Voltage",
    wrap: true,
    selector: (row) => row.voltage,
    sortable: true,
    right: true,
    wrap: true,
  },
  {
    name: "Current",
    wrap: true,
    selector: (row) => row.current,
    sortable: true,
  },
  {
    name: "Gas Flow",
    wrap: true,
    selector: (row) => row.gas_flow,
    sortable: true,
  },
  {
    name: "Stamp",
    wrap: true,
    selector: (row) => row.stamp,
    sortable: true,
    right: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.size,
    sortable: true,
    right: true,
  },
  {
    name: "Welding",
    center: true,
    selector: (row) => row.welding,
    sortable: true,
    right: true,
    wrap: true,
  },
  {
    name: "Marking",
    center: true,
    selector: (row) => row.marking,
    sortable: true,
    right: true,
    wrap: true,
  },
  // {
  //   name: "Edit",
  //   wrap: true,
  //   selector: (row) => {
  //     return <EditInprocessForm data={row} />;
  //   },
  // },
];

export const ProductionTube_Col = [
  {
    name: "Date",
    center: true,
    selector: (row) => {
      var today = new Date(row.created_on);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Coil No.",
    wrap: true,
    selector: (row) => row.coilno,
    sortable: true,
  },
  {
    name: "Pipe Weight",
    selector: (row) => row.pipe_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Scrap weight",
    selector: (row) => row.scrap_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "S/L Weight",
    selector: (row) => row.short_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Hole Weight",
    selector: (row) => row.hweight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Total Pipe",
    selector: (row) => row.total_pipe,
    sortable: true,
    wrap: true,
  },
  {
    name: "Hole Pipe",
    selector: (row) => row.hole_pipe,
    sortable: true,
    wrap: true,
  },
  {
    name: "S/L Pipe",
    selector: (row) => row.short_length,
    sortable: true,
    wrap: true,
  },
  {
    name: "Stoppage Reasons",
    selector: (row) => row.stopage_reasons,
    sortable: true,
    wrap: true,
  },
  {
    name: "Other Reasons",
    selector: (row) => row.other_reasons,
    sortable: true,
    wrap: true,
  },
  {
    name: "Running Hrs",
    selector: (row) => row.running_hrs,
    sortable: true,
    wrap: true,
  },
  // {
  //   name: "Edit",
  //   wrap: true,
  //   selector: (row) => {
  //     return <EdittubemillForm data={row} />;
  //   },
  // },
];

export const Tubemill_Movement_Col = [
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
    selector: (row) => {
      if (row.tube_id.plan_id.coil_id === null) {
        return (
          row.tube_id.plan_id.slit_id.store_id.coil_no +
          "-" +
          row.tube_id.plan_id.slit_id.coil_no +
          "-" +
          row.tube_id.batch_code +
          "-" +
          row.tube_id.code
        );
      }
      return (
        row.tube_id.plan_id.coil_id.coil_no +
        "-" +
        row.tube_id.batch_code +
        "-" +
        row.tube_id.code
      );
    },
    sortable: true,
  },
  {
    name: "Thickness",
    center: true,
    selector: (row) => {
      if (row.tube_id.plan_id.coil_id === null) {
        return row.tube_id.plan_id.slit_id.store_id.thickness;
      }
      return row.tube_id.plan_id.coil_id.thickness;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Grade",
    center: true,
    selector: (row) => {
      if (row.tube_id.plan_id.coil_id === null) {
        return row.tube_id.plan_id.slit_id.store_id.grade;
      }
      return row.tube_id.plan_id.coil_id.grade;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Weight",
    center: true,
    selector: (row) => row.tube_id.pipe_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Size",
    center: true,
    selector: (row) => {
      if (row.tube_id.plan_id.coil_id === null) {
        return row.tube_id.plan_id.size;
      }
      return row.tube_id.plan_id.size;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Polish Pipe",
    center: true,
    selector: (row) => row.noofpipe,
    sortable: true,
    wrap: true,
  },
  {
    name: "Welding Quality",
    selector: (row) => row.welding_quality,
    sortable: true,
    wrap: true,
  },
  {
    name: "Surface Quality ",
    selector: (row) => row.surface_quality,
    sortable: true,
    wrap: true,
  },
  {
    name: "Handling",
    center: true,
    selector: (row) => row.handling,
    sortable: true,
    wrap: true,
  },
  {
    name: "Straightness",
    center: true,
    selector: (row) => row.straightness,
    sortable: true,
    wrap: true,
  },
  {
    name: "Tagging",
    center: true,
    selector: (row) => row.tagging,
    sortable: true,
    wrap: true,
  },
  {
    name: "Remarks",
    center: true,
    selector: (row) => row.remarks,
    sortable: true,
    wrap: true,
  },
  {
    name: "Status",
    center: true,
    selector: (row) => row.status,
    sortable: true,
    wrap: true,
  },
];

// polish_data_columns

export const Polish_data_Col = [
  {
    name: "Date",
    center: true,
    selector: (row) => {
      var today = new Date(row.created_on);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "Coil No.",
    center: true,
    selector: (row) => row.coil_no,
    sortable: true,
    wrap: true,
  },
  {
    name: "Batch No",
    center: true,
    selector: (row) => row.code,
    sortable: true,
    wrap: true,
  },
  {
    name: "Thickness",
    center: true,
    selector: (row) => row.thckness,
    sortable: true,
    wrap: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.grade,
    sortable: true,
  },
  {
    name: "Total Pipe ",
    center: true,
    selector: (row) => row.total_pipe,
    sortable: true,
    wrap: true,
  },
  {
    name: "No. of Pipe",
    center: true,
    selector: (row) => row.no_pipe,
    sortable: true,
    wrap: true,
  },
  {
    name: "Batch Weight",
    center: true,
    selector: (row) => row.batch_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "No. of S/L",
    center: true,
    selector: (row) => row.no_shortlength,
    sortable: true,
    wrap: true,
  },
  {
    name: "S/L Weight",
    center: true,
    selector: (row) => row.sl_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "No. of Rework Pipe",
    center: true,
    selector: (row) => row.no_rework_pipe,
    sortable: true,
    wrap: true,
  },
  {
    name: "Rejected Pipe Weight",
    center: true,
    selector: (row) => row.rejected_pipe_weight,
    sortable: true,
    wrap: true,
  },
  {
    name: "Welding",
    center: true,
    selector: (row) => row.welding,
    sortable: true,
    wrap: true,
  },
  {
    name: "OD",
    wrap: true,
    selector: (row) => row.od,
    sortable: true,
  },
  {
    name: "Length",
    wrap: true,
    selector: (row) => row.length,
    sortable: true,
  },
  {
    name: "Type of Rejection",
    wrap: true,
    selector: (row) => row.type_of_rejection,
    sortable: true,
  },
  {
    name: "Lining",
    wrap: true,
    selector: (row) => row.lining,
    sortable: true,
  },
  {
    name: "STR",
    wrap: true,
    selector: (row) => row.str,
    sortable: true,
  },
  {
    name: "Short Length",
    wrap: true,
    selector: (row) => row.short_length,
    sortable: true,
  },
  {
    name: "Mark",
    wrap: true,
    selector: (row) => row.mark,
    sortable: true,
  },
  {
    name: "Stamp",
    wrap: true,
    selector: (row) => row.stamp,
    sortable: true,
  },
  {
    name: "Finish",
    wrap: true,
    selector: (row) => row.finish,
    sortable: true,
  },
  {
    name: "Remarks",
    wrap: true,
    selector: (row) => row.remarks,
    sortable: true,
  },
];

//tubemill data
export const Tubemilldata_Col = [
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
    sortable: true,
    selector: (row) => {
      if (row.plan_id.coil_id === null) {
        return (
          row.plan_id.slit_id.store_id.coil_no +
          "-" +
          row.plan_id.slit_id.coil_no +
          "-" +
          row.batch_code
        );
      } else {
        return row.plan_id.coil_id.coil_no + "-" + row.batch_code;
      }
    },
  },
  {
    name: "Batch Code",
    wrap: true,
    selector: (row) => row.code,
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => {
      if (row.plan_id.coil_id === null) {
        return row.plan_id.slit_id.store_id.thickness;
      }
      return row.plan_id.coil_id.thickness;
    },
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => {
      if (row.plan_id.coil_id === null) {
        return row.plan_id.slit_id.store_id.grade;
      }
      return row.plan_id.coil_id.grade;
    },
    sortable: true,
  },
  {
    name: "Weight",
    wrap: true,
    selector: (row) => {
      if (row.plan_id.coil_id === null) {
        return row.plan_id.slit_id.weight;
      }
      return row.plan_id.coil_id.actual_weight;
    },
    sortable: true,
  },
  {
    name: "Mill No",
    wrap: true,
    selector: (row) => row.plan_id.mill_no,
    sortable: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.plan_id.size,
    sortable: true,
  },
  {
    name: "End Time",
    wrap: true,
    selector: (row) => row.end_time,
    sortable: true,
  },
  {
    name: "Total Pipe",
    wrap: true,
    selector: (row) => row.total_pipe,
    sortable: true,
  },
  {
    name: "Hole Pipe",
    wrap: true,
    selector: (row) => row.hole_pipe,
    sortable: true,
  },
  {
    name: "Pipe Weight",
    wrap: true,
    selector: (row) => row.pipe_weight,
    sortable: true,
  },
  {
    name: "Pipe Out",
    wrap: true,
    selector: (row) => row.pipe_out,
    sortable: true,
  },
  {
    name: "Hole Weight",
    wrap: true,
    selector: (row) => row.hweight,
    sortable: true,
  },
  {
    name: "Hole Weight Out",
    wrap: true,
    selector: (row) => row.hole_out,
    sortable: true,
  },
];

export const TubemillListdata_Col = [
  {
    name: "Start Time",
    wrap: true,
    selector: (row) => row.start_time,
    sortable: true,
  },
  {
    name: "End Time",
    wrap: true,
    selector: (row) => row.end_time,
    sortable: true,
  },
  {
    name: "Pipe Weight",
    wrap: true,
    selector: (row) => row.pipe_weight,
    sortable: true,
  },
  {
    name: "Hole Pipe Weight ",
    wrap: true,
    selector: (row) => row.hweight,
    sortable: true,
  },
  {
    name: "S/L Weight",
    wrap: true,
    selector: (row) => row.short_weight,
    sortable: true,
  },
  {
    name: "Scrap Weight",
    wrap: true,
    selector: (row) => row.scrap_weight,
    sortable: true,
  },
  {
    name: "Total Pipe ",
    wrap: true,
    selector: (row) => row.total_pipe,
    sortable: true,
  },
  {
    name: "Hole Pipe",
    wrap: true,
    selector: (row) => row.hole_pipe,
    sortable: true,
  },
  {
    name: "S/L Pipe",
    wrap: true,
    selector: (row) => row.short_length,
    sortable: true,
  },
  {
    name: "Burning Loss",
    wrap: true,
    selector: (row) => row.burning_loss,
    sortable: true,
  },
];

export const Polish_Move_Col = [
  // {
  //   name: "Edit",
  //   wrap: true,
  //   selector: (row) => {
  //     return <EditPolishForm data={row} />;
  //   },
  // },
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
    selector: (row) => {
      if (row.polm_id.pip_id === null) {
        if (row.polm_id.pol_id.tube_id.plan_id.coil_id === null) {
          return (
            row.polm_id.pol_id.tube_id.plan_id.slit_id.store_id.coil_no +
            "-" +
            row.polm_id.pol_id.tube_id.plan_id.slit_id.coil_no +
            "-" +
            row.polm_id.pol_id.tube_id.batch_code +
            "-" +
            row.polm_id.code
          );
        } else {
          return (
            row.polm_id.pol_id.tube_id.plan_id.coil_id.coil_no +
            "-" +
            row.polm_id.pol_id.tube_id.batch_no +
            "" +
            row.polm_id.code
          );
        }
      } else {
        return row.polm_id.pip_id.coil_id.coil_no + "-" + row.polm_id.code;
      }
    },
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => {
      if (row.polm_id.pip_id === null) {
        if (row.polm_id.pol_id.tube_id.plan_id.coil_id === null) {
          return row.polm_id.pol_id.tube_id.plan_id.slit_id.store_id.grade;
        } else {
          return row.polm_id.pol_id.tube_id.plan_id.coil_id.grade;
        }
      } else {
        return row.polm_id.pip_id.coil_id.grade;
      }
    },
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => {
      if (row.polm_id.pip_id === null) {
        if (row.polm_id.pol_id.tube_id.plan_id.coil_id === null) {
          return row.polm_id.pol_id.tube_id.plan_id.slit_id.store_id.thickness;
        } else {
          return row.polm_id.pol_id.tube_id.plan_id.coil_id.thickness;
        }
      } else {
        return row.polm_id.pip_id.coil_id.thickness;
      }
    },
    sortable: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.polm_id.pol_id.tube_id.plan_id.size,
    sortable: true,
  },
  {
    name: "No. of Pipe",
    wrap: true,
    selector: (row) => row.polm_id.no_pipe,
    sortable: true,
  },
  {
    name: "Bundle",
    wrap: true,
    selector: (row) => row.polm_id.bundle,
    sortable: true,
  },
  {
    name: "Weight",
    wrap: true,
    selector: (row) => row.polm_id.batch_weight,
    sortable: true,
  },
  {
    name: "Packing Quality",
    wrap: true,
    selector: (row) => row.packing_quality,
    sortable: true,
  },
  {
    name: "Handling",
    wrap: true,
    selector: (row) => row.handling,
    sortable: true,
  },
  {
    name: "Tagging",
    wrap: true,
    selector: (row) => row.tagging,
    sortable: true,
  },
];
