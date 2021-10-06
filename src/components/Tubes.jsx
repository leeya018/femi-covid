import './otp.css';
import React, { useState,useEffect } from 'react'
import apis from '../api';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

export default function Tubes({ source }) {
    let history = useHistory();

    const [tubeId, setTubeId] = useState('');
    const [coolerId, setCoolerId] = useState('');
    const [igumId, setIgumId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setCoolerId(localStorage.getItem("coolerId"))
        setIgumId(localStorage.getItem("igumId"))

    }, [])
    async function validateTube(tubeId) {
        let res = await apis.validateTube(tubeId)
        if (res.data == true) return true
        setMessage("tube err")
        return false
    }
    async function validateCooler() {
        let res = await apis.validateTube(coolerId)
        if (res.data == true) return true
        setMessage("cooler err")
        return false
    }
    async function validateIgum() {
        let res = await apis.validateIgum(igumId, coolerId)
        if (res.data == true) return true
        setMessage("igum err")
        return false
    }
    async function addRec() {
        console.log("hola")
        // let source = "365e31b3-299f-4145-aa3d-a7f3a0532d0f"
        let data = {
            source, tubeId, coolerId, igumId
        }

        let res
        try {
            if (await validateTube(tubeId)) {
                if (await validateCooler(coolerId)) {
                    if (await validateIgum(igumId, coolerId)) {
                        res = await apis.addRec(data)
                        if (res.status === 200) {
                            history.push("/clients");;
                        } else {
                            setMessage(res.status)
                        }

                    }
                }
            }

        } catch (err) {
            setMessage(err.response)
        }
    }
    function handleChangeCooler(e){
        setCoolerId(e.target.value)
        localStorage.setItem("coolerId",e.target.value)
    }


    function handleChangeIgum(e){
        setIgumId(e.target.value)
        localStorage.setItem("igumId",e.target.value)
    }
    
    return (
        <div>
            <div className="cols">
                <input type="text" placeholder="tubeId" maxlength="9" onChange={e => setTubeId(e.target.value)} />
                <input type="text" placeholder="coolerId" maxlength="11" onChange={handleChangeCooler }  value={coolerId}/>
                <input type="text" placeholder="igumId" maxlength="9" onChange={handleChangeIgum } value={igumId} />
                <button onClick={addRec}>add client</button>
            </div>


        </div>
    )
}
