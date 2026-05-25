import './App.css'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth.js'
import { useDispatch } from "react-redux"
import { login, logout } from "./store/authSlice.js"
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components/index.js'




function App() {
  const [loading, setLoading] = useState(true)
  const dispach = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispach(login({ userData }))
      } else {
        dispach(logout())
      }})
      .finally(() => {
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return !loading ?(
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className='w-full block'>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </div>

  ):null
}

export default App
