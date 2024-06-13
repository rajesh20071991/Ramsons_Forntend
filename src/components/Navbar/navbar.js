import React, { useState, useEffect, useRef } from "react";
import logoo from "../Assets/logoo.png";
import { useSelector } from "react-redux";
import config from "../../config";
import { IoMdNotifications } from "react-icons/io";
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
  const [showTitlebar, setShowTitlebar] = useState(false); // Ad

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
      setLoading(false); // Set loading to false when data is fetched
      setShowTitlebar(true); // Show the titlebar after successful login
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
    navigate("/user_mamagement");
  };

  // useEffect(() => {
  //   const audio = new Audio("./sounds/welcome_sound.mp3");
  //   audio.play();
  // }, []);

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
            {/* <div className="notification-icon">
              <IoMdNotifications size={"30px"} />
            </div> */}
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
                    <Popover.Body>
                      <div className="popcard">
                        {state.user && state.user.image && (
                          <img
                            height="100px"
                            width="100px"
                            className="rounded-circle"
                            src={config.apiEndpoint + state.user.image}
                            alt="Profile"
                          />
                        )}
                        {state.user && state.user && (
                          <h3
                            style={{
                              textAlign: "center",
                              fontSize: "15px",
                              marginTop: "10px",
                              textTransform: "uppercase",
                              color: "white",
                            }}>
                            {state.user.first_name + " " + state.user.last_name}
                          </h3>
                        )}
                        {state.user && state.user && (
                          <h3
                            style={{
                              textAlign: "center",
                              fontSize: "15px",
                              marginTop: "10px",
                              textTransform: "uppercase",
                              color: "white",
                            }}>
                            {state.user.username}
                          </h3>
                        )}
                      </div>
                      <ul className="list-group list-group-flush">
                        <button
                          className="border-light list-group-item-action list-group-item"
                          onClick={goToProfile}>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3.3c1.49 0 2.7 1.21 2.7 2.7 0 1.49-1.21 2.7-2.7 2.7-1.49 0-2.7-1.21-2.7-2.7 0-1.49 1.21-2.7 2.7-2.7zM18 16H6v-.9c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.9z"></path>
                          </svg>
                          Profile
                        </button>
                        {localStorage.getItem("user_access") === "true" && (
                          <button
                            className="border-light list-group-item-action list-group-item"
                            onClick={goToUser}>
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path>
                            </svg>
                            User Management
                          </button>
                        )}
                        <button className="border-light list-group-item-action list-group-item">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path>
                          </svg>
                          Change Password
                        </button>
                        <button
                          className="border-light list-group-item-action list-group-item"
                          onClick={handleLogout}>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                          </svg>
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
                <img style={logo} src={logoo} alt="login" />
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

const logo = {
  width: "150px",
  display: "inline",
  borderRadius: "40%",
  marginLeft: "50px",
  marginTop: "10px",
  backgroundColor: "white",
};
