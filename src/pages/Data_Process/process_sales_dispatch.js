import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Sales_Dispatch_Process_Col } from "../../components/Columns/tracking_process";
import { useSelector } from "react-redux";
import { GetsalesProcessData } from "../../redux/actions/data_processAction";
import { useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { ModalCustomStyles } from "../../assets/commonstyle";
import { Formate_Date_Time } from "../../components/Common/datetime";
import { api } from "../../services/api";
import Select from "react-select";

const Sales_Dispatch = () => {
  var data = useSelector((state) => state.DataProcessData.salesProcess_data);

  if (data) {
    var count = data.count;
    var data1 = data.results;
  }

  function Apply() {
    dispatch(GetsalesProcessData(page, size, filtr.name, filtr.id));
    closeModal();
  }

  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(GetsalesProcessData("/api/sales_dispatch/"));
  // }, []);

  useEffect(() => {
    getPaginatedData(1);
  }, []);

  const getPaginatedData = (page) => {
    dispatch(GetsalesProcessData(page));
  };

  function handlePageChange(page) {
    getPaginatedData(page);
  }

  const [filtr, setFilterModal] = useState({
    name: "",
    id: "",
  });

  if (filtr.name !== "") {
    data = data1.filter((item) => item.company_name.includes(filtr.name));
  }
  if (filtr.id !== "") {
    data = data1.filter((item) => item.company_id.includes(filtr.id));
  }
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [modalData, setModalData] = React.useState({
    id: 0,
    step: "",
  });

  function submitdata(e) {
    e.preventDefault();
    var id = modalData.id;
    var step = modalData.ramId;
    var vhhd = modalData.vhdd;
    var singledata = {
      status: e.target.status.value,
      actual_time: Formate_Date_Time,
    };
    api({
      api: "/api/bookingmodel/" + id + "/",
      method: "put",
      body: singledata,
    }).then((data) => {
      if (step === "Step-1") {
        var formdata = {
          step: "Step-2",
          task_name: "Delivery timeline",
          status: "Pending",
          bid_id: vhhd,
        };
        api({
          api: "/api/bookingmodel/",
          method: "post",
          body: formdata,
        });
      } else if (step === "Step-2") {
        var formdata = {
          step: "Step-3",
          task_name: "Sizes sorting",
          status: "Pending",
          bid_id: vhhd,
        };
        api({
          api: "/api/bookingmodel/",
          method: "post",
          body: formdata,
        })
          .then(() => toast("Success", { autoClose: 2000 }))
          .catch(() => {
            toast("failed", { autoClose: 2000 });
          });
      } else {
        return "None";
      }
    });
  }

  function openModal(row) {
    setModalData({
      ...modalData,
      id: row.id,
      ramId: row.step,
      vhdd: row.bid_id.id,
      Dispatch_code: row.bid_id.code,
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setIsOpen2(false);
  }

  return (
    <div className="Sales_Dispatch">
      <div className="table">
        <div className="border m-2 table_body">
          <div className="container-fluid top_table">
            <div className="d-flex">
              <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
              <h4 className="filterPageTitle mt-2">#️⃣Sales_Dispatch</h4>
              <div className="ms-auto filter-component d-flex">
                <button
                  className="btn btn-danger ms-1"
                  size="15px"
                  onClick={(e) => {
                    setIsOpen2(true);
                  }}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
          {data1 && (
            <DataTable
              columns={Sales_Dispatch_Process_Col}
              data={data1}
              selectableRowsComponent={Checkbox}
              dense
              pagination
              paginationServer
              onChangePage={handlePageChange}
              paginationPerPage={data.page_size}
              paginationTotalRows={count}
              pointerOnHover
              selectableRows
              striped={true}
              persistTableHead
              responsive={true}
              onRowClicked={(row) => openModal(row)}
            />
          )}
        </div>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            style={ModalCustomStyles}
          >
            <form className="p-3" onSubmit={submitdata}>
              <center>
                <samp className="text-primary">
                  <h4>Coil No-{modalData.Dispatch_code}</h4>
                </samp>
              </center>
              <div className="form-group">
                <label className="control-label">Status</label>
                <select className="form-control" id="status">
                  <option value="Done">Done</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <center>
                <button
                  onClick={closeModal}
                  className="btn btn-md btn-danger m-3"
                >
                  Close
                </button>
                <input
                  type="submit"
                  value="Save"
                  className="btn btn-primary btn-md m-3"
                />
              </center>
            </form>
          </Modal>
          <Modal
            isOpen={modalIsOpen2}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
            style={ModalCustomStyles}
          >
            <div className="modal_top border-bottom">Apply Filter</div>
            <Select
              className="form-control m-1"
              onChange={(e) => setFilterModal({ ...filtr, name: e.value })}
              // options={companyNames}
            />
            <div className="modal_bottom text-center">
              <button
                className="btn btn-warning btn-sm"
                onClick={() =>
                  setFilterModal({
                    name: "",
                    id: "",
                  })
                }
              >
                Reset
              </button>
              <button className="btn btn-primary btn-sm ms-2" onClick={Apply}>
                Apply
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Sales_Dispatch;
