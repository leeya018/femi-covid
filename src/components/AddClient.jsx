import './otp.css';
import React, { useState, useEffect, useRef } from 'react'
import apis from "../api";
import secretKey from 'secret-key';
import Tubes from './Tubes'
import FindIdByName from './FindIdByName'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//change in here between with Igum and without 
const WITH_IGUM = true 



export default function AddClient({ allClienstFromInstitution,totalTests,setTotalTests }) {
    const idInputRef = useRef(null)

    const [clientId, setClientId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [kupaName, setKupaName] = useState('')
    const [message, setMessage] = useState('');
    const [kupaId, setKupaId] = useState();

    const [idIputFocus, setIdIputFocus] = useState(false);
    
    
    const [goodMessage, setGoodMessage] = useState('');

    const [isTask, setIsTask] = useState(false)
    const [source, setSource] = useState('')
    const [date, setDate] = useState('')
    const [idType, setIdType] = useState(1)
    const [show, setShow] = useState(false)
    const [allKupas, setAllKupas] = useState(false)


    const [showNewClientWindow, setShowNewClientWindow] = useState(false)
    // firstName: "חווה"
    // idNum: "010532927"
    // idType: 1
    // label: "חווה תמיר"
    // lastName: "תמיר"
    
    useEffect(async () => {
        setClientId(localStorage.getItem("clientId")) // get the Id if its exists in LocalStorage

        let tempArrKupas = (await apis.getKupas()).data
        let newKupasArr = tempArrKupas.map(kupa => ({"label": kupa.title, "id":kupa.id, "title" :kupa.title})) 
        setAllKupas(newKupasArr)

    }, [])
    
    
    
    useEffect(() => {
        if(idIputFocus == true){
            idInputRef.current.focus();
        }
    },[idIputFocus]);


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
           
            receptionEnteredTime: createCurrDate(),
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
        // dupClient.rowVersion = null
        // dupClient.serologyStatus = null
        dupClient.insurer = await apis.getKupa(dupClient.insurer)
        let res = await apis.getCoordination(apis.coordsId)
        dupClient.institute = res.data.institute
        dupClient.reception = res.data
        dupClient.receptionEnteredBy= res.data.createdBy 
        // dupClient.antigenStatus = null 
        
        dupClient = Object.assign(dupClient, addExtraFields(lastUpdate));
        delete dupClient.lastUpdated
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


    function is_israeli_id_number(idInput) {
        let id = String(idInput).trim();
        if (id.length > 9 || isNaN(id)) return false;
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
            return Array.from(id, Number).reduce((counter, digit, i) => {
                const step = digit * ((i % 2) + 1);
                return counter + (step > 9 ? step - 9 : step);
            }) % 10 === 0;
    }


    function validateFields(){
        if(!is_israeli_id_number(clientId)){
            alert("id is not valid")
            throw 'id is not valid';
        }
        if(!firstName || !lastName || !kupaId ){
            alert("need to feel all fienlds")
            throw 'need to feel all fienlds';
            
        }
    }

    // creating a new client that is not exist
    async function createClient(){

        validateFields()
        let defaulId = "000000000"
        let defaulIdType = 1
        let res
        let client
        let task
        try {
            res = await apis.findClient(defaulId, defaulIdType)

            if (res.status === 204) {
                setMessage("cannot find the data")
            } else {
     
                res.data.firstName = firstName
                res.data.lastName = lastName
                res.data.insurer = kupaId
          
                res.data.idNum = clientId
                res.data.cityDesc ="רמת גן"

                res.data.phoneAreaCode = "2222222"
                res.data.phone1 = "054"

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
                setShowNewClientWindow(false)
            }
        } catch (err) {
            console.log(err)
        }
        //need to change status

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
            <button onClick={()=>{setShowNewClientWindow(!showNewClientWindow)}}>create new client</button>
            <p>totalTests: {totalTests}</p>

            <FindIdByName allClienstFromInstitution={allClienstFromInstitution} updateIdIputFocus={setIdIputFocus} updateNumId={setClientId} updateIdType={setIdType} />
            <div>
                <input type="radio" id="id"
                    name="contact" value="id" onChange={() => setIdType(1)} checked={idType === 1} />
                <label htmlFor="id">id</label>

                <input type="radio" id="passport" onChange={() => setIdType(2)} checked={idType === 2}
                    name="contact" value="passport" />
                <label htmlFor="passport">passport</label>
            </div>
            {idType == 1 && (
                <input type="text" ref={idInputRef}  maxLength="9"  placeholder="id" value={clientId} onChange={e => setClientId(e.target.value)} />
            )}
            {idType == 2 && (
                <input type="text" ref={idInputRef} placeholder="passport"  value={clientId} onChange={e => setClientId(e.target.value)} />
            )}
            <button onClick={findClient}>find client</button>

            {(showNewClientWindow) && (
                <div>
                

                    <input type="text" placeholder='firstName' onChange={(e)=>{setFirstName(e.target.value)}} value={firstName} /> <br />
                    <input type="text" placeholder='lastName' onChange={(e)=>{setLastName(e.target.value)}} value={lastName} /> <br />
                    
                    
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={allKupas}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField  autoFocus  {...params} label="kupa" />}
                    
                    onChange={(event, kupa) => {
                        setKupaId(kupa.id)
                                }}
        
              />

                    <button onClick={createClient}>A NEW CLIENT</button>
                </div>
            )

            }

            <p className="no-margin">{firstName}</p>
            <p className="no-margin">{lastName}</p>
            <p className="no-margin">{kupaName}</p>
            <p className="success-message">{goodMessage}</p>

            <p className="err-message">{message}</p>
            {isTask && (
                <Tubes source={source} withIgum={WITH_IGUM} totalTests={totalTests} setTotalTests={setTotalTests} clearAddClientFields={clearAddClientFields} clientId={clientId}/>
            )}
        </div>
    )
}
