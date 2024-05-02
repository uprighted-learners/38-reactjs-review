import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://three2-mongodb-review.onrender.com/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            setUsername('')
            setPassword('')
            alert('User created successfully!')
            navigate('/login')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <h2>Register New User</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    )
}
