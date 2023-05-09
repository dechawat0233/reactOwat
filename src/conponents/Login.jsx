import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook for programmatic navigation

    const handleLogin = async () => {
        try {
            // Perform login logic here

            // Redirect to appropriate route after successful login
            if (isAdmin) {
                navigate('/admin'); // Redirect to /admin route for admin user
            } else {
                navigate('/user'); // Redirect to /user route for regular user
            }

        } catch (error) {
            // Handle login error
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;