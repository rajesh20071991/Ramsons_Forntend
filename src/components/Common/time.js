export const GetDate = (time) => {
    var res = null;
    var date = new Date(time);
    res = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    return res;
  };
  
  export const GetTime = (time) => {
    var res = null;
    var date = new Date(time);
    res = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return res;
  };
  
  export const GetCurrentDate = () => {
    var res = null;
    var date = new Date();
    res = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return res;
  };
  
  export const GetCurrentTime = () => {
    var res = null;
    var date = new Date();
    res = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return res;
  };