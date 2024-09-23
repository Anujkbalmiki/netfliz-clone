import React from 'react'
import logo from '../../logo.webp';
import { Link } from "react-router-dom";
import { ImSearch } from 'react-icons/im';


const Header = () => {
  return (
   <nav className="header">
      <img src={logo} alt="logo" />
      <div>
         <Link to="/tvShows">TV Shows</Link>
         <Link to="/movies">Movies</Link>
         <Link to="/recentlyAdded">Recently Added</Link>
         <Link to="/myList">My List</Link>
      </div>
      <ImSearch/>
   </nav>
  )
}

export default Header
