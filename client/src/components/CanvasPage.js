import React, {useEffect, useRef} from "react";
import {Stage, Layer, Text} from "react-konva";
import io from "socket.io-client";

const CanvasPage = () => {
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;
    
    return (

            // <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            //     <h1 className="text-2xl font-bold mb-4">Scribble here</h1>
            // </div>
        
            <Stage width={width} height={height} style={{ border: '2px solid #ccc' }}>
                <Layer >
                    <Text
                        text="Here is the canvas"
                        x={10} // Position on the canvas
                        y={10}
                        fontSize={24}
                        fill="black" // Text color
                    />
                </Layer>
            </Stage>

        
        
    )
}

export default CanvasPage;

