import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faPaintBrush } from "@fortawesome/free-solid-svg-icons";

const BottomToolBar = ({ color, setColor, strokeWidth, setStrokeWidth }) => {
  return (
    <div
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center space-x-6 p-4 rounded-lg"
      style={{ borderRadius: "5px", border: "1px solid white", width: "fit-content", height: "fit-content"}}
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
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Stroke Width */}
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon
          icon={faPaintBrush}
          className="text-sm"
          style={{ color: "#ffffff" }}
        />
        <input
          type="range"
          id="stroke-width"
          value={strokeWidth}
          min="1"
          max="10"
          onChange={(e) => setStrokeWidth(e.target.value)}
          className="w-20"
        />
      </div>
    </div>
  );
};

export default BottomToolBar;
