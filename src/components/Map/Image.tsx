import { useState } from "react";
import RenderGameContent from "./RenderGameContent";
import type { PickedCharacters } from "./SpecificMap";

const MAGNIFIER_SIZE = (window.screen.width <= 600 || window.screen.height <= 600) ? 70 : 130; // size of the glass in px
const ZOOM_LEVEL = 2;     // how much to zoom

type ImageType = {
    map: string, 
    map_id: number,
    handleClick: (e: React.MouseEvent<HTMLImageElement>) => void,
    foundCharacter: PickedCharacters[]
}

export default function Image({map, map_id, handleClick, foundCharacter}: ImageType) {
    const [magnifierState, setMagnifierState] = useState({
        show: false,
        x: 0,
        y: 0,
        width: 0, 
        height: 0 
    });

    const handleMouseEnter = (e: React.MouseEvent) => {
        const { width, height } = e.currentTarget.getBoundingClientRect();
        setMagnifierState(prev => ({ ...prev, show: true, width, height }));
    }
    
    const handleMouseLeave = () => {
        setMagnifierState(prev => ({ ...prev, show: false }));
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
        
        const x = e.clientX - left;
        const y = e.clientY - top;

        setMagnifierState({ show: true, x, y, width, height });
    }

    return (
        <div 
            className="relative inline-block w-full overflow-hidden" 
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <RenderGameContent map={map} map_id={map_id} foundCharacter={foundCharacter}/>
            {magnifierState.show && (
                <div
                    style={{
                        position: 'absolute',
                        left: magnifierState.x - MAGNIFIER_SIZE / 2,
                        top: magnifierState.y - MAGNIFIER_SIZE / 2,
                        width: MAGNIFIER_SIZE,
                        height: MAGNIFIER_SIZE,
                        border: '2px solid white',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                        overflow: 'hidden', 
                        pointerEvents: 'none',
                        zIndex: 50
                    }}
                >
                    <div 
                        style={{
                            width: magnifierState.width, 
                            height: magnifierState.height, 
                            transformOrigin: '0 0',
                            transform: `
                                translate(
                                    ${-magnifierState.x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2}px, 
                                    ${-magnifierState.y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2}px
                                ) 
                                scale(${ZOOM_LEVEL})
                            `,
                            position: "absolute",
                            top: 0,
                            left: 0
                        }}
                    >
                        <RenderGameContent map={map} map_id={map_id} foundCharacter={foundCharacter}/>
                    </div>
                </div>
            )}
        </div>
    )
}