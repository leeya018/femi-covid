import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GroupDetails from "./components/TeamDetails";
import Table from "./components/TeamTable";
import apis from "./api";

function App() {
  // const [list, setList] = useState([]);
  // : ["The value '49cfc59-5312-48c6-90ee-f422e692230f' is not valid.
  useEffect(() => {
  console.log("111")    
      apis
        .validateTube()
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <div>
      <h1>einrstidnsteitsnei</h1>
    </div>
    // <Router>
    //   <Switch>
    //     <Route exact path="/">
    //       <Redirect to="/teams" />
    //     </Route>
    //     <Route exact path="/teams">
    //       <Table list={list} />  
    //     </Route>
    //     <Route path="/teams/:id">
    //       <GroupDetails />
    //     </Route>
    //   </Switch>
    // </Router>
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

