import React, {useState} from 'react';
import axios from 'axios';

const SignUpPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/signup', {username, password});
            console.log(response.data.message);
        } catch (error) {
            console.error("Signup error ", error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h1>SignUp</h1>
            <input type="text" placeholder='username' value={username} onChange={(e) => setUserName(e.target.value)}/>
            <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Signup</button>
            
        </form>
    );
};

export default SignUpPage;
