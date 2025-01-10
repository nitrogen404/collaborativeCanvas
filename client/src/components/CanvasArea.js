import React, {useRef} from "react";
import { Stage, Layer, Line } from "react-konva";

const CanvasArea = ({lines, setLines, tool, color, strokeWidth, socketRef}) => {
    const isDrawing = useRef(false);
    
    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, color, strokeWidth, points: [pos.x, pos.y] }]);
      };
    
    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;
        
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = {...lines[lines.length - 1]};
        lastLine.points = [...lastLine.points.concat([point.x, point.y])];
        const updatedLines = [...lines.slice(0, -1), lastLine];
        setLines(updatedLines);
        socketRef.current.emit('draw', lastLine, 'room1');
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return (
        <div className="absolute inset-0 bg-stone-900">
            <Stage 
                    width={window.innerWidth} 
                    height={window.innerHeight} 
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ border: '1px solid red', borderRadius: "5px"}}
                    className="border"
                    >
                    
                    <Layer>
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke={line.color}
                                strokeWidth={line.strokeWidth}
                                tension={0.5}
                                lineCap="round"
                                lineJoin="round"
                                globalCompositeOperation={
                                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                }
                            />
                        ))}
                    </Layer>
                </Stage>
        </div>
    )
}

export default CanvasArea;