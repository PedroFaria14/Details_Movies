import React from 'react'

import { Link,useNavigate } from 'react-router-dom'
import { BiCameraMovie } from "react-icons/bi";
import { TiZoomOutline } from "react-icons/ti";
import { useState } from 'react';


import './Navbar.css'
const Navbar = () => {
  const [search,setSearch] = useState("");
  
  const Navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(!search) return

    Navigate(`/search?q=${search}`)
    setSearch("")
  }

  return (
    <nav id='navbar'>
    <h2>
    <Link to="/">  <BiCameraMovie /> Details Movies</Link>
    </h2>
    <form onSubmit={handleSubmit } >
    <input type="text" 
     placeholder='Busque um filme' 
     onChange={(e) => setSearch(e.target.value)}
     value={search}/>
    
    
    <button type='submit'> <TiZoomOutline /></button>
    </form>

    </nav>
  )
}

export default Navbar
