import './otp.css';
import React, { useState, useEffect, useRef } from 'react'
import apis from "../api";
import secretKey from 'secret-key';
import Tubes from './Tubes'
// const coords = "de84c671-f59f-40d2-86f5-77dadd39d46a" // this is changing according to the Tium

export default function AddClient({ totalTests, setTotalTests }) {
    const idInputRef = useRef(null)
    const [clientId, setClientId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [kupaName, setKupaName] = useState('')
    const [message, setMessage] = useState('');
    const [goodMessage, setGoodMessage] = useState('');

    const [isTask, setIsTask] = useState(false)
    const [source, setSource] = useState('')
    const [date, setDate] = useState('')
    const [idType, setIdType] = useState(1)



    function clearAddClientFields() {
        setFirstName('')
        setLastName('')
        setKupaName('')
        setMessage('')
        setGoodMessage('')
        setIsTask(false)
        setDate('')
        setIdType(1)
        setSource('')
        setClientId('')
        idInputRef.current.focus();



    }

    function addExtraFields(lastUpdate) {
        console.log("extra fields")
        let currUser = JSON.parse(localStorage.getItem("currUser"))
        let assignedTester = currUser.id
        return {
            assignedTester,
            femiCode: "",
            isUrgent: false,
            insurerReferenceId:"",
            requestTime: createCurrDate(),
            status: 0,
            supplierCode: "",
            supplierDesc: "",
            reception: {
                businessType: 1,
                completedTime: "1899-12-31T21:39:20",
                createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                createdDate: "2022-01-07T06:11:59.527",
                id: "d9c27ffd-f563-493a-a012-4c95b0084fbe",
                institute: {
                  address: "מנחם יצחק 5 רמת גן",
                  businessType: 1,
                  city: "רמת גן",
                  code: "237Q4",
                  contactName: "שרית אבני",
                  contactPhone: "0535725287",
                  district: {
                    id: 1001,
                    title: "פמי"
                  },
                  houseNumber: "5",
                  id: 358,
                  name: "רמת אור אחד",
                  requestID: "1031378",
                  street: "מנחם יצחק 5",
                  type: {
                    id: 101,
                    title: "מוסד גריאטרי"
                  }
                },
                notes: "",
                receptionDate: "2022-01-07T00:00:00",
                status: true,
                tester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87"
              }
        }
    }

    // 2021-10-06T11:08:32.893   - this is the format 
    function createCurrDate() {
        var dt = new Date(); 
        let sDate = dt.toISOString() // decrease 3 hours from actual time
        return sDate.slice(0, -1)
    }
    async function creatTaskJson(client, lastUpdate) {
        let key = secretKey.create('1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X')
        console.log(key)
        let dupClient = { ...client }
        let sourceTmp = key.iv
        setSource(sourceTmp)
        dupClient.source = sourceTmp
        let roleData = await apis.getRole(dupClient.role)
        dupClient.role = roleData
        dupClient.insurer = await apis.getKupa(dupClient.insurer)
        let res = await apis.getCoordination(apis.coordsId)
        dupClient.institute = res.data.institute
    
        dupClient = Object.assign(dupClient, addExtraFields(lastUpdate));
        delete dupClient.lastUpdated
        delete dupClient.phone2
        delete dupClient.phoneAreaCode2
        delete dupClient.email
        delete dupClient.email2
        console.log(dupClient)
        return dupClient
    }

    function parseWithZeros() {
        let i = 0
        let s = ""
        if (idType === 1) {

            while (i < 9 - clientId.length) {
                s += "0"
                i++
            }
        }
        return s + clientId
    }
    async function findClient() {
        let client
        let task
        let res
        let newId = parseWithZeros()
        setClientId(newId)
        setFirstName('')
        setLastName('')
        setKupaName("")
        try {
            res = await apis.findClient(newId, idType)

            if (res.status === 204) {
                setMessage("cannot find the data")
            } else {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setKupaName(await getKupaName(res.data.insurer))
                console.log("date")
                console.log(res.data.lastUpdated + "Z")
                console.log("date")

                setDate(res.data.lastUpdated + "Z")
                setMessage("")
                client = res.data
            }
        } catch (err) {
            console.log(err.status)

            if (err.response && err.response.data) {
                console.log(err.response.data.message);
                setMessage(err.response.data.message)
            } else {
                setMessage("something went wrong")
            }
        }
        try {
            if (client) {
                task = await creatTaskJson(client, res.data.lastUpdated)
                console.log("object")
                console.log(task)
                setGoodMessage("task created")
                setIsTask(true)

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

    async function getKupaName(kupaNum) {
        let kupa = await apis.getKupa(kupaNum)
        return kupa.title
    }

    return (
        <div className="otp-wrapper">
            <p>totalTests: {totalTests}</p>


            <h1>add client page</h1>

            <div>
                <input type="radio" id="id"
                    name="contact" value="id" onChange={() => setIdType(1)} checked={idType === 1} />
                <label for="id">id</label>

                <input type="radio" id="passport" onChange={() => setIdType(2)} checked={idType === 2}
                    name="contact" value="passport" />
                <label for="passport">passport</label>
            </div>
            {idType == 1 && (
                <input type="text" ref={idInputRef} maxLength="9" autoFocus placeholder="id" value={clientId} defaultValue="" onChange={e => setClientId(e.target.value)} />
            )}
            {idType == 2 && (
                <input type="text" placeholder="passport" autoFocus defaultValue="" value={clientId} onChange={e => setClientId(e.target.value)} />
            )}
            <button onClick={findClient}>find client</button>
            <p className="no-margin">{firstName}</p>
            <p className="no-margin">{lastName}</p>
            <p className="no-margin">{kupaName}</p>
            <p className="success-message">{goodMessage}</p>

            <p className="err-message">{message}</p>
            {isTask && (
                <Tubes source={source} totalTests={totalTests} setTotalTests={setTotalTests} clearAddClientFields={clearAddClientFields} />
            )}
        </div>
    )
}
