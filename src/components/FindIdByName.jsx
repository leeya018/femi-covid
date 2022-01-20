import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from "../api"
const COORDS_ID = "154d5b2e-c0d9-4c4d-989b-c73048e1e96f"

export default function FindIdByName({updateNumId,updateIdType}) {
    const [filter, setFilter] = useState('');

    const [clientList, setclientList] = useState([]);
    const [fillteredList, setFilteredList] = useState([]);
    const [focus, setFocus] = useState(false);

    

    useEffect(async () => {
        let res = await api.getClients(COORDS_ID)
        let clients = res.data.map(function (client) {
            let { firstName, lastName, idType, idNum } = client
            return { firstName, lastName, idType, idNum }
        })

        let clientsNoDups = removeDups(clients)
        setclientList(clientsNoDups)
        setFilteredList(clientsNoDups)
        // console.log(clientsNoDups);


    }, []);

    function removeDups(arr) {
        return arr.filter((v, i, a) => a.findIndex(t => (t.idNum === v.idNum)) === i)
    }
    
    function chooseClient(client) {
        updateNumId(client.idNum)
        updateIdType(client.idType)
        setFilter(client.firstName +' '+client.lastName)
        console.log(client);
        console.log(filter);

        setFocus(false)
    }
 

    return <div>
        <input type="text"
            onFocus={()=>setFocus(true)}
            value={ filter }
            onChange={e => setFilter(e.target.value)} />
        <ul>
            {
                focus && fillteredList.filter(client => client.firstName.toLowerCase().includes(filter) || client.lastName.toLowerCase().includes(filter)).
                map((client,key)=><li 
                key={key}
                onClick={e=>chooseClient(client)}>{client.firstName + ' ' + client.lastName}</li>) 
                
                
            }
        </ul>


    </div>;
}
