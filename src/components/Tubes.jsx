import './otp.css';
import React, { useState } from 'react'
import apis from '../api';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

export default function Tubes({ source }) {
    let history = useHistory();

    const [tubeId, setTubeId] = useState('');
    const [coolerId, setCoolerId] = useState('');
    const [igumId, setIgumId] = useState('');
    const [message, setMessage] = useState('');

    async function addRec() {
        // let source = "365e31b3-299f-4145-aa3d-a7f3a0532d0f"
        let data = {
            source, tubeId, coolerId, igumId
        }

        async function validateTube(tubeId) {
            let res = await apis.validateTube(tubeId)
            if (res.data == true) return true
            setMessage("tube err")
            return false
        }
        async function validateCooler(coolerId) {
            let res = await apis.validateTube(coolerId)
            if (res.data == true) return true
            setMessage("cooler err")
            return false
        }
        async function validateIgum(igumId, coolerId) {
            let res = await apis.validateIgum(igumId, coolerId)
            if (res.data == true) return true
            setMessage("igum err")
            return false
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
    return (
        <div>
            <div className="cols">
                <input type="text" placeholder="tubeId" maxlength="9" onChange={e => setTubeId(e.target.value)} />
                <input type="text" placeholder="coolerId" maxlength="11" onChange={e => setCoolerId(e.target.value)} />
                <input type="text" placeholder="igumId" maxlength="9" onChange={e => setIgumId(e.target.value)} />
                <button onClick={addRec}>add client</button>
            </div>


        </div>
    )
}
