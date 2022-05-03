import React, { useEffect, useState } from 'react'

export default function ShowMissingClients({ clientsAfterTest, allClienstFromInstitution }) {

  const [missing, setMissing] = useState([])
  const [showList, setShowList] = useState(false)

  useEffect(() => {
    if (clientsAfterTest.length > 0 && allClienstFromInstitution.length > 0) {
      console.log("111111")
      console.log(clientsAfterTest)
      console.log(allClienstFromInstitution)
      console.log("111111")
    }
  }, [clientsAfterTest, allClienstFromInstitution])

  function showMissings() {
    setShowList(!showList)
    let missingList = allClienstFromInstitution.filter(client => !clientExists(clientsAfterTest, client))
    console.log("missings")
    console.log(missingList)
    setMissing(missingList)
    console.log("missings")
  }

  function clientExists(clients, c) {
    return clients.find(client => client.idNum == c.idNum) !== undefined
  }

  return (
    <div>
      <button onClick={showMissings}>who is missing</button>
      {
        missing.map(client => (
          showList && (
            <div key={client.idNum}>
              <span>{client.firstName + " " + client.lastName}</span>
              <br />
            </div>
          )

        ))
      }
    </div>
  )
}
