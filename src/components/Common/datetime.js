const date = new Date();

export const Full_Date_Time = date;

export const Time =
  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

export const Current_Date =
  date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

export const Formate_Date_Time = Current_Date + " " + Time;

export const Year_Date = date.getFullYear();
export const Month_Date = date.getMonth() + 1;


export const convert_date=(date)=>{
  var newDate = new Date(date.toDateString());
  return newDate
}