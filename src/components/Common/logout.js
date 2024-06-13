import React, { useState, useEffect } from "react";

const AutoLogout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  let timeout;
  console.log(isLoggedIn);
  useEffect(() => {
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsLoggedIn(false);
        localStorage.clear();
        window.location.href = "/login";
      }, 3600000); // Set the idle time duration (in milliseconds) here, e.g., 1 minute
    };

    resetTimeout();

    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keydown", resetTimeout);

    return () => {
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keydown", resetTimeout);
    };
  }, []);

  return <div>{isLoggedIn ? <h1></h1> : <h1></h1>}</div>;
};

export default AutoLogout;
