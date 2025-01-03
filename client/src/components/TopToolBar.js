import React from "react";

const TopToolBar = ({roomName}) => {
    return (
        <div className="flex items-center justify-between w-full bg-#111111 text-white px-4 py-2 relative">
            <span className="font-extralight">{roomName}</span>
            <h1 className="absolute inset-0 flex items-center justify-center font-thin font-custom text-lg">Canvas</h1>
        </div>
    )
}

export default TopToolBar;