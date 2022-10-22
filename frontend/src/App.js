
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddUser from './components/AddUser'
import Connexion from './components/Connexion'
import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/users/home" element={<Home />} />
        <Route path="/users/register" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
