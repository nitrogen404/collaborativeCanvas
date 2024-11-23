import { useState } from "react";
import React from "react";
import axios from "axios";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/login", {username, password});
            window.location.href = "/canvas";
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password" placeholder="your password. Dont say it loud" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
};

export default LoginPage;