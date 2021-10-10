import './otp.css';
import apis from "../api";
import React, { useEffect, useState } from 'react'
import Client from "./Client";
import { useHistory } from "react-router-dom";
// const coordsId = "de84c671-f59f-40d2-86f5-77dadd39d46a"  //oleg

// what are kind of clients are those 
// status 1,0 - not done
// status 4,2 - inside system 
export default function Clients({ setTotalTests, totalTests }) {
    const [clients, setClients] = useState([])
    const [filteredClients, setFilteredClients] = useState([])
    const [activeBtn, setActiveBtn] = useState(true)
    const [doneNum, setDoneNum] = useState(0)


    let clientList = []
    let history = useHistory();

    useEffect(async () => {
        let res
        try {
            res = await apis.getClients(apis.coordsId)
            clientList = res.data
            console.log(clientList)
            setClients(clientList)
            setTotalTests(getLen())
            filterByStatus([2, 4], clientList)
        } catch (error) {
            console.log(error.response)
        }
    }, [])

    function getLen() {
        return clientList.filter(client => [2, 4].includes(client.status)).length;
    }

    function filterByStatus(statusCodes) {
        updateLocalStorage()
        let winList = clients.length > 0 ? clients : clientList
        let list = winList.filter(client => statusCodes.includes(client.status));
        setFilteredClients(list)
        setDoneNum(list.length)
    }

    function updateLocalStorage() {
        if (totalTests % 15 == 0) {
            localStorage.setItem('igumId', '')
        }
        if (totalTests % 60 == 0) {
            localStorage.setItem('coolerId', '')
        }
    }

    function handleClick(statusCodes) {

        setActiveBtn(statusCodes.includes(2) ? true : false)
        filterByStatus(statusCodes)
        setTotalTests(getLen())


    }
    return (
        <div>

            <button onClick={e => history.push("/dashboard")}>+</button>
            <div className="rows">
                <button style={{ backgroundColor: activeBtn ? "blue" : "" }} onClick={() => handleClick([2, 4])}>complete</button>
                <button style={{ backgroundColor: !activeBtn ? "blue" : "" }} onClick={() => handleClick([0, 1])}>not complete</button>
                <p>done : {doneNum}</p>

            </div>
            <div className="rows">
                <div className="cols">
                    {filteredClients.map((client, key) => (
                        <Client key={key} firstName={client.firstName} lastName={client.lastName} />
                    ))}
                </div>
            </div>
        </div>
    )
}
