
import './otp.css';
import apis from "../api";
import React, { useState } from 'react';
import AddClient from "./AddClient";
import { useHistory } from "react-router-dom";


export default function Dashbaord({ totalTests,setTotalTests }) {
    let history = useHistory();

    return (
        <div className="otp-wrapper">
            <button onClick={e => history.push("/clients")}>client list</button>
            <h1>Covid app</h1>
            <AddClient totalTests={totalTests} setTotalTests={setTotalTests}></AddClient>
        </div>
    )
};