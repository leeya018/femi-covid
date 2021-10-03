
import './otp.css';
import apis from "../api";
import React, { useState } from 'react';
import AddClient from "./AddClient";


export default function Dashbaord() {

    return (
        <div className="otp-wrapper">
            <h1>Covid app</h1>
            <AddClient></AddClient>
        </div>
    )
};