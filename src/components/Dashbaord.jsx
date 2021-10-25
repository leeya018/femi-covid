
import './otp.css';
import apis from "../api";
import React, { useState,useEffect } from 'react';
import AddClient from "./AddClient";
import { useHistory } from "react-router-dom";


export default function Dashbaord({ totalTests, setTotalTests }) {
    let history = useHistory();


    useEffect(async () => {
        console.log("dash useUfect")
        let res, clientList, len
        if (localStorage.getItem("currUser")) {
    
          res = await apis.getClients(apis.coordsId)
          clientList = res.data
          console.log(clientList)
          len = clientList.filter(client => [2, 3, 4].includes(client.status)).length;
          setTotalTests(len)
        }
    
        console.log("app useEfect")
      }, [])
    
        return (
            <div className="otp-wrapper">
                <button onClick={e => history.push("/clients")}>client list</button>
                <h1>Covid app</h1>
                <AddClient totalTests={totalTests} setTotalTests={setTotalTests}></AddClient>
            </div>
        )
    };