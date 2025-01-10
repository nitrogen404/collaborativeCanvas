import React, { useEffect, useRef, useState } from "react";
import CanvasArea from "./CanvasArea";
import TopToolBar from "./TopToolBar";
import ToolSelection from "./ToolSelection";
import BottomToolBar from "./BottomToolBar";
import io from "socket.io-client";

const CanvasPage = () => {
    const socketRef = useRef(null);
    const [lines, setLines] = useState([]);
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#FFFFFF');
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraserSize, setEraserSize] = useState(10);

    useEffect(() => {
        socketRef.current = io('http://localhost:8080');
        socketRef.current.emit('joinRoom', 'room1');
        socketRef.current.on('draw', (data) => {
        setLines((prevLines) => [...prevLines, data]);
        });
        
        return () => {
        socketRef.current.disconnect();
        };
    }, []);

    const clearCanvas = () => {
        setLines([]);
        socketRef.current.emit('clearCanvas', 'room1');
    }

    return (
        <div className="relative flex flex-col h-screen bg-stone-900 text-white">
            <TopToolBar roomName={'room1'}/>
            <div className="relative flex-1">
                <CanvasArea lines={lines} setLines={setLines} tool={tool} color={color} strokeWidth={strokeWidth} socketRef={socketRef} eraserSize={eraserSize} />
                <ToolSelection tool={tool} setTool={setTool} clearCanvas={clearCanvas}/>
            </div>
            <BottomToolBar color={color} setColor={setColor} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} eraserSize={eraserSize} setEraserSize={setEraserSize} tool={tool}/>
        </div>
    );
};

export default CanvasPage;
