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
    const [eraserSize, setEraserSize] = useState(10);  // need to fix this bug 
    const [userCursors, setUserCursors] = useState({});


    useEffect(() => {
        const initialPosition = { 
            x: window.innerWidth / 2, 
            y: window.innerHeight / 2 
        };

        socketRef.current = io('http://localhost:8080');
        socketRef.current.emit('joinRoom', 'room1', {
            name: "Chandan", 
            point: initialPosition
        });
        
        socketRef.current.on('draw', (data) => {
            setLines((prevLines) => [...prevLines, data]);
        });

        socketRef.current.on('updateCursor', ({id, point}) => {
            setUserCursors((prevCursor) => ({
                ...prevCursor, 
                [id]: point,
            }))
        });

        socketRef.current.on('existingCursors', (existingCursors) => {
            const cursors = {};
            existingCursors.forEach(({id, point, user}) => {
                cursors[id] = {point, user}
            });
            setUserCursors(cursors);

            setUserCursors((prevCursors) => ({
                ...prevCursors,
                [socketRef.current.id]: { point: initialPosition, user: 'You' },
            }))
        })

        socketRef.current.on('removeCursor', (id) => {
            setUserCursors((prevCursor) => {
                const newCursors = {...prevCursor};
                delete newCursors[id];
                return newCursors;
            })
        })
        
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
                <CanvasArea 
                    lines={lines} 
                    setLines={setLines} 
                    tool={tool} 
                    color={color} 
                    strokeWidth={strokeWidth} 
                    socketRef={socketRef} 
                    eraserSize={eraserSize} 
                    userCursors={userCursors}
                />
                
                <ToolSelection 
                    tool={tool} 
                    setTool={setTool} 
                    clearCanvas={clearCanvas}
                />
            </div>
            <BottomToolBar 
                color={color} 
                setColor={setColor} 
                strokeWidth={strokeWidth} 
                setStrokeWidth={setStrokeWidth} 
                eraserSize={eraserSize} 
                setEraserSize={setEraserSize} 
                tool={tool}
            />
        </div>
    );
};

export default CanvasPage;
