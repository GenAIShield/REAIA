import React from 'react'

import {Routes,Route} from "react-router-dom"
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SolutionPage from './pages/SolutionPage'
import 'react-toastify/dist/ReactToastify.css'
import UpComingPage from './pages/UpComingPage'
import UserProfilePage from './pages/UserProfilePage'
import CommunityPage from './pages/CommunityPage'
import UserContributionsPage from './pages/UserContributionsPage'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/home' element={<LandingPage />} />
            <Route path='/' element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/solution' element={<SolutionPage />} />
            <Route path='/upcoming' element={<UpComingPage />} />
            <Route path='/profile' element={<UserProfilePage />} />
            <Route path='/community' element={<CommunityPage />} />
            <Route path='/contributions' element={<UserContributionsPage />} />
        </Routes>
    </div>
  )
}

export default App