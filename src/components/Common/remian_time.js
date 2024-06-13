import React from "react";

const TimeCal = (time) => {
  var result = false;
  var result2 = {
    day: 0,
    hour: 0,
    mint: 0,
  };
  const date = new Date();
  if (date.getFullYear() <= time.getFullYear()) {
    if (date.getMonth() <= time.getMonth()) {
      if (date.getDate() <= time.getDate()) {
        result2.day = date.getDate() - time.getDate();
        if (date.getHours() <= time.getHours()) {
          result2.hour = time.getHours() - date.getHours();
          if (date.getMinutes() <= time.getMinutes()) {
            result2.mint = time.getMinutes() - date.getMinutes();
            result = true;
          } else {
            else_res();
          }
        } else {
          else_res();
        }
      } else {
        else_res();
      }
    }
  }

  function else_res() {
    result2.day = time.getDate() - date.getDate();
  }
  return { res: result, time: result2 };
};

export default TimeCal;
