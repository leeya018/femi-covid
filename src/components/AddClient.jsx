import './otp.css';
import React, { useState } from 'react'
import apis from "../api";
import secretKey from 'secret-key';
import Tubes from './Tubes'

export default function AddClient({ totalTests }) {
    const [clientId, setClientId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [message, setMessage] = useState('');
    const [found, setFound] = useState(false)
    const [source, setSource] = useState('')

    function addExtraFields() {
        return {
            assignedTester: "780d19da-b4e2-4efe-bc46-2cc91ab0eb87",
            femiCode: "",
            isUrgent: false,
            kupaReferenceId: "",
            requestTime: "2021-10-01T23:08:32.893Z", // change this one to the new date format
            status: 1,
            supplierCode: "",
            supplierDesc: "",
        }
    }
    async function creatTaskJson(client) {
        let key = secretKey.create('1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X')
        console.log(key)
        const coords = "bd8a3d31-dbd8-4685-9d6a-a9780f49b3d6" // this is changing according to the Tium
        let dupClient = { ...client }
        let sourceTmp = key.iv
        setSource(sourceTmp)
        dupClient.source = sourceTmp
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
        let client
        let task
        try {
            let res = await apis.findClient(clientId)
            if (res.status === 204) {
                setMessage("cannot find the data")
            } else {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setMessage("")
                client = res.data
                setFound(true)
            }
        } catch (err) {
            console.log(err)
            setMessage(err.response.data.message)
        }
        try {
            if (client) {
                task = await creatTaskJson(client)
                console.log("object")
                console.log(task)
                console.log("object")
            }
        } catch (err) {
            console.log(err)
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
    }
    return (
        <div className="otp-wrapper">
            <p>totalTests: {totalTests}</p>
            <p>cooler amount: {totalTests % 51}</p>
            <p>Igum amount: {totalTests % 16}</p>

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
