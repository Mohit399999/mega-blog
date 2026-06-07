import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function Header() {
  const userData = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout())
      navigate('/')
    })
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50'
        : 'bg-white/60 backdrop-blur-md'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-gray-900 tracking-tight hover:opacity-70 transition-opacity">
          MegaBlog
        </Link>
        <nav>
          <ul className="flex items-center gap-1">
            <li>
              <Link to="/" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all">
                Home
              </Link>
            </li>
            {userData ? (
              <>
                <li>
                  <Link to="/all-posts" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all">
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link to="/add-post" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all">
                    Write
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="ml-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-all"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="ml-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-all">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
