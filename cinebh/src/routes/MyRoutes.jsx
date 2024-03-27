import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from '../Components/Home'
import AboutUs from '../Components/AboutUs'
import Tickets from '../Components/Tickets'

const MyRoutes = () => {
    return (
      <Routes>
        <Route exact path='/' component={<Home />} />
        <Route index element={<Home />} />
        <Route path='/tickets' element={<Tickets/>} />
        <Route path='/aboutus' element={<AboutUs/>} />

      </Routes>
    )
  }
  
  export default MyRoutes