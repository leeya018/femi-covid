import './otp.css';
import React, { useState, useEffect, useRef } from 'react'
import apis from '../api';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

export default function Tubes({ source, totalTests, setTotalTests, clearAddClientFields }) {
    let history = useHistory();
    const inputCooler = useRef(null);
    const buttonRef = useRef(null);

    const [tubeId, setTubeId] = useState('');
    const [coolerId, setCoolerId] = useState('');
    const [igumId, setIgumId] = useState('');
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabledIgum, setIsDisabledIgum] = useState(false);


    useEffect(() => {
        setCoolerId(localStorage.getItem("coolerId"))
        setIgumId(localStorage.getItem("igumId"))
        checkDisableFields()
        console.log("useEffect Tubes")
    }, [])

    function checkDisableFields() {
        if (totalTests % 60 == 0) {
            localStorage.setItem("coolerId", '')
            setCoolerId("")
        }
        if (localStorage.getItem("coolerId") !== "") {
            setIsDisabled(true)
        }
        if (totalTests % 15 == 0) {
            localStorage.setItem("igumId", '')
            setIgumId("")
        }
        if (localStorage.getItem("igumId") !== "") {
            setIsDisabledIgum(true)
        }
    }
    async function validateTube(tubeId) {
        if (tubeId.substring(0, 2) !== "30") {
            setMessage("tube not start with 30")
            return false
        }
        let res = await apis.validateTube(tubeId)
        if (res.data == true) return true
        setMessage("tube err")
        return false
    }
    async function validateCooler(coolerId) {
        let res
        try {
            res = await apis.validateCooler(coolerId)
            if (res.data.coolerStatus.id == 2) {
                return true
            } else {
                let { id, title } = res.data.coolerStatus
                setMessage("status code of cooler is :" + id + " : " + title)
            }
        } catch (error) {
            console.log(error)
            setMessage(error.message)
            return false
        }
    }
    async function validateIgum() {
        let res = await apis.validateIgum(igumId, coolerId)
        if (res.status == 204) {
            return true
        }
        setMessage("igum err")
        return false
    }
    async function addRec() {
        console.log("hola add rec")
        let data = {
            source, tubeId, coolerId, igumId
        }

        let res
        let r
        try {
            if (await validateTube(tubeId)) {
                if (await validateCooler(coolerId)) {//status 200
                    if (await validateIgum(igumId, coolerId)) {
                        // if (true) {
                        //     if (true) {

                        console.log("finish good")
                        res = await apis.addRec(data)
                        if (res.status === 200) {
                            setTotalTests(totalTests + 1)
                            clearFields()
                        } else {
                            setMessage(res.status)
                        }

                    }
                }
            }

        } catch (err) {
            setMessage(err.response.data.message)
        }
    }

    function clearFields() {
        setTubeId('')
        setMessage("")
        clearAddClientFields()
    }
    function handleChangeCooler(e) {
        setMessage("")
        setCoolerId(e.target.value)
        localStorage.setItem("coolerId", e.target.value)
    }


    function handleChangeIgum(e) {
        setMessage("")
        setIgumId(e.target.value)
        localStorage.setItem("igumId", e.target.value)
    }

    return (
        <div>


            <div className="cols">
                <input type="text" autoFocus placeholder="tubeId" maxLength="9" onChange={e => {
                    setTubeId(e.target.value)
                    setMessage("")

                }} />
                <div className="no-margin rows">
                    <input className="no-margin" ref={inputCooler} type="text" disabled={isDisabled} placeholder="coolerId" maxLength="11" onChange={handleChangeCooler} value={coolerId} />
                    <p className="no-margin">({totalTests % 60})</p>
                </div>
                <div className="no-margin rows">
                    <input className="no-margin" type="text" placeholder="igumId" disabled={isDisabledIgum} maxLength="9" onChange={handleChangeIgum} value={igumId} />
                    <p className="no-margin">({totalTests % 15})</p>
                </div>
                <button onClick={addRec}>add client</button>
                <p className="err-message">{message}</p>
            </div>


        </div>
    )
}
