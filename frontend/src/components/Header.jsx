import React from 'react'
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
// import {variables} from '../styles/variables.scss'
// import { $pinkred, $blue, $lightgrey, $grey, $darkgrey, shadow, buttonStyle } from '/src/styles';

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Header.scss";
import { Link, useNavigate } from "react-router-dom";
// import { setLogout } from "../redux/state";
import { setLogout } from '../features/authSlice';

function Header() {


    const [dropdownMenu, setDropdownMenu] = useState(false);

    const user = useSelector((state) => state.user);
  
    const dispatch = useDispatch();
  
    const [search, setSearch] = useState("")
  
    const navigate = useNavigate()

  return (
    <header className="navbar">
    <Link to="/">
      <img src="/assets/logo.png" alt="logo" />
    </Link>

    <div className="navbar_search">
      <input
        type="text"
        placeholder="Search ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton disabled={search === ""}>
        <Search
          sx={{ color: '#F8395A' }}
          onClick={() => {navigate(`/properties/search/${search}`)}}
        />
      </IconButton>
    </div>

    <div className="navbar_right">
      {user ? (
        <Link to="/create-listing" className="host">
          Become A Host
        </Link>
      ) : (
        <Link to="/login" className="host">
          Become A Host
        </Link>
      )}

      <button
        className="navbar_right_account"
        onClick={() => setDropdownMenu(!dropdownMenu)}
      >
        <Menu sx={{ color: '#969393' }} />
        {!user ? (
          <Person sx={{ color: "#969393" }} />
        ) : (
          <img
            src={`http://localhost:5000/${user.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="profile photo"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        )}
      </button>

      {dropdownMenu && !user && (
        <div className="navbar_right_accountmenu">
          <Link to="/login">Log In</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      )}

      {dropdownMenu && user && (
        <div className="navbar_right_accountmenu">
          <Link to={`/${user._id}/trips`}>Trip List</Link>
          <Link to={`/${user._id}/wishList`}>Wish List</Link>
          <Link to={`/${user._id}/properties`}>Property List</Link>
          <Link to={`/${user._id}/reservations`}>Reservation List</Link>
          <Link to="/create-listing">Become A Host</Link>

          <Link
            to="/login"
            onClick={() => {
              dispatch(setLogout());
            }}
          >
            Log Out
          </Link>
        </div>
      )}
    </div>
  </header>
  )
}

export default Header