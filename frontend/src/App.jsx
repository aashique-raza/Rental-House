
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'
import Header from './components/Header'
import CreateListingPage from './pages/CreateListingPage'
import ListingDetails from './pages/ListingDetails'
import TripList from './pages/TripList'
import WishList from './pages/WishList'
import Properties from './pages/Properties'
import Reservation from './pages/Reservation'
import Category from './pages/Category'
import Search from './pages/Search'

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
        <Route path="/:userId/wishList" element={<WishList />} />
        <Route path="/:userId/properties" element={<Properties />} />
        <Route path="/:userId/reservations" element={<Reservation />} />
        <Route path="/properties/category/:category" element={<Category />} />
        <Route path="/properties/search/:search" element={<Search />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
