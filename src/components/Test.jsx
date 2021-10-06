import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
 
function Test() {
 
  const [ data, setData ] = React.useState('Not Found');
 
  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text)
          else setData('Not Found')
        }}
      />
      <p>{data}</p>
    </>
  )
}
 
export default Test;
// import React, { useState } from 'react'
// import BarcodeReader from 'react-barcode-reader'

// export default function() {
//   const [result, setResult] = useState('No result')

//   function handleScan(data){
//     setResult(data)
//   }
//  function handleError(err) {     
//      console.error(err)
//  }

//     return(
//       <div>
//         <BarcodeReader
//           onError={handleError}
//           onScan={handleScan}
//           />
//         <p>{result}</p>
//       </div>
//     )
//   }

