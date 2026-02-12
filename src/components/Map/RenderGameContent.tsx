import type { PickedCharacters } from "./SpecificMap";
import Marker from "./Marker";

type ImageType = {
    map: string, 
    map_id: number,
    foundCharacter: PickedCharacters[]
}

export default function RenderGameContent ({map, map_id, foundCharacter}: ImageType) {
    return (
        <>
            <img 
                className="block w-full h-auto select-none"
                src={map} 
                alt={`map_${map_id}`} 
                draggable={false}
            />
            {foundCharacter.map(char => (
                <Marker key={char.name} char={char} />
            ))}
        </>
    );
}