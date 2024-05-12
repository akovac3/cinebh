import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './routes/home/Home'
import AboutUs from './routes/about/AboutUs'
import Tickets from './routes/tickets/Tickets'
import Layout from './components/Layout'
import CurrentlyShowing from './routes/movies/CurrentlyShowing'
import UpcomingMovies from './routes/movies/UpcomingMovies'
import MovieDetails from './routes/movies/MovieDetails'
import Reservation from './routes/reservations/Reservation'
import RequireAuth from './routes/auth/RequireAuth'
import Unauthorized from './routes/unauthorized/Unauthorized'

import { ROLES } from './utils/constants'
import PaymentDetails from './routes/reservations/PaymentDetails'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Layout /> } >
          <Route path='/' element={ <Home /> } />
          <Route path='/tickets' element={ <Tickets /> } />
          <Route path='/aboutus' element={ <AboutUs /> } />
          <Route path='/movie-details/:id' element={ <MovieDetails /> } />
          <Route path='/currently-showing' element={ <CurrentlyShowing /> } />
          <Route path='/upcoming-movies' element={ <UpcomingMovies /> } />
          <Route path='/unauthorized' element={ <Unauthorized /> } />

          <Route element={ <RequireAuth allowedRoles={ [ROLES.User] } /> }>
            <Route path='/reservation' element={ <Reservation /> } />
          </Route>

          <Route path='/payment-details' element={ <PaymentDetails /> } />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
