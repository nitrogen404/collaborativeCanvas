import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faPaintBrush, faEraser } from "@fortawesome/free-solid-svg-icons";

const BottomToolBar = ({ 
  color, 
  setColor, 
  strokeWidth, 
  setStrokeWidth, 
  tool, 
  eraserSize, 
  setEraserSize 
}) => {
  return (
    <div
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center space-x-6 p-4 rounded-lg"
      style={{ borderRadius: "5px", border: "1px solid white", width: "fit-content", zIndex: "10"}}
    >
      {/* Color Picker */}
      <div className="flex items-center space-x-2"> 
        <FontAwesomeIcon
          icon={faPalette}
          className="text-sm"
          style={{ color: "#ffffff" }}
        />
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center border border-white"
          style={{ backgroundColor: color }}
        >
          <input
            type="color"
            id="color-picker"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="absolute w-4 h-4 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Conditional Slider for Pen or Eraser */}
      {tool === "pen" && (
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faPaintBrush}
            className="text-sm"
            style={{ color: "#ffffff" }}
          />
            {[1, 3, 5, 7, 10].map((size) => (
                <div
                    key={size}
                    className={`w-6 h-6 rounded-full border ${strokeWidth === size ? 'bg-white' : 'bg-gray-600'}`}
                    onClick={() => setStrokeWidth(size)}
                    style={{ cursor: 'pointer' }}
                ></div>
            ))}
        </div>
      )}

        {tool === "eraser" && (
        <div className="flex items-center space-x-2">
            <FontAwesomeIcon 
            icon={faEraser} 
            className="text-sm" 
            style={{ color: "#ffffff" }} 
            />
            <div className="flex items-center space-x-2">
            {[10, 20, 30, 40, 50].map((size) => (
                <div
                key={size}
                className={`rounded-full flex items-center justify-center border ${
                    eraserSize === size ? "border-blue-500" : "border-white"
                }`}
                style={{
                    width: `${size / 2}px`, // Adjust circle size proportionally
                    height: `${size / 2}px`,
                    backgroundColor: eraserSize === size ? "#ffffff" : "transparent",
                    cursor: "pointer",
                }}
                onClick={() => setEraserSize(size)} // Update eraser size on click
                >
                <div
                    className="rounded-full"
                    style={{
                    width: "70%",
                    height: "70%",
                    backgroundColor: "#ffffff",
                    }}
                ></div>
                </div>
            ))}
        </div>
    </div>
    )}

    </div>
  );
};

export default BottomToolBar;
