
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'
import Header from './components/Header'
import CreateListingPage from './pages/CreateListingPage'
import ListingDetails from './pages/ListingDetails'
import TripList from './pages/TripList'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/'element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/create-listing' element={<CreateListingPage/>}/>
        <Route path='/properties/:listingId' element={<ListingDetails/>}/>
        <Route path='/:userId/trips' element={<TripList/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
