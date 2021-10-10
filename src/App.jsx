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

import CreateTium from "./components/CreateTium";

function App() {

  const [idNum, setIdNum] = useState('300628583');
  const [phone, setPhone] = useState('0542226958');
  const [loggedIn, setLoggedIn] = useState(false);
  const [totalTests, setTotalTests] = useState(0)

  useEffect(async () => {
    let res = await apis.getClients(apis.coordsId)
    let clientList = res.data
    console.log(clientList)
    let len = clientList.filter(client => [2, 4].includes(client.status)).length;
    setTotalTests(len)
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
          <Dashbaord totalTests={totalTests} />
        </Route>

        <Route path="/test">
          <Test />
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


// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
// import GroupDetails from "./components/TeamDetails";
// import Table from "./components/TeamTable";
// import apis from "./api";

// function App() {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     apis
//       .getTeams()
//       .then((res) => {
//         let teamArr = res.data.teams;
//         setList(teamArr.slice(0, 10));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/">
//           <Redirect to="/teams" />
//         </Route>
//         <Route exact path="/teams">
//           <Table list={list} />
//         </Route>
//         <Route path="/teams/:id">
//           <GroupDetails />
//         </Route>
//       </Switch>
//     </Router>
//   );
// }

// export default App;

