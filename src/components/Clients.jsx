import './otp.css';
import apis from "../api";
import React, { useEffect, useState } from 'react'
import Client from "./Client";
import { useHistory } from "react-router-dom";
// const coordsId = "de84c671-f59f-40d2-86f5-77dadd39d46a"  //oleg

// what are kind of clients are those 
// status 1 - not done
// status 4 - inside system 
export default function Clients({ setTotalTests }) {
    const [clients, setClients] = useState([])
    const [filteredClients, setFilteredClients] = useState([])
    const [activeBtn, setActiveBtn] = useState(true)


    let history = useHistory();

    useEffect(async () => {
        let res, clientList
        try {
            res = await apis.getClients(apis.coordsId)
            clientList = res.data
            console.log(clientList)
            setClients(clientList)
            setTotalTests(clientList.length)
        } catch (error) {
            console.log(error.response)
        }
    }, [])

    function filterByStatus(status) {
        let list = clients.filter(client => client.status == status);
        setFilteredClients(list)
    }

    function handleClick(status) {
        setActiveBtn(!activeBtn)
        filterByStatus(status)

    }
    return (
        <div>

            <button onClick={e => history.push("/dashboard")}>+</button>
            <div className="rows">
                <button style={{ backgroundColor: activeBtn ? "blue" : "" }} onClick={() => handleClick(4)}>complete</button>
                <button style={{ backgroundColor: !activeBtn ? "blue" : "" }} onClick={() => handleClick(0)}>not complete</button>

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
