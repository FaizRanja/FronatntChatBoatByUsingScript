import React from 'react'
import { BrowserRouter as  Router,Routes,Route} from "react-router-dom"
import Chat from './Components/Chat/Chat'
import Sampledata from './Components/Chat/Sampledata'
import "./App.css"
const App = () => {
  return (
 <>
 <Router>
  <Sampledata/>
  <Routes>
    <Route path='/' element={<Chat/>} />
  </Routes>
 </Router>

 </>
  )
}

export default App


// import React, { useState, useEffect } from "react";
// import Login2 from "./Components/Chat/Login2";
// import HelloIamChat from "./Components/Chat/HelloIamChat";


// function App() {
//   const [username, setUsername] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = (name) => {
//     setUsername(name);
//     setIsLoggedIn(true);
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <HelloIamChat username={username} />
//       ) : (
//         <Login2 onLogin={handleLogin} />
//       )}
//     </div>
//   );
// }

// export default App;
