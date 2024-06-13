const PlannedTime_Format = ({ date, hours, mintues = 0, type = 1 }) => {
  var today = new Date(date);
  (function () {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    Date.prototype.getDayName = function () {
      return days[this.getDay()];
    };
  })();
  var day = today.getDayName();
  if (today.getHours() + hours > 19) {
    if (day === "Saturday") {
      today.setDate(today.getDate() + 2);
    } else {
      today.setDate(today.getDate() + 1);
    }
    var leftHours = 19 - today.getHours();
    if (today.getHours() + hours < 24) {
      today.setMinutes(today.getMinutes() + mintues);
      today.setMinutes(today.getMinutes() + mintues);
      today.setHours(9 + hours - leftHours);
    } else {
      today.setMinutes(today.getMinutes() + mintues);
      today.setHours(9 + hours);
    }
  } else {
    if (day === "Sunday") {
      today.setDate(today.getDate() + 1);
    } else {
      today.setDate(today.getDate());
    }
    today.setHours(today.getHours() + hours);
    today.setMinutes(today.getMinutes() + mintues);
  }
  if (type === 1) {
    today =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
  }
  return today;
};
export default PlannedTime_Format;
