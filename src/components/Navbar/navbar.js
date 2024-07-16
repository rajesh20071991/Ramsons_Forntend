import React, { useState, useEffect, useRef } from "react";
import logoo from "../Assets/logoo.png";
import { useSelector } from "react-redux";
import config from "../../config";
import { Alert } from "react-bootstrap";
import NavItems from "./navItems";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const state = useSelector((state) => state.authData);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const resizeHandler = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTitlebar, setShowTitlebar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setLoggedInUser(user);
      setLoading(false);
      setShowTitlebar(true);
      setShowAlert(true);
      setAlertMessage(
        "Hello Developer, kindly do software testing pending within 1 day, otherwise, it may crash."
      );

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, []);

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToUser = () => {
    navigate("/user_management");
  };

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <>
      {showTitlebar && (
        <>
          <div className="titlebar">
            {windowWidth < 768 && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  onClick={openNav}
                  className="bi bi-menu-button-fill"
                  viewBox="0 0 16 16">
                  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h8A1.5 1.5 0 0 0 11 3.5v-2A1.5 1.5 0 0 0 9.5 0h-8zm5.927 2.427A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0l-.396-.396zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                </svg>
                <h5 className="title">Ramsons Stainless</h5>
              </div>
            )}
            <div className="time">{currentTime}</div>
            {showAlert && (
              <Alert
                variant="warning"
                onClose={() => setShowAlert(false)}
                dismissible>
                {alertMessage}
              </Alert>
            )}
            <div className="logout-icon">
              <div ref={ref}>
                {state.user && state.user.image && (
                  <img
                    height="40px"
                    width="40px"
                    className="rounded-circle"
                    src={config.apiEndpoint + state.user.image}
                    alt="Profile"
                    onClick={handleClick}
                  />
                )}
                <Overlay
                  show={show}
                  target={target}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}>
                  <Popover id="popover-contained">
                    <Popover.Header
                      as="h3"
                      style={{ textAlign: "center", color: "black" }}>
                      Profile
                    </Popover.Header>
                    <Popover.Body style={{ textAlign: "center" }}>
                      {state.user && state.user.image && (
                        <img
                          height="100px"
                          width="100px"
                          className="rounded-circle"
                          src={config.apiEndpoint + state.user.image}
                          alt="Profile"
                        />
                      )}
                      {state.user && (
                        <h3
                          style={{
                            fontSize: "15px",
                            marginTop: "10px",
                            textTransform: "uppercase",
                            color: "white",
                          }}>
                          {state.user.first_name + " " + state.user.last_name}
                        </h3>
                      )}
                      {state.user && (
                        <h3
                          style={{
                            fontSize: "15px",
                            marginTop: "10px",
                            textTransform: "uppercase",
                            color: "white",
                          }}>
                          {state.user.username}
                        </h3>
                      )}
                      <ul className="list-group list-group-flush">
                        <button
                          className="border-light list-group-item-action list-group-item"
                          onClick={goToProfile}>
                          Profile
                        </button>
                        {localStorage.getItem("user_access") === "true" && (
                          <button
                            className="border-light list-group-item-action list-group-item"
                            onClick={goToUser}>
                            User Management
                          </button>
                        )}
                        <button className="border-light list-group-item-action list-group-item">
                          Change Password
                        </button>
                        <button
                          className="border-light list-group-item-action list-group-item"
                          onClick={handleLogout}>
                          Signout
                        </button>
                      </ul>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </div>
            </div>
          </div>
          {windowWidth >= 768 && (
            <>
              <h6 className="icon-rm">
                <img style={logoStyle} src={logoo} alt="login" />
              </h6>
              <h5 className="title">Ramsons Stainless</h5>
              <div className="desktop_bar">
                <NavItems />
              </div>
            </>
          )}
          {windowWidth < 768 && (
            <div id="mySidenav" className={`sidenav ${showNav ? "open" : ""}`}>
              <a className="closebtn" onClick={closeNav}>
                &times;
              </a>
              <NavItems />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Nav;

const logoStyle = {
  width: "150px",
  display: "inline",
  borderRadius: "40%",
  marginLeft: "50px",
  marginTop: "10px",
  backgroundColor: "white",
};
