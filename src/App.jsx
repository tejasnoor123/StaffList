import { Routes, Route } from 'react-router-dom'
import HomePage from './route/HomePage'
import AboutPage from './route/AboutPage'
import Navigation from './route/Navigation'
import ConnectPage from './ConnectPage'
import NavFooter from './NavFooter'
import LoginPage from "./route/LoginPage";
import SignUp from "./route/SignUp";
import MyProfile from "./route/myprofile";

import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<NavFooter />} >
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/profile" element={<MyProfile />} />
      </Route>



    </Routes>

  )

}

export default App
