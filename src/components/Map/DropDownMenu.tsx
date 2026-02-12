import type { RefObject } from "react"
import CharacterList from "./CharacterList"
import type { CharactersInfo } from "../../data-source/data_source"

type DropDowntype ={
    characters: CharactersInfo[],
    submitCoord: (name: string) => Promise<void>,
    positionStyle: {left: number, top: number},
    ref: RefObject<HTMLDivElement | null>,
    callback: () => void,
    names: string[]
}

export default function DropDownMenu({characters, positionStyle, ref, submitCoord, callback, names}: DropDowntype) {
    return (
        <div data-testid="answer-container" 
        className="absolute z-50 mt-2 grid w-40 grid-cols-2 gap-2 overflow-hidden rounded-xl border border-slate-100 bg-white/95 p-2 shadow-2xl backdrop-blur-sm ring-1 ring-black/5 transition-all animate-in fade-in zoom-in-95"
        style={positionStyle} 
        ref={ref} >
            <div className="col-span-2 pb-1 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Who is it?
            </div>
            {characters.map((character) => 
                <CharacterList 
                key={character.name} 
                character={character} 
                onClick={submitCoord}
                styleCharacter={names.includes(character.name) ? "bg-green-300" : "bg-white"} 
                callback={callback}/>
            )}
        </div>
    )
}