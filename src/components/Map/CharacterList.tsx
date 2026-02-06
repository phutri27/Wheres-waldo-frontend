import type { CharactersInfo } from "./SpecificMap";

export default function CharacterList({character, onClick}: {character: CharactersInfo, onClick:(e: React.MouseEvent<HTMLImageElement>) => void}){
    return(
        <div onClick={onClick} className="flex flex-col w-full items-center cursor-pointer hover:bg-white">
            <img  className="h-15 bg-white" src={character.imgUrl} alt={character.name} />
            <p>{character.name}</p>
        </div>
    )
}
