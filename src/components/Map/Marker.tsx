import type { PickedCharacters } from "./SpecificMap"

function Marker({char}: {char: PickedCharacters}){
    return (
    <div className="absolute -translate-1/2" style={{ left: `${char.position.pctX}%`, top: `${char.position.pctY}%`}}>
        <img className="h-5 md:h-8 select-none" src="../../../public/marker.png" alt={`${char.name} marker`} />
    </div>)
}

export default Marker