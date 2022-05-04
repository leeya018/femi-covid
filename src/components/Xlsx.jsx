import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function Xlsx({ updateAllClienstFromInstitution, updateIsXlsz }) {
  const [data, setData] = useState([])
  const [numOfFiles, setNumOfFiles] = useState(0)



  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();



    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const newData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData([...data, ...newData])
      console.log([...data, ...newData])
      createClientObj([...data, ...newData])
    };
    reader.readAsBinaryString(file);
    setNumOfFiles(numOfFiles + 1)
    updateIsXlsz(true)
  };


  function createClientObj(arr) {
    // let { first, last, id } = client
    let clients = []
    let dupArr = [...arr]
    dupArr.shift()
    dupArr.shift()

    for (const client of dupArr) {
      if (client[0] !== undefined && client[1] !== undefined) {
        clients.push(
          {
            idNum: client[1].toString(),
            firstName: client[0].split(" ")[0],
            lastName: client[0].split(" ")[1],
            idType: 1,
            label: client[0]
          })
      }
    }
    console.log(clients)
    updateAllClienstFromInstitution(clients)
  }


  return (
    <div>
      <input type="file" onChange={onChange} />
      <span>num of files: {numOfFiles}</span>
    </div>
  );
}