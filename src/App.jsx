import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    < >

      <Navbar></Navbar>
      <div className=' w-full h-full absolute flex  justify-center items-center bg-orange-200   p-10 '>
        <div className=' '>
          <Outlet ></Outlet>
        </div>
      </div>

    </>
  )
}

export default App
