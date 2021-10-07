import './otp.css';
import React, { useState } from 'react'
import apis from "../api";
import secretKey from 'secret-key';
import Tubes from './Tubes'
// const coords = "de84c671-f59f-40d2-86f5-77dadd39d46a" // this is changing according to the Tium

export default function AddClient({ totalTests }) {
    const [clientId, setClientId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [message, setMessage] = useState('');
    const [found, setFound] = useState(false)
    const [source, setSource] = useState('')
    const [date, setDate] = useState('')


    function addExtraFields(lastUpdate) {
        console.log("extra fields")
        let currUser = JSON.parse(localStorage.getItem("currUser"))
        let assignedTester = currUser.id
        return {
            assignedTester,
            femiCode: "",
            isUrgent: false,
            kupaReferenceId: "",
            // requestTime: "2021-10-06T11:08:32.893Z", // change this one to the new date format
            requestTime: lastUpdate, // change this one to the new date format
            status: 0,
            supplierCode: "",
            supplierDesc: "",
        }
    }
    async function creatTaskJson(client,lastUpdate) {
        let key = secretKey.create('1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X')
        console.log(key)
        let dupClient = { ...client }
        let sourceTmp = key.iv
        setSource(sourceTmp)
        dupClient.source = sourceTmp
        let roleData = await apis.getRole(dupClient.role)
        dupClient.role = roleData
        dupClient.kupa = await apis.getKupa(dupClient.kupa)
        let res = await apis.getCoordination(apis.coordsId)
        dupClient.institute = res.data.institute
        dupClient.coordination = res.data
        dupClient = Object.assign(dupClient, addExtraFields(lastUpdate));
        delete dupClient.lastUpdated
        delete dupClient.phone2
        delete dupClient.phoneAreaCode2
        delete dupClient.email
        delete dupClient.email2
        console.log(dupClient)
        return dupClient
    }
    async function findClient() {
        let client
        let task
        let res
        try {
             res = await apis.findClient(clientId)
            
            if (res.status === 204) {
                setMessage("cannot find the data")
            } else {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                console.log("date")
                console.log(res.data.lastUpdated + "Z")
                console.log("date")

                setDate(res.data.lastUpdated+"Z")
                setMessage("")
                client = res.data
                setFound(true)
            }
        } catch (err) {
            console.log(err.status)

            if (err.response && err.response.data) {
                console.log(err.response.data.message);
                setMessage(err.response.data.message)
            }else{
                setMessage("something went wrong")
            }
        }
        try {
            if (client) {
                task = await creatTaskJson(client,res.data.lastUpdated)
                console.log("object")
                console.log(task)
                console.log("object")
            }
        } catch (err) {
            console.log(err)
            setMessage(err.status)
        }
        try {
            if (task) {
                let resTask = await apis.createTask(task)
                console.log(resTask.data)
            }
        } catch (err) {
            console.log(err)
        }
        //need to change status

    }
    return (
        <div className="otp-wrapper">
            <p>totalTests: {totalTests}</p>
            <p>cooler amount: {totalTests % 50}</p>
            <p>Igum amount: {totalTests % 15}</p>

            <h1>add client page</h1>
            <input type="text" placeholder="id" defaultValue="30062858" onChange={e => setClientId(e.target.value)} />
            <button onClick={findClient}>find client</button>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p className="err-message">{message}</p>
            {found && (
                <Tubes source={source} />
            )}
        </div>
    )
}
