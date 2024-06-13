import EditEntityViewForm from "../../pages/Challan/form/edit_entity";
import EditSourceViewForm from "../../pages/Challan/form/edit_source";
import { Link } from "react-router-dom";
import EditStatussViewForm from "../../pages/Challan/form/satus_form";
import EditStatusEnViewForm from "../../pages/Challan/form/status_form";
import { Tag } from "antd";

export const Source_Col = [
  {
    title: "Edit",
    key: "edit",
    render: (row) => <EditSourceViewForm data={row} />,
  },
  {
    title: "Date",
    dataIndex: "created_on",
    key: "date",
    render: (created_on) => {
      const date = new Date(created_on);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      return formattedDate;
    },
    sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on),
  },
  {
    title: "Company ID",
    dataIndex: "company_id",
    key: "company_id",
    sorter: (a, b) => a.company_id.localeCompare(b.company_id),
  },
  {
    title: "Person Name",
    dataIndex: "person_name",
    key: "person_name",
    sorter: (a, b) => a.person_name.localeCompare(b.person_name),
  },
  {
    title: "Company Name",
    dataIndex: "company_name",
    key: "company_name",
    sorter: (a, b) => a.company_name.localeCompare(b.company_name),
  },
  {
    title: "GST No.",
    dataIndex: "gst_no",
    key: "gst_no",
    sorter: (a, b) => a.gst_no.localeCompare(b.gst_no),
  },
  {
    title: "Email ID",
    dataIndex: "emailid",
    key: "emailid",
    sorter: (a, b) => a.emailid.localeCompare(b.emailid),
  },
  {
    title: "Phone No.",
    dataIndex: "phone_no",
    key: "phone_no",
    sorter: (a, b) => a.phone_no.localeCompare(b.phone_no),
  },
  {
    title: "Alternate No.",
    dataIndex: "alternate_no",
    key: "alternate_no",
    sorter: (a, b) => a.alternate_no.localeCompare(b.alternate_no),
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    sorter: (a, b) => a.city.localeCompare(b.city),
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    sorter: (a, b) => a.state.localeCompare(b.state),
  },
  {
    title: "Pin Code",
    dataIndex: "pincode",
    key: "pincode",
    sorter: (a, b) => a.pincode.localeCompare(b.pincode),
  },
];

export const Good_Col = [
  {
    title: "Edit",
    key: "edit",
    render: (row) => <EditEntityViewForm data={row} />,
    sorter: true,
  },
  {
    title: "Date",
    dataIndex: "created_on",
    key: "date",
    render: (date) => {
      const formattedDate = new Date(date).toLocaleDateString("en-IN");
      return formattedDate;
    },
    sorter: true,
  },
  {
    title: "Description of Goods",
    dataIndex: "description",
    key: "description",
    sorter: true,
  },
  {
    title: "HSN Code",
    dataIndex: "hsncode",
    key: "hsnCode",
    sorter: true,
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    sorter: true,
  },
];
