import React, { useState } from 'react'
import BarcodeReader from 'react-barcode-reader'

export default function() {
  const [result, setResult] = useState('No result')

  function handleScan(data){
    setResult(data)
  }
 function handleError(err) {     
     console.error(err)
 }

    return(
      <div>
        <BarcodeReader
          onError={handleError}
          onScan={handleScan}
          />
        <p>{result}</p>
      </div>
    )
  }

