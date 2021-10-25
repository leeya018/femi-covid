import './otp.css';
import apis from "../api";
import React, { useEffect, useState } from 'react'
import Client from "./Client";
import { useHistory } from "react-router-dom";
// const coordsId = "de84c671-f59f-40d2-86f5-77dadd39d46a"  //oleg

// what are kind of clients are those 
// status 1,0 - not done
// status 4,3,2 - inside system 
export default function Clients({ setTotalTests, totalTests }) {
    const [clients, setClients] = useState([])
    const [filteredClients, setFilteredClients] = useState([])
    const [activeBtn, setActiveBtn] = useState(true)
    const [doneNum, setDoneNum] = useState(0)

    const [filter, setFilter] = useState('');

    let history = useHistory();

    useEffect(async () => {
        console.log("clients useUfect")

        let res
        try {
            res = await apis.getClients(apis.coordsId)
            let clientList = res.data
            clientList = sortByDate(clientList)
            console.log(clientList)
            setClients(clientList)
            setTotalTests(getLen())

            clientList = fliterMe(clientList)
            setFilteredClients(clientList)
            setDoneNum(clientList.length)
        } catch (error) {
            console.log(error.response)
        }
    }, [])

    function fliterMe(arr) {
        return arr.filter(client => [2, 3, 4].includes(client.status));

    }

    function sortByDate(arr) {
        let data = arr.sort((a, b) => Date.parse(b.receptionEnteredTime) - Date.parse(a.receptionEnteredTime))
        return data
    }
    function getLen() {
        return clients.filter(client => [2, 3, 4].includes(client.status)).length;



    }

    function filterByStatus(statusCodes) {
        // let winList = clients.length > 0 ? clients : clientList
        let filteredList = clients.filter(client => statusCodes.includes(client.status));
        setFilteredClients(filteredList)
        setDoneNum(filteredList.length)
    }



    function handleClick(statusCodes) {
        let newActive = statusCodes.includes(2) ? true : false
        setActiveBtn(newActive)
        if (newActive !== activeBtn) {
            filterByStatus(statusCodes)
            let len = getLen()
            setTotalTests(len)
        }
    }

    return (
        <div>

            <button onClick={e => history.push("/dashboard")} autoFocus>+</button>
            <div className="rows">
                <button style={{ backgroundColor: activeBtn ? "blue" : "" }} onClick={() => handleClick([2, 3, 4])}>complete</button>
                <button style={{ backgroundColor: !activeBtn ? "blue" : "" }} onClick={() => handleClick([0, 1])}>not complete</button>
                <p>done : {doneNum}</p>
            </div>
            <div className="rows">
                <input type="text" placeholder="search" id="filter"
                    name="filter"
                    type="text"
                    value={filter}
                    onChange={event => setFilter(event.target.value)} />
            </div>
            <div className="rows">
                <div className="cols">
                    {filteredClients.filter(client => client.firstName.includes(filter) || client.lastName.includes(filter) || filter === '')
                        .map((client, key) => (
                            <Client key={key} firstName={client.firstName} lastName={client.lastName} />
                        ))}
                </div>
            </div>
        </div>
    )
}
