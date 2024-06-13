import { GetCurrentDate, GetCurrentTime } from "./time";

const GenrateTimeQuery = (t, n) => {
  const datetime = GetCurrentDate() + "T" + GetCurrentTime();
  var q = "";
  if (t) {
    if (t["start"] !== "" || t["end"] !== "") {
      q += "&" + n + "__range=";
      if (t["start"] === "") {
        q += "2000-01-01," + t["end"];
      } else if (t["end"] === "") {
        q += t["start"] + "," + datetime;
      } else {
        q += t["start"] + "," + t["end"];
      }
    }
  }
  return q;
};

export default GenrateTimeQuery;
