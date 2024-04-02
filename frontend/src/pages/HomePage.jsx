import React from 'react'
import Slide from '../components/Slide'
import Categories from '../components/Catgories'
// import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";

function HomePage() {
  return (
    <div>
      <Slide/>
      
      <Categories/>
    </div>
  )
}

export default HomePage