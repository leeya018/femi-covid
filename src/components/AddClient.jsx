import './otp.css';

import React, { useState } from 'react'
import apis from "../api";

export default function AddClient() {

    const [clientId, setClientId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [message, setMessage] = useState('');
    const [tubeId, setTubeId] = useState('');
    const [coolerId, setCoolerId] = useState('');
    const [igumId, setIgumId] = useState('');


    function addExtraFields() {
        return {
            assignedTester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
            femiCode: "",
            isUrgent: false,
            kupaReferenceId: "",
            requestTime: "2021-10-01T23:08:32.893Z",
            status: 0,
            supplierCode: "",
            supplierDesc: "",
        }
    }



    function generateCode() {

    }
    async function creatTaskJson(client) {

        const coords = "bd8a3d31-dbd8-4685-9d6a-a9780f49b3d6"
        let dupClient = { ...client }
        let source = '3ea4e6bc-91c0-4335-9b7d-de160c1a16ac'
        dupClient.source = source
        let roleData = await apis.getRole(dupClient.role)
        dupClient.role = roleData
        dupClient.kupa = await apis.getKupa(dupClient.kupa)
        let res = await apis.getCoordination(coords)
        dupClient.institute = res.data.institute
        dupClient.coordination = res.data


        dupClient = Object.assign(dupClient, addExtraFields());
        delete dupClient.lastUpdated
        delete dupClient.phone2
        delete dupClient.phoneAreaCode2
        delete dupClient.email
        delete dupClient.email2

        console.log(dupClient)
        return dupClient
    }



    async function findClient() {

        let client = (await apis.findClient(clientId)).data
        let task = await creatTaskJson(client)
        console.log("object")
        console.log(task)
        console.log("object")
        let a = {
            source: "3ea4e6bc-91c0-4335-9b7d-de160c6a17a2",
            coordination: {
              id: "bd8a3d31-dbd8-4685-9d6a-a9780f49b3d6",
              tester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
              institute: {
                id: 42,
                name: "אקים בת ים",
                code: "8301100151",
                type: {
                  id: 101,
                  title: "מוסד גריאטרי"
                },
                address: "קינמון 10, בת ים",
                contactName: "יוסי כהן",
                contactPhone: "052-8534516",
                city: "בת ים",
                street: "קינמון",
                houseNumber: "10",
                requestID: "1024872",
                district: {
                  id: 1001,
                  title: "פמי"
                },
                coordinationType: 1
              },
              status: false,
              coordinationDate: "2021-10-02T00:00:00",
              completedTime: "1899-12-31T21:39:20",
              notes: "",
              createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              createdDate: "2021-10-02T13:10:40.49",
              type: 1
            },
            femiCode: "",
            status: 0,
            supplierCode: "",
            supplierDesc: "",
            idType: 1,
            idNum: "300628583",
            firstName: "לי",
            lastName: "יהב",
            birthDate: "1987-01-15T00:00:00",
            cityCode: "1271",
            cityDesc: "להבים",
            streetCode: "102",
            streetDesc: "להבים",
            houseNumber: "6",
            phoneAreaCode: "054",
            phone1: "2226958",
            requestTime: "2021-10-03T13:03:19.992Z",
            isUrgent: false,
            kupaReferenceId: "",
            kupa: {
              id: 101,
              title: "כללית"
            },
            assignedTester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
            institute: {
              id: 42,
              name: "אקים בת ים",
              code: "8301100151",
              type: {
                id: 101,
                title: "מוסד גריאטרי"
              },
              address: "קינמון 10, בת ים",
              contactName: "יוסי כהן",
              contactPhone: "052-8534516",
              city: "בת ים",
              street: "קינמון",
              houseNumber: "10",
              requestID: "1024872",
              district: {
                id: 1001,
                title: "פמי"
              },
              coordinationType: 1
            },
            role: {
              id: 5,
              title: "צוות מטפל"
            }
          }

        let resTask = await apis.createTask(task)
        console.log(resTask.data)


    }


    // apis.findClient(clientId).then(res => {
    //     console.log(res.data)
    //     if (res.status === 204) {
    //         setMessage("cannot find the data")
    //     } else {
    //         setFirstName(res.data.firstName)
    //         setLastName(res.data.lastName)
    //         setMessage("")
    //         let task = await creatTaskJson(res.data)
    //         apis.createTask(task).then(res=>{
    //             console.log(res.data)
    //         }).catch(err=>{
    //             console.log(err.response)

    //         })


    //     }

    // }).catch(err => {
    //     if (err.response && err.response.data) {
    //         console.log(err.response.data.message);
    //         setMessage(err.response.data.message)
    //     }
    // })
    // }
    return (
        <div className="otp-wrapper">
            <h1>add client page</h1>
            <input type="text" placeholder="id" onChange={e => setClientId(e.target.value)} />
            <button onClick={findClient}>find client</button>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p className="err-message">{message}</p>
            <input type="text" placeholder="tubeId" onChange={e => setTubeId(e.target.value)} />
            <input type="text" placeholder="coolerId" onChange={e => setCoolerId(e.target.value)} />
            <input type="text" placeholder="igumId" onChange={e => setIgumId(e.target.value)} />

        </div>
    )
}

