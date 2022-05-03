import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Otp from "./components/Otp";
import Login from "./components/Login";
import Dashbaord from "./components/Dashbaord";
import Clients from "./components/Clients";
import MonthlySalary from "./components/MonthlySalary";
import api from "./api";
import Wage from "./components/Wage";
import Xlsx from "./components/Xlsx";
import CoodlersPickup from "./components/CoodlersPickup";


function App() {

  const [idNum, setIdNum] = useState('300628583');
  const [phone, setPhone] = useState('0542226958');
  const [loggedIn, setLoggedIn] = useState(false);
  const [totalTests, setTotalTests] = useState(0)
  const [instName, setInstName] = useState('')
  const [allClienstFromInstitution, setAllClienstFromInstitution] = useState([])
  const [isXlsz, setIsXlsz] = useState(false);


  useEffect(async () => {
    let res, clientList, len
    if (localStorage.getItem("currUser")) {

      res = await api.getClients(api.coordsId)
      clientList = res.data
      console.log(clientList)
      len = clientList.filter(client => [2, 3, 4].includes(client.pcrStatus)).length;
      setTotalTests(len)
      if (!isXlsz) {
        getAllClientFromTium() // all tiums
      } // else its gonna take from excel
      // getAllClientsFromOneTium()  // one tiums 
    }
    console.log("app useEfect")
  }, [])


  async function getAllClientFromTium() {
    let institutionName = (await api.getCoordination(api.coordsId)).data.institute.name
    setInstName(institutionName)
    let res = await api.getAllReceptions()
    let receptions = res.data

    let recetionWithSameName = receptions.filter(rec => rec.institute.name === institutionName)
    let receptionIds = recetionWithSameName.map(rec => rec.id)
    console.log(receptionIds);
    let arrOfAllClientsFromInst = []

    receptionIds.map(async function (coordId) {

      let clientsFull = (await api.getClients(coordId)).data
      let clients = clientsFull.map(function (client) {
        let { firstName, lastName, idType, idNum } = client
        return { firstName, lastName, idType, idNum, label: firstName + ' ' + lastName }
      })

      arrOfAllClientsFromInst = arrOfAllClientsFromInst.concat(clients).filter(function (c) {
        return this[c.idNum] ? false : this[c.idNum] = true;
      }, {});

      setAllClienstFromInstitution(arrOfAllClientsFromInst)
    })
    console.log("I am out");
  }


  async function getAllClientsFromOneTium() {
    let SIUDIT_GAN_BAIR_COORDS = "0c78605c-2908-4b74-9ae9-e7050824595e"

    let institutionName = (await api.getCoordination(api.coordsId)).data.institute.name
    setInstName(institutionName)

    let clientsFull = (await api.getClients(SIUDIT_GAN_BAIR_COORDS)).data
    let clients = clientsFull.map(function (client) {
      let { firstName, lastName, idType, idNum } = client
      return { firstName, lastName, idType, idNum, label: firstName + ' ' + lastName }
    })


    setAllClienstFromInstitution(clients)
  }

  // 0c78605c-2908-4b74-9ae9-e7050824595e  -  גן בעיר סיעודית

  const childProps = {
    idNum,
    phone,
    setIdNum,
    setPhone
  };

  return (
    <div>
      <Xlsx updateAllClienstFromInstitution={setAllClienstFromInstitution} updateIsXlsz={setIsXlsz}></Xlsx>

      <Router>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard" /> : <Otp  {...childProps} />}
          </Route>

          <Route path="/dashboard"
          >
            <Dashbaord instName={instName} allClienstFromInstitution={allClienstFromInstitution} totalTests={totalTests} setTotalTests={setTotalTests} />
          </Route>

          <Route path="/wage"
          >
            <Wage />
          </Route>

          <Route path="/coodlersPickup"
          >
            <CoodlersPickup />
          </Route>


          <Route path="/login">
            <Login
              idNum={idNum}
              phone={phone} />
          </Route>
          <Route path="/clients">
            <Clients setTotalTests={setTotalTests} totalTests={totalTests} allClienstFromInstitution={allClienstFromInstitution} />
          </Route>

          <Route path="/monthlySalary">
            <MonthlySalary />
          </Route>



          {/* <Route path="/tium">
          <CreateTium />
        </Route> */}

        </Switch>
      </Router>


    </div>
  );
}


export default App;

