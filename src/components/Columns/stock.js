import EditDuromaxStockForm from "../../pages/stock/form/editduromaxform";
import EditPipeStockForm from "../../pages/stock/form/editpipeform";
import EditWithoutStockForm from "../../pages/stock/form/editwithoutform";

export const Pipe_Stock_Col = [
  {
    name: "Edit",
    wrap: true,
    selector: (row) => {
      return <EditPipeStockForm data={row} />;
    },
  },
  {
    name: "Pipe ID",
    wrap: true,
    selector: (row) => row.code,
    sortable: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.size,
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => row.thickness,
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.grade,
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Length",
    wrap: true,
    selector: (row) => row.length,
    sortable: true,
  },
  {
    name: "Width",
    wrap: true,
    selector: (row) => row.width,
    sortable: true,
  },
  {
    name: "Max",
    wrap: true,
    selector: (row) => row.max,
    sortable: true,
  },
  {
    name: "Colour",
    wrap: true,
    selector: (row) => row.colour,
    sortable: true,
  },
  {
    name: "No of Pipe",
    wrap: true,
    selector: (row) => row.single,
    sortable: true,
  },
  {
    name: "Polish Weight",
    wrap: true,
    selector: (row) => (Number(row.pweight) - Number(row.dpweight)).toFixed(2),
    sortable: true,
  },
  {
    name: "Non Polish Weight",
    wrap: true,
    selector: (row) => (Number(row.nweight) - Number(row.dnweight)).toFixed(2),
    sortable: true,
  },
  {
    name: "Pipe",
    wrap: true,
    selector: (row) =>
      (
        Number(row.ppipe) +
        Number(row.npipe) -
        (Number(row.dnpipe) + Number(row.dppipe))
      ).toFixed(2),
    sortable: true,
  },
  {
    name: "Weight",
    wrap: true,
    selector: (row) =>
      (
        Number(row.pweight) +
        Number(row.nweight) -
        (Number(row.dnweight) + Number(row.dpweight))
      ).toFixed(2),
    sortable: true,
  },
];

export const Duromax_Stock_Col = [
  {
    name: "Edit",
    wrap: true,
    selector: (row) => {
      return <EditDuromaxStockForm data={row} />;
    },
  },
  {
    name: "Pipe ID",
    wrap: true,
    selector: (row) => row.code,
    sortable: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.size,
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => row.thickness,
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.grade,
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Length",
    wrap: true,
    selector: (row) => row.length,
    sortable: true,
  },
  {
    name: "Width",
    wrap: true,
    selector: (row) => row.width,
    sortable: true,
  },
  {
    name: "Max",
    wrap: true,
    selector: (row) => row.max,
    sortable: true,
  },
  {
    name: "Colour",
    wrap: true,
    selector: (row) => row.colour,
    sortable: true,
  },
  {
    name: "No of Pipe",
    wrap: true,
    selector: (row) => row.single,
    sortable: true,
  },
  {
    name: "Polish Weight",
    wrap: true,
    selector: (row) => (Number(row.pweight) - Number(row.dpweight)).toFixed(2),
    sortable: true,
  },
  {
    name: "Non Polish Weight",
    wrap: true,
    selector: (row) => (Number(row.nweight) - Number(row.dnweight)).toFixed(2),
    sortable: true,
  },
  {
    name: "Pipe",
    wrap: true,
    selector: (row) =>
      (
        Number(row.ppipe) +
        Number(row.npipe) -
        (Number(row.dnpipe) + Number(row.dppipe))
      ).toFixed(2),
    sortable: true,
  },
  {
    name: "Weight",
    wrap: true,
    selector: (row) =>
      (
        Number(row.pweight) +
        Number(row.nweight) -
        (Number(row.dnweight) + Number(row.dpweight))
      ).toFixed(2),
    sortable: true,
  },
];

export const Without_Stock_Col = [
  {
    name: "Edit",
    wrap: true,
    selector: (row) => {
      return <EditWithoutStockForm data={row} />;
    },
  },
  {
    name: "Pipe ID",
    wrap: true,
    selector: (row) => row.code,
    sortable: true,
  },
  {
    name: "Size",
    wrap: true,
    selector: (row) => row.size,
    sortable: true,
  },
  {
    name: "Thickness",
    wrap: true,
    selector: (row) => row.thickness,
    sortable: true,
  },
  {
    name: "Grade",
    wrap: true,
    selector: (row) => row.grade,
    sortable: true,
  },
  {
    name: "Status",
    wrap: true,
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Length",
    wrap: true,
    selector: (row) => row.length,
    sortable: true,
  },
  {
    name: "Width",
    wrap: true,
    selector: (row) => row.width,
    sortable: true,
  },
  {
    name: "Max",
    wrap: true,
    selector: (row) => row.max,
    sortable: true,
  },
  {
    name: "Colour",
    wrap: true,
    selector: (row) => row.colour,
    sortable: true,
  },
  {
    name: "No of Pipe",
    wrap: true,
    selector: (row) => row.single,
    sortable: true,
  },
  {
    name: "Polish Weight",
    wrap: true,
    selector: (row) => (Number(row.pweight) - Number(row.dpweight)).toFixed(2),
    sortable: true,
  },
  {
    name: "Non Polish Weight",
    wrap: true,
    selector: (row) => (Number(row.nweight) - Number(row.dnweight)).toFixed(2),
    sortable: true,
  },
  {
    name: "Pipe",
    wrap: true,
    selector: (row) =>
      (
        Number(row.ppipe) +
        Number(row.npipe) -
        (Number(row.dnpipe) + Number(row.dppipe))
      ).toFixed(2),
    sortable: true,
  },
  {
    name: "Weight",
    wrap: true,
    selector: (row) =>
      (
        Number(row.pweight) +
        Number(row.nweight) -
        (Number(row.dnweight) + Number(row.dpweight))
      ).toFixed(2),
    sortable: true,
  },
];
