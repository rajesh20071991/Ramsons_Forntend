import PlannedTime_Format from "../Common/plannedtime";
import React from "react";
import TimeCal from "../Common/remian_time";

export const Failed_Challan_Process_Col = [
  {
    name: "Coil No.",
    wrap: true,
    selector: (row) => row.coilno,
    sortable: true,
  },
  {
    name: "Company Name",
    wrap: true,
    selector: (row) => row.partyname,
    sortable: true,
  },
  {
    name: "Challan No",
    wrap: true,
    selector: (row) => row.challan,
    sortable: true,
  },
  {
    name: "Actual Weight",
    wrap: true,
    selector: (row) => row.weight,
    sortable: true,
  },
  {
    name: "Actual Width",
    wrap: true,
    selector: (row) => row.width,
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.st_grade,
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => row.st_thickness,
    sortable: true,
  },
  {
    name: "Planned",
    wrap: true,
    selector: (row) => {
      if (row.step === "Step-1") {
        return PlannedTime_Format({
          date: row.created_on,
          hours: 6,
          mintues: 0,
        });
      } else if (row.step === "Step-2") {
        return PlannedTime_Format({
          date: row.created_on,
          hours: 1,
          mintues: 0,
        });
      } else {
        return PlannedTime_Format({
          date: row.created_on,
          hours: 2,
          mintues: 0,
        });
      }
    },
  },
  {
    name: "Step",
    wrap: true,
    selector: (row) => row.step,
    sortable: true,
  },
  {
    name: "Task Name",
    wrap: true,
    selector: (row) => row.task_name,
    sortable: true,
  },
  {
    name: "Time Delay",
    wrap: true,
    selector: (row) => {
      const time = PlannedTime_Format({
        date: row.created_on,
        hours: 6,
        mintues: 50,
        type: 2,
      });
      if (TimeCal(time).res === true) {
        return (
          <>
            {TimeCal(time).time.day}:{TimeCal(time).time.hour}:
            {TimeCal(time).time.mint}
          </>
        );
      } else {
        return <>{TimeCal(time).time.day} Day</>;
      }
    },
    sortable: true,
  },
];

export const Sales_Dispatch_Process_Col = [
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
    name: "Dispatch Id",
    wrap: true,
    selector: (row) => row.dispatch_id,
    sortable: true,
  },
  {
    name: "Booking Code",
    wrap: true,
    selector: (row) => row.code,
    sortable: true,
  },
  {
    name: "Company Name",
    wrap: true,
    selector: (row) => row.company_name,
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Weight",
    wrap: true,
    selector: (row) => row.weight,
    sortable: true,
  },
  {
    name: "Rate",
    wrap: true,
    selector: (row) => row.rate,
    sortable: true,
  },
  {
    name: "Discount",
    wrap: true,
    selector: (row) => row.discount,
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.grade,
    sortable: true,
  },
  {
    name: "Planned",
    wrap: true,
    selector: (row) => {
      if (row.step === "Step-1") {
        return PlannedTime_Format({
          date: row.created_on,
          hours: 2,
          mintues: 0,
        });
      } else if (row.step === "Step-2") {
        return PlannedTime_Format({
          date: row.created_on,
          hours: 1,
          mintues: 0,
        });
      } else {
        return PlannedTime_Format({
          date: row.created_on,
          hours: 1,
          mintues: 0,
        });
      }
    },
  },
  {
    name: "Step",
    wrap: true,
    selector: (row) => row.step,
    sortable: true,
  },
  {
    name: "Task Name",
    wrap: true,
    selector: (row) => row.task_name,
    sortable: true,
  },
  {
    name: "Time Delay",
    wrap: true,
    selector: (row) => {
      const time = PlannedTime_Format({
        date: row.created_on,
        hours: 6,
        mintues: 50,
        type: 2,
      });
      if (TimeCal(time).res === true) {
        return (
          <>
            {TimeCal(time).time.day}:{TimeCal(time).time.hour}:
            {TimeCal(time).time.mint}
          </>
        );
      } else {
        return <>{TimeCal(time).time.day} Day</>;
      }
    },
    sortable: true,
  },
];

export const Booking_Process_Col = [
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
    name: "Booking Code",
    wrap: true,
    selector: (row) => row.bid_id.code,
    sortable: true,
  },
  {
    name: "Company Name",
    wrap: true,
    selector: (row) => row.bid_id.company_id.company_name,
    sortable: true,
  },
  {
    name: "Planned",
    wrap: true,
    selector: (row) => {
      if (row.step === "Step-1") {
        return PlannedTime_Format({
          date: row.created_on,
          hours: 24,
          mintues: 0,
        });
      } else if (row.step === "Step-2") {
        return PlannedTime_Format({
          date: row.created_on,
          hours: 24,
          mintues: 0,
        });
      } else {
        return PlannedTime_Format({
          date: row.created_on,
          hours: 48,
          mintues: 0,
        });
      }
    },
  },
  {
    name: "Step",
    wrap: true,
    selector: (row) => row.step,
    sortable: true,
  },
  {
    name: "Task Name",
    wrap: true,
    selector: (row) => row.task_name,
    sortable: true,
  },
  {
    name: "Time Delay",
    wrap: true,
    selector: (row) => {
      const time = PlannedTime_Format({
        date: row.created_on,
        hours: 6,
        mintues: 50,
        type: 2,
      });
      if (TimeCal(time).res === true) {
        return (
          <>
            🟢{TimeCal(time).time.day},{TimeCal(time).time.hour}:
            {TimeCal(time).time.mint}
          </>
        );
      } else {
        return <>{TimeCal(time).time.day} Day</>;
      }
    },
    sortable: true,
  },
];
