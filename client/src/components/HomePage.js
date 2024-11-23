import React from "react";
import {motion} from "motion/react";

const HomePage = () => {
    const handleGoogleSignIn = () => {
        // Logic for Google Sign-In (to be implemented)
        console.log("Google Sign-In clicked");
      };
    
      const handleContinueWithoutSignIn = () => {
        // Navigate to the app (canvas page) without saving user data
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

                <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center px-6 py-3 bg[#646464] hover:bg-gray-700 text-white rounded-lg shadow-md transition-all duration-300 mb-4">
                    <img
                        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                        alt="Google logo"
                        className="w-8 h-8 mr-3"
                    />
                    Sign in with Google
                </button>

                {/* Continue without signing in */}
                <p className="text-sm text-gray-400">
                    Or{" "}
                    <span
                    onClick={handleContinueWithoutSignIn}
                    className="text-white underline cursor-pointer hover:text-pink-400"
                    >
                    Continue without Signing in
                    </span>
                </p>
        </div>
        
        
    )
}

export default HomePage;
