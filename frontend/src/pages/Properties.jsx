import React from 'react'
import "../styles/Trip.scss";
import { useDispatch, useSelector } from "react-redux";

import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from '../features/authSlice';
import Loader from "../components/Loader";
// import Footer from "../components/Footer"

function Properties() {

    const [loading, setLoading] = useState(true)
    const user = useSelector((state) => state.user)
    const propertyList = user?.propertyList;
    // console.log(user)

    const dispatch = useDispatch()
    const getPropertyList = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/user/${user._id}/properties`, {
            method: "GET"
          })
          const data = await response.json()
          console.log(data)
          dispatch(setPropertyList(data))
          setLoading(false)
        } catch (err) {
          console.log("Fetch all properties failed", err.message)
        }
      }
  
    useEffect(() => {
      getPropertyList()
    }, [])


    if(loading){
        return <Loader/>
    }
  

  return (
    <>
     <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>

      
    </>
  )
}

export default Properties