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
import Test from "./components/Test";
import apis from "./api";
import Wage from "./components/Wage";



import CreateTium from "./components/CreateTium";

function App() {

  const [idNum, setIdNum] = useState('300628583');
  const [phone, setPhone] = useState('0542226958');
  const [loggedIn, setLoggedIn] = useState(false);
  const [totalTests, setTotalTests] = useState(0)

  useEffect(async () => {
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


  const childProps = {
    idNum,
    phone,
    setIdNum,
    setPhone
  };

  return (

    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Otp  {...childProps} />}
        </Route>

        <Route path="/dashboard"
        >
          <Dashbaord totalTests={totalTests} setTotalTests={setTotalTests} />
        </Route>

        <Route path="/wage"
        >
          <Wage />
        </Route>

        <Route path="/login">
          <Login
            idNum={idNum}
            phone={phone} />
        </Route>
        <Route path="/clients">
          <Clients setTotalTests={setTotalTests} totalTests={totalTests} />
        </Route>

        {/* <Route path="/tium">
          <CreateTium />
        </Route> */}

      </Switch>
    </Router>
  );
}


export default App;

