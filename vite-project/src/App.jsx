import React from 'react'
import { BrowserRouter as  Router,Routes,Route} from "react-router-dom"
import Chat from './Components/Chat/Chat'
const App = () => {
  return (
 <>
 <Router>
  <Routes>
    <Route path='/' element={<Chat/>} />
  </Routes>
 </Router>

 </>
  )
}

export default App
