import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Non_Polish_Col } from "../../components/Columns/inward_columns";
import { GetIndPolishData } from "../../redux/actions/inwardActions";
import { useSelector } from "react-redux";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import { api } from "../../services/api";
import { useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "react-select";
import { InwardCoil_Form } from "./Form/coilinwardform";
import { Link } from "react-router-dom";
import config from "../../config";

const Ind_Polish = () => {
  var data = useSelector((state) => state.inwardData.inward_polish_data);
  var modal_id = useSelector((state) => state.model.id);

  if (data) {
    var count = data.count;
    data = data.results;
  }

  const options_value = [
    { value: "Instock", label: "Instock" },
    { value: "Planning", label: "Planning" },
    { value: "Tubemill", label: "Tubemill" },
    { value: "Polish", label: "Polish" },
    { value: "Non Polish", label: "Non Polish" },
    { value: "Polished", label: "Polished" },
    { value: "Slitting", label: "Slitting" },
    { value: "Dispatch", label: "Dispatch" },
    { value: "Dispatched", label: "Dispatched" },
  ];

  const filtCols = {
    id: [],
    coil_no: "",
    company_id__id: "",
    chalan_width: "",
    status: "",
    job_type: "",
    grade: "",
    thickness: "",
    created_on: {
      start: "",
      end: "",
    },
  }; //filter
  const [filter, setFilter] = useState(filtCols); //filter

  function handleClearFilter() {
    setFilter(filtCols);
    setRef(!refresh);
    CloseModal("filter");
  }

  const [page, setPage] = React.useState(1);
  const [refresh, setRef] = useState(true);
  const [size, setSize] = React.useState(10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetIndPolishData({
        size: size,
        page: page,
        filter: filter,
      })
    );
  }, [page, size, refresh]);

  function handlePageChange(pg) {
    setPage(pg);
  }

  function handlePageSizeChange(sz) {
    setSize(sz);
  }

  const [companyNames, setCompanyNames] = React.useState([]);
  const [VendorNames, setVendorNames] = React.useState([]);
  const [thickness, setthickness] = React.useState([]);
  const [grade, setgrade] = React.useState([]);
  const [Sizes, setSizes] = React.useState([]);

  useEffect(() => {
    api({ api: "/storeitem/pipecoilfilter/" }).then((data) => {
      setCompanyNames(data);
    });
    api({ api: "/storeitem/companyinfilter/" }).then((data) => {
      setVendorNames(data);
    });
    api({ api: "/storeitem/thicknesssfilter/" }).then((data) => {
      setthickness(data);
    });
    api({ api: "/storeitem/gradesfilter/" }).then((data) => {
      setgrade(data);
    });
    api({ api: "/storeitem/sizesfilter/" }).then((data) => {
      setSizes(data);
    });
  }, []);

  const [date_form, setdate] = React.useState({ from: "", to: "" });

  function export_data() {
    const key = localStorage.getItem("AuthToken");
    console.log(date_form);
    let url =
      config.apiEndpoint +
      "/api/export/polishpipe/?from=" +
      date_form.from +
      "&to=" +
      date_form.to +
      "&token=" +
      key;
    window.open(url, "_blank");
  }

  function CloseModal() {
    dispatch(SetModelId(0));
    setRef(refresh + refresh);
  }

  return (
    <div className="Ind_Polish">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#ï¸âƒ£===</h4>
              <h4 className="filterPageTitle mt-2">#Polish</h4>
              <div className="ms-auto filter-component d-flex">
                <button
                  className="btn btn-danger add-btn"
                  onClick={(e) => {
                    dispatch(SetModelId(3));
                  }}>
                  Export
                </button>
                <br />
                <button
                  className="btn btn-danger add-btn"
                  onClick={(e) => {
                    dispatch(SetModelId(1));
                  }}>
                  Filter
                </button>
                <Link
                  className="btn btn-success add-btn"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                  role="button">
                  Inward
                </Link>
              </div>
              <InwardCoil_Form />
            </div>
          </div>
          {data && (
            <DataTable
              columns={Non_Polish_Col}
              data={data}
              selectableRowsComponent={Checkbox}
              dense
              pagination
              paginationServer
              onChangePage={handlePageChange}
              paginationTotalRows={count}
              paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 70, 100]}
              onChangeRowsPerPage={handlePageSizeChange}
              pointerOnHover
              selectableRows
              striped={true}
              persistTableHead
              responsive={true}
            />
          )}
        </div>
      </div>
      {modal_id === 1 && (
        <Sweet_Modal show={true} title="Apply filter">
          <div className="row">
            {/* filter fields  */}
            <div className="col-md-6 mt-2">
              <Select
                isMulti
                options={companyNames}
                value={filter.coil}
                onChange={(selected) => {
                  setFilter({ ...filter, coil: selected });
                }}
                placeholder="Coil No,"
              />
            </div>
            <div className="col-md-6 mt-2">
              <Select
                isMulti
                options={options_value}
                value={filter.status}
                onChange={(selected) => {
                  setFilter({ ...filter, status: selected });
                }}
                placeholder="status"
              />
            </div>
            <div className="col-md-6 mt-2">
              <Select
                isMulti
                options={VendorNames}
                value={filter.company}
                onChange={(selected) => {
                  setFilter({
                    ...filter,
                    company: selected,
                  });
                }}
                placeholder="Company Name"
              />
            </div>
            <div className="col-md-6 mt-2">
              <Select
                isMulti
                options={thickness}
                value={filter.thickness}
                onChange={(selected) => {
                  setFilter({ ...filter, thickness: selected });
                }}
                placeholder="Thickness"
              />
            </div>
            <div className="col-md-6 mt-2">
              <Select
                isMulti
                options={grade}
                value={filter.grade}
                onChange={(selected) => {
                  setFilter({ ...filter, grade: selected });
                }}
                placeholder="Grade"
              />
            </div>
            <div className="col-md-6 mt-2">
              <Select
                isMulti
                options={Sizes}
                value={filter.size}
                onChange={(selected) => {
                  setFilter({ ...filter, size: selected });
                }}
                placeholder="Size"
              />
            </div>
            <div className="col-md-12 mt-2">
              {/*filter for Date */}
              <div className="d-flex">
                <input
                  type="date"
                  value={filter.created_on.start}
                  className="form-control"
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      created_on: {
                        ...filter.created_on,
                        start: e.target.value,
                      },
                    });
                  }}
                />
                <b className="mt-1 ms-1 me-1">to</b>
                <input
                  type="date"
                  value={filter.created_on.end}
                  className="form-control"
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      created_on: {
                        ...filter.created_on,
                        end: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              {/*End filter for Date */}
            </div>
            {/* End filter fields  */}
          </div>
          <hr />
          {/* Modal Bottom */}
          <div className="text-center">
            <button
              type="button"
              className="btn ms-2 btn-warning"
              onClick={handleClearFilter}>
              Clear
            </button>
            <button
              type="button"
              className="btn ms-2 btn-primary"
              onClick={() => {
                setRef(!refresh);
                CloseModal();
              }}>
              Save changes
            </button>
          </div>
          {/* End  Modal Bottom */}
        </Sweet_Modal>
      )}
      {modal_id === 3 && (
        <Sweet_Modal show={true} title="Apply filter">
          <div className="row">
            {/* filter fields  */}
            <div className="col-md-12 mt-2">
              {/*filter for Date */}
              <div className="d-flex">
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    setdate({
                      ...date_form,
                      from: e.target.value,
                    });
                  }}
                />
                <b className="mt-1 ms-1 me-1">to</b>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    setdate({
                      ...date_form,
                      to: e.target.value,
                    });
                  }}
                />
              </div>
              {/*End filter for Date */}
            </div>
            {/* End filter fields  */}
          </div>
          <hr />
          {/* Modal Bottom */}
          <div className="text-center">
            <button
              type="button"
              className="btn ms-2 btn-warning"
              onClick={handleClearFilter}>
              Clear
            </button>
            <button
              type="button"
              className="btn ms-2 btn-primary"
              onClick={() => {
                export_data();
                CloseModal();
              }}>
              Save changes
            </button>
          </div>
          {/* End  Modal Bottom */}
        </Sweet_Modal>
      )}
    </div>
  );
};

export default Ind_Polish;
