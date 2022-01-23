import React from 'react';
import { useState,useEffect,useRef } from 'react';
import api from "../api"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const COORDS_ID = "e3500dd7-b293-4b1c-8aa6-1a6bdf4159a7"


export default function FindIdByName({updateNumId,updateIdType,updateIdIputFocus}) {
    
    const [filter, setFilter] = useState('');

    const [clientList, setclientList] = useState([]);
    const [fillteredList, setFilteredList] = useState([]);
    const [focus, setFocus] = useState(false);

    

    useEffect(async () => {
        let res = await api.getClients(COORDS_ID)
        let clients = res.data.map(function (client) {
            let { firstName, lastName, idType, idNum } = client
            return { firstName, lastName, idType, idNum ,label:firstName  + ' ' + lastName}
        })

        let clientsNoDups = removeDups(clients)
        setclientList(clientsNoDups)
        setFilteredList(clientsNoDups)
        console.log(clientsNoDups);


    }, []);


    function removeDups(arr) {
        return arr.filter((v, i, a) => a.findIndex(t => (t.idNum === v.idNum)) === i)
    }
    
    function chooseClient(client) {
        if(client){
            updateNumId(client.idNum)
            updateIdType(client.idType)
            setFilter(client.firstName +' '+client.lastName)
            console.log(client);
            console.log(filter);
            
            setFocus(false)
        }
    }
 
 

    return <div>
           <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={fillteredList}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField  autoFocus  {...params} label="client" />}
      onFocus={()=>updateIdIputFocus(false)}
      onChange={(event, client) => {
        chooseClient(client)
        updateIdIputFocus(true)

      }}
        
    />

    </div>;
}
