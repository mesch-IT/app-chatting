import React from 'react'
import './App.css'
// import {BrowserRouter, Routes,Route} from 'react-router-dom'

//  import AddUser from './components/AddUser'
// import ConnexionPage from './components/ConnexionPage'
import Home from './components/Home'

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/users/login" element={<ConnexionPage/>} />
    //     <Route path="/users/home" element={<Home/>} />
    //     <Route path="/users/register" element={<AddUser/>} />
    //   </Routes>
    // </BrowserRouter>
    <Home />
  )
}

export default App