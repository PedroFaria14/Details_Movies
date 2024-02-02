//css
import './App.css'


import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'


//components 
import Navbar from './components/Navbar'

//pages
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        

       <Navbar/>
        <Outlet />
      </div>
    </>
  )
}

export default App
