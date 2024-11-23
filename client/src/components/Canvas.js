import { fabric } from "fabric";
import io from 'socket.io-client';
import React, {useRef, useEffect} from "react";

const Canvas = () => {
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const fabricCanvas = new fabric.Canvas(canvas);
        fabricCanvasRef.current = fabricCanvas;
        
        fabricCanvas.isDrawingMode =true;
        fabricCanvas.freeDrawingBrush.width = 5;
        fabricCanvas.freeDrawingBrush.color = 'black';

        socketRef.current = io('http://localhost:8080/');

        fabricCanvas.on('mouse:down', handleMouseDown);
        fabricCanvas.on('mouse:move', handleMouseMove);
        fabricCanvas.on('mouse:up', handleMouseUp);

        return () => {
            fabricCanvas.off('mouse:down', handleMouseDown);
            fabricCanvas.off('mouse:move', handleMouseMove);
            fabricCanvas.off('mouse:up', handleMouseUp);
            socketRef.current.disconnect();
        }
    }, []);

    const handleMouseDown = (event) => {
        const {x, y} = event.pointer;
        socketRef.current.emit('draw:start', {x, y});
    };

    const handleMouseMove = (event) => {
        if(!fabricCanvasRef.current.isDrawingMode) return;
        const {x, y} = event.pointer;
        socketRef.current.emit('draw:progress', {x, y});
    };

    const handleMouseUp = () => {
        socketRef.current.emit('draw:end');
    };

    return (
        <canvas ref={canvasRef} width={800} height={600}></canvas>
    )
}

export default Canvas;
