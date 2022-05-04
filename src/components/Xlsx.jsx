import React from "react";
import * as XLSX from "xlsx";

export default function Xlsx({ updateAllClienstFromInstitution, updateIsXlsz }) {
  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();


    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(data);
      createClientObj(data)
    };
    reader.readAsBinaryString(file);
    updateIsXlsz(true)
  };


  function createClientObj(arr) {
    // let { first, last, id } = client
    let clients = []
    let dupArr = [...arr]
    dupArr.shift()
    for (const client of dupArr) {
      clients.push(
        {
          idNum: client[1].toString(),
          firstName: client[0].split(" ")[0],
          lastName: client[0].split(" ")[1],
          idType: 1,
          label: client[0]
        })
    }
    console.log(clients)
    updateAllClienstFromInstitution(clients)
  }


  return (
    <div>
      <input type="file" onChange={onChange} />
    </div>
  );
}