import React, { useState } from "react";
import "../../components/Common/style/card.css";
import { useSelector } from "react-redux";
import config from "../../config";
import LocationFormModal from "./editprofile";
const Profile = () => {
  const state = useSelector((state) => state.authData);
  const [activeTab, setActiveTab] = useState("about");
  const user = state.user;

  if (!user) {
    // Render loading state or a message when user data is not available
    return <div>Loading...</div>;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const { first_name, last_name, username, image } = user;
  return (
    <div className="container emp-profile">
      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src={config.apiEndpoint + image} alt="Profile Picture" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>
                {first_name} {last_name}
              </h5>
              <h5>{username}</h5>
              <h6>Department</h6>
              <p className="proile-rating"></p>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "about" ? "active" : ""
                    }`}
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected={activeTab === "about"}
                    onClick={() => handleTabChange("about")}>
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "address" ? "active" : ""
                    }`}
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-selected={activeTab === "address"}
                    onClick={() => handleTabChange("address")}>
                    Address
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <LocationFormModal />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-work">
              <p></p>
              <a href=""></a>
              <br />
              <a href=""></a>
              <br />
              <a href=""></a>
              <p></p>
              <a href=""></a>
              <br />
              <a href=""></a>
              <br />
              <a href=""></a>
              <br />
              <a href=""></a>
              <br />
              <a href=""></a>
              <br />
            </div>
          </div>
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className={`tab-pane fade ${
                  activeTab === "about" ? "show active" : ""
                }`}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>User Id</label>
                  </div>
                  <div className="col-md-6">
                    <p>{username}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {first_name} {last_name}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.phone_no}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>DOB</label>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {new Date(user.birthday).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Gender</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.gender === "M" ? "Male" : "Female"}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>DOJ</label>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {new Date(user.date_joined).toLocaleDateString(
                        undefined,
                        { dateStyle: "medium" }
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "address" ? "show active" : ""
                }`}
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Address</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.address}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>City</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.city}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>State</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.state}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Country</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.country}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Pin Code</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.pin_code}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label></label>
                    <br />
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
