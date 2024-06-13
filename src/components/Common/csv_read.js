import * as XLSX from "xlsx";
function CSV_READER(data) {
  const file = data.target.files[0];
  const reader = new FileReader();
  var list = undefined;

  return new Promise((resolve, reject) => {
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary", blankRows: false });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      // const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      list = XLSX.utils.sheet_to_row_object_array(ws);
      resolve(list);
    };
    reader.readAsBinaryString(file);
  });
}

export default CSV_READER;
