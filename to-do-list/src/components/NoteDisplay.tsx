import React from "react";
import '../styles/NoteDisplay.css'
interface NoteDisplayProps {
    note: string;
    onClose: () => void;
}

const NoteDisplay:React.FC<NoteDisplayProps> = ({note,onClose}) => {
    return(
        <div className="note-display">
            <div className="ovelay" onClick={onClose}>
                <div className="note-content">
                    <h5 color="black">Task Description</h5>
                    <p>{note}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default NoteDisplay;