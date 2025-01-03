import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faEraser } from '@fortawesome/free-solid-svg-icons';

const ToolSelection = ({tool, setTool}) => {
    return (
        <div className="absolute flex flex-col items-center space-y-4 p-2"
            style={{backgroundColor: "#1c1917", border: "1px solid #FFFFFF", borderRadius:"10px", top: "20px", left: "10px"}}>
            
            <button className={`p-2 rounded ${tool === "pen" ? "bg-gray-600" : "bg-stone-900"}`}
                    onClick={() => setTool("pen")}><FontAwesomeIcon icon={faPencilAlt} style={{color: "#ffffff",}} />
            </button>
            
            <button className={`p-2 rounded ${tool === "eraser" ? "bg-gray-600": "bg-stone-900"}`} 
                    onClick={() => setTool("eraser")}><FontAwesomeIcon icon={faEraser} style={{color: "#ffffff",}} />
            </button>
        </div>
    )
}

export default ToolSelection;