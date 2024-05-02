import React from 'react'
import { Link } from 'react-router-dom'

import './Navigation.css'

export default function Navigation() {
    const token = localStorage.getItem('token') // check if the user is logged in

    const handleLogout = () => {
        localStorage.removeItem('token') // remove the token from localStorage
        window.location.href = "/" // redirect to the home page
    }

    return (
        <nav>
            <ul className='nav-list'>
                <li className='nav-item'><Link to="/">Home</Link></li>
                <li className='nav-item'><Link to="/about">About</Link></li>

                {token ? (
                    <>
                        <li className='nav-item'><Link to="/admin">Admin</Link></li>
                        <li className='nav-item'><button className='logout-button' onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li className='nav-item'><Link to="/register">Register</Link></li>

                        <li className='nav-item'><Link to="/login">Login</Link></li>
                    </>
                )}
            </ul>
        </nav>
    )
}
