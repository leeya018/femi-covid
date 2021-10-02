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


import apis from "./api";

function App() {

  const [idNum, setIdNum] = useState('300628583');
  const [phone, setPhone] = useState('0542226958');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    setLoggedIn(token ? true : false)
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
          <Dashbaord />
        </Route>
        <Route path="/login">
          <Login
            idNum={idNum}
            phone={phone} />
        </Route>
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

