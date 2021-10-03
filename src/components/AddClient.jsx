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
            antigenStatus: null,
            assignedTester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
            femiCode: "",
            isUrgent: false,
            kupaReferenceId: "",
            orderItemIds: null,
            receptionEnteredBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            receptionEnteredTime: "2021-10-01T23:08:38.7666667",
            requestTime: "2021-10-01T23:08:32.893Z",
            rowVersion: null,
            serologyStatus: null,
            source: "5a5ffb39-f464-4efb-99a9-d72dc7f8c934",
            status: 0,
            supplierCode: "",
            supplierDesc: "",
            unacurateInformationFeedback: null
        }
    }


    
    function generateCode() {
        
    }
    async function creatTaskJson(client) {

        const coords = "bd8a3d31-dbd8-4685-9d6a-a9780f49b3d6"
        let dupClient = { ...client }
        let source = '64d8291b-5ede-4a81-8c29-4decf35f4b85'
        dupClient.source = source
        let roleData = await apis.getRole(dupClient.role)
        dupClient.role = roleData
        dupClient.kupa = await apis.getKupa(dupClient.kupa)
        let res = await apis.getCoordination(coords)
        dupClient.institute = res.data.institute
        dupClient.coordination = res.data


        dupClient = Object.assign(dupClient, addExtraFields());
        delete dupClient.lastUpdated
        console.log(dupClient)
        return dupClient
    }



    async function findClient() {

        let client = (await apis.findClient(clientId)).data
        let task = await creatTaskJson(client)
        console.log("object")
        console.log(task)
        console.log("object")

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

