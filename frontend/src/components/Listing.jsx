import React, { useState,useEffect } from 'react'
import "../styles/Listing.scss"
import { BiWorld } from "react-icons/bi";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiCaveEntrance, GiForestCamp, GiCactus, GiBarn } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
// import { World } from '@mui/icons-material';
import PublicIcon from '@mui/icons-material/Public';
import ListingCard from './ListingCard';
import Loader from './Loader'
import {useDispatch,useSelector} from 'react-redux'
import {setListings} from '../features/authSlice'


function Listing() {
    const dispatch=useDispatch()
    const[loading,setLoading]=useState(true)

     const cat = [
        {
          label: "All",
          i: <PublicIcon/>
        },
        {
          img: "assets/beach_cat.jpg",
          label: "Beachfront",
          icon: <TbBeach />,
          description: "This property is close to the beach!",
        },
        {
          img: "assets/windmill_cat.webp",
          label: "Windmills",
          icon: <GiWindmill />,
          description: "This property is has windmills!",
        },
        {
          img: "assets/modern_cat.webp",
          label: "Iconic cities",
          icon: <MdOutlineVilla />,
          description: "This property is modern!",
        },
        {
          img: "assets/countryside_cat.webp",
          label: "Countryside",
          icon: <TbMountain />,
          description: "This property is in the countryside!",
        },
        {
          img: "assets/pool_cat.jpg",
          label: "Amazing Pools",
          icon: <TbPool />,
          description: "This is property has a beautiful pool!",
        },
        {
          img: "assets/island_cat.webp",
          label: "Islands",
          icon: <GiIsland />,
          description: "This property is on an island!",
        },
        {
          img: "assets/lake_cat.webp",
          label: "Lakefront",
          icon: <GiBoatFishing />,
          description: "This property is near a lake!",
        },
        {
          img: "assets/skiing_cat.jpg",
          label: "Ski-in/out",
          icon: <FaSkiing />,
          description: "This property has skiing activies!",
        },
        {
          img: "assets/castle_cat.webp",
          label: "Castles",
          icon: <GiCastle />,
          description: "This property is an ancient castle!",
        },
        {
          img: "assets/cave_cat.jpg",
          label: "Caves",
          icon: <GiCaveEntrance />,
          description: "This property is in a spooky cave!",
        },
        {
          img: "assets/camping_cat.jpg",
          label: "Camping",
          icon: <GiForestCamp />,
          description: "This property offers camping activities!",
        },
        {
          img: "assets/arctic_cat.webp",
          label: "Arctic",
          icon: <BsSnow />,
          description: "This property is in arctic environment!",
        },
        {
          img: "assets/desert_cat.webp",
          label: "Desert",
          icon: <GiCactus />,
          description: "This property is in the desert!",
        },
        {
          img: "assets/barn_cat.jpg",
          label: "Barns",
          icon: <GiBarn />,
          description: "This property is in a barn!",
        },
        {
          img: "assets/lux_cat.jpg",
          label: "Luxury",
          icon: <IoDiamond />,
          description: "This property is brand new and luxurious!",
        },
      ];

      const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:5000/api/listing/getlistings?category=${selectedCategory}`
          : "http://localhost:5000/api/listing/getlistings",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

//   console.log(listings)

  return (
    <>
    <div className="category-list">
        {cat?.map((category, index) => (
          <div
            className='category'
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
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
              booking=false
            }) => (
              <ListingCard
              key={_id}
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
      )}
    </>
  )
}

export default Listing