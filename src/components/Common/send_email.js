
import React from "react";
import emailjs from "@emailjs/browser";
import getBase64 from "../../components/Common/file_reader";

const SendEmail = (props) => {
  function send() {
    console.log(props.code);
    if (
      document.getElementById("file") &&
      document.getElementById("file").value
    ) {
      getBase64(document.getElementById("file").files[0])
        .then((result) => {
          var templateParams = {
            file: props.code,
            // file_name:"name.html",
            message: "Nothing...",
            subject: "Check this!",
            to: "of.mukesh@gmail.com",
            to_name: "User",
          };
          emailjs
            .send("service_aep6gd8", "template_h1pbg55", templateParams)
            .then(
              function (response) {
                alert("SUCCESS!");
              },
              function (error) {
                alert("FAILED..." + error);
              }
            );
        })
        .catch((err) => {
          alert("FAILED..." + err);
        });
    } else {
      alert("Please select file");
    }
  }
  return (
    <>
      <div className="container-fluid top_table mt-3 p-1">
        <div className="d-flex">
          <h4 className="filterPageTitle2 mt-2">#️⃣</h4>
          <h4 className="filterPageTitle mt-2">#️⃣{props.title}</h4>
          <div className="ms-auto mt-1">
            <div className="row">
              <div className="col">{props.children}</div>
              <div className="col">
                <input type="file" id="file" className="form-control" />
              </div>
              <div className="col">
                <button type="button" className="btn btn-danger" onClick={send}>
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
