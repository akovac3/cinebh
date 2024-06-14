import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import Home from './routes/home/Home';
import AboutUs from './routes/about/AboutUs';
import Tickets from './routes/tickets/Tickets';
import Layout from './components/Layout';
import CurrentlyShowing from './routes/movies/CurrentlyShowing';
import UpcomingMovies from './routes/movies/UpcomingMovies';
import MovieDetails from './routes/movies/MovieDetails';
import Reservation from './routes/reservations/Reservation';
import RequireAuth from './routes/auth/RequireAuth';
import Unauthorized from './routes/unauthorized/Unauthorized';
import PaymentDetails from './routes/reservations/PaymentDetails';
import AdminPanel from './routes/admin/AdminPanel';
import Movies from './routes/admin/movies/Movies';
import Drafts from './routes/admin/movies/Drafts';
import Currently from './routes/admin/movies/Currently';
import AddMovie from './routes/admin/movies/AddMovie';
import Upcoming from './routes/admin/movies/Upcoming';
import Archived from './routes/admin/movies/Archived';

import { ROLES } from './utils/constants';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route path='/' element={ <Home /> } />
          <Route path='/tickets' element={ <Tickets /> } />
          <Route path='/aboutus' element={ <AboutUs /> } />
          <Route path='/movie-details/:id' element={ <MovieDetails /> } />
          <Route path='/currently-showing' element={ <CurrentlyShowing /> } />
          <Route path='/upcoming-movies' element={ <UpcomingMovies /> } />
          <Route path='/unauthorized' element={ <Unauthorized /> } />

          <Route element={ <RequireAuth allowedRoles={ [ROLES.User] } /> }>
            <Route path='/reservation' element={ <Reservation /> } />
            <Route path='/payment-details' element={ <PaymentDetails /> } />
          </Route>

          <Route element={ <RequireAuth allowedRoles={ [ROLES.Admin] } /> }>
            <Route path='/admin-panel' element={ <AdminPanel /> }>
              <Route path='movies' element={ <Movies /> }>
                <Route index element={ <Navigate to="drafts" /> } />
                <Route path='drafts' element={ <Drafts /> } />
                <Route path='currently' element={ <Currently /> } />
                <Route path='upcoming' element={ <Upcoming /> } />
                <Route path='archived' element={ <Archived /> } />
              </Route>
              <Route path='add-movie' element={ <AddMovie /> } />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
