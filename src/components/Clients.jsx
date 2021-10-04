import './otp.css';
import apis from "../api";
import React, { useEffect, useState } from 'react'
import Client from "./Client";
import { useHistory } from "react-router-dom";

// what are kind of clients are those 
// status 1 - not done
// status 4 - inside system 
export default function Clients({setTotalTests}) {
    const coordsId = "bd8a3d31-dbd8-4685-9d6a-a9780f49b3d6"
    const [clients, setClients] = useState([])
    let history = useHistory();

    useEffect(async () => {
        let res, clientList
        try {
            res = await apis.getClients(coordsId)
            clientList = res.data
            console.log(clientList)
            setClients(clientList)
            setTotalTests(clientList.length)
        } catch (error) {
            console.log(error.response)
        }
    }, [])
    return (
        <div>

            <button onClick={e => history.push("/dashboard")}>+</button>
            <div className="rows">
                <div className="cols">
                    {clients.map((client, key) => (
                        <Client key={key} firstName={client.firstName} lastName={client.lastName} />
                    ))}
                </div>
            </div>
        </div>
    )
}
