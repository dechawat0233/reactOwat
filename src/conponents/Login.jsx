import axios from 'axios';
import { useState } from 'react';

function LoginForm({ onLogin }) {
    function handleSubmit(event) {
        event.preventDefault();
        // Get the values of the username and password fields
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        // Call the onLogin function with the username and password
        onLogin(username, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Log In</button>
        </form>
    );
}

export default LoginForm;
