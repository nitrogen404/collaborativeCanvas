import React, {useState} from "react";
import {motion} from "motion/react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [isAuthenticating, setisAuthenticating] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = async(response) => {
        const token = response.credential;
        try {
            const res = await fetch("http://localhost:8080/google-login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                }, 
                body: JSON.stringify({token})
            });

            const data = await res.json();
            if (res.ok) {
                console.log("user authenticated ", data);
                localStorage.setItem("sessionToken", data.sessionToken);
                setisAuthenticating(false);
                navigate("/canvas")
            } else {
                console.log("authentication failed" ,data.message);
                setisAuthenticating(false);

            }
        } catch (error) {
            console.error("error during authentication ", error);
            setisAuthenticating(false);
            
        }
    }

    const handleGoogleError = () => {
        console.error("Google sign in error");
    }

    const handleContinueWithoutSignIn = () => {
        console.log("Continue without signing in");
    };
    
    const letterAnimation = {
    initial: {y: 50, opacity: 0}, 
    animate: {y: 0, opacity: 1}
    }

    return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#111111] text-white text-center">
                <div className="flex">
                    {["S", "c", "r", "i", "b", "b", "l", "e"].map((letter, index) => (
                            <motion.span
                                key={index}
                                className="font-custom text-[160px] font-bold text-[#E8BCBF]"
                                variants={letterAnimation}
                                initial="initial"
                                animate="animate"
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 3,
                                    delay: index * 0.1,
                                }}>
                                    {letter}
                            </motion.span>
                        ))}
                </div>
                <p className="font-custom text-2xl">
                    <span className="font-custom bg-gradient-to-l from-[#E8BCBF] via-[#E94355] bg-clip-text text-transparent">Collaborate</span> and Create Freely
                </p>

                {isAuthenticating && <p>Loading...</p>}
                <GoogleLogin 
                    onSuccess={handleGoogleSignIn} 
                    onError={handleGoogleError} 
                    render={
                        (renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="flex items-center justify-center px-6 py-3 bg-[#1a1a1a] hover:bg-[#333333] text-white rounded-lg shadow-lg transition-all duration-300 mb-4 relative"
                                style={{
                                boxShadow: "0px 0px 15px 3px rgba(0, 132, 255, 0.5)", // Add glow effect
                            }}>
                                <img
                                    src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                                    alt="Google logo"
                                    className="w-8 h-8 mr-3"
                                />
                                Sign in with Google
                            </button>
                        )
                    }
                />
        </div>
    )
}

export default HomePage;
