import './App.css'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth.js'
import { useDispatch } from "react-redux"
import { login, logout } from "./store/authSlice.js"
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components/index.js'

function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData))
                } else {
                    dispatch(logout())
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return !loading ? (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <Header />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    ) : (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    width: '32px', height: '32px', border: '2px solid #e0e0e0',
                    borderTop: '2px solid #1d1d1f', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
                }} />
                <p style={{ color: '#6e6e73', fontSize: '14px' }}>Loading...</p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

export default App
