import type { CharactersInfo } from "../../data-source/data_source"

type Character = {
    character: CharactersInfo, 
    onClick: (name: string) => Promise<void>, 
    styleCharacter: string,
    callback: () => void
}

export default function CharacterList({character, onClick, styleCharacter, callback}: Character){
    const setName = () => {
        onClick(character.name)
        callback()
    }
    const isFound = styleCharacter.includes("bg-green-300");

    return(
        <div 
            data-testid="character-container" 
            onClick={setName} 
            className={`
                group flex flex-col items-center gap-1 p-1 rounded-lg transition-all duration-300
                ${isFound 
                    ? "pointer-events-none opacity-60 grayscale" 
                    : "cursor-pointer hover:-translate-y-1 active:scale-95"
                }
            `}
        >
            <div className={`
                relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 bg-white shadow-sm overflow-hidden
                ${isFound 
                    ? "border-green-500 ring-2 ring-green-200"
                    : "border-slate-200 group-hover:border-red-500 group-hover:shadow-md"
                }
            `}>
                <img 
                    className="h-full w-full object-contain p-1.5" 
                    src={character.imgUrl} 
                    alt={character.name} 
                />
                {isFound && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/10">
                        <span className="text-xl font-bold text-green-600">✓</span>
                    </div>
                )}
            </div>
            <p className={`
                text-[10px] md:text-xs font-bold uppercase tracking-wider
                ${isFound 
                    ? "text-green-700 line-through decoration-2" 
                    : "text-slate-600 group-hover:text-slate-900"
                }
            `}>
                {character.name}
            </p>
        </div>
    )
}
