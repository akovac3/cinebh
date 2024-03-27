import Nav from "./Components/Nav"
import Home from "./Components/Home"
import Footer from "./Components/Footer"
import { BrowserRouter as Router } from 'react-router-dom'
import MyRoutes from './routes/MyRoutes.jsx'


function App() {
  return (
    <>
    <Router>
      <Nav />
      <MyRoutes />
      <Footer />
      </Router>

    </>
    
  )
}

export default App
