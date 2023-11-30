import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import SignIn from './components/auth/signin.jsx'
import SignUp from './components/auth/signup.jsx'
import LoginSucceed from './components/auth/loginSucceed.jsx';
import UserProfile from './components/pages/userProfile.jsx'
import FileUploadForm from './components/includes/fileUploadForm.jsx';
import MyProfile from './components/pages/myProfile.jsx';
import PageNotFound from './components/includes/pageNotFound.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/*" element={<PageNotFound/>} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login_succeed" element={<LoginSucceed />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/user/:userId" element={
      <UserProfile>
        
      </UserProfile>} />
      
      <Route path="/fileuploadform" element={<FileUploadForm />} />

    </Routes>
  </Router>
)
