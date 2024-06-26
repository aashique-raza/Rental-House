import React from 'react'
import "../styles/Trip.scss";
import { useSelector } from "react-redux";

import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"


function WishList() {
    const wishList = useSelector((state) => state.user.wishList);


  return (
    <>
   
    <h1 className="title-list">Your Wish List</h1>
    <div className="list">
      {wishList?.map(
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

export default WishList
