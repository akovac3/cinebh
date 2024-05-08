import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './routes/home/Home'
import AboutUs from './routes/about/AboutUs'
import Tickets from './routes/tickets/Tickets'
import Layout from './components/Layout'
import CurrentlyShowing from './routes/movies/CurrentlyShowing'
import UpcomingMovies from './routes/movies/UpcomingMovies'
import MovieDetails from './routes/movies/MovieDetails'
import Reservation from './routes/reservations/Reservation'

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
          <Route path='/reservation' element={ <Reservation /> } />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
