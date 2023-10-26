import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import SignIn from './components/auth/signin.jsx'
import SignUp from './components/auth/signup.jsx'
import LoginSucceed from './components/auth/login_succeed.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login_succeed" element={<LoginSucceed />} />
    </Routes>
  </Router>
)
