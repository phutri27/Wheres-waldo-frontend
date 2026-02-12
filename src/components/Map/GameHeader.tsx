import { Link } from "react-router"
import { ArrowLeft, Clock } from "lucide-react"
import CharacterList from "./CharacterList"
import { formatTime } from "../../utils/utils"
import Message from "./Message"
import type { CharactersInfo } from "../../data-source/data_source"


export default function GameHeader({counter, characters, message, names}: 
    {counter: number, characters: CharactersInfo[], message:string, names: string[]}) {
    const voidOnClick = async () => {}

    return (
        <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-slate-100 bg-white/90 px-6 shadow-sm backdrop-blur-md transition-all">
            <div className="flex w-24 justify-start">
                <Link to="/" className="group flex items-center justify-center rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                    <ArrowLeft size={24} strokeWidth={2.5} />
                </Link>
            </div>
            <div className="flex items-center gap-4 sm:gap-8">
                {characters.map((character) => (
                    <CharacterList 
                        key={character.name} 
                        character={character} 
                        onClick={voidOnClick} 
                        styleCharacter={names.includes(character.name) ? "bg-green-100 border-green-500 opacity-50 grayscale" : "bg-white border-transparent"}
                        callback={voidOnClick}
                    />
                ))}
            </div>
            <div className="flex w-24 items-center justify-end gap-2 font-mono text-xl font-bold text-slate-700" data-testid="counter">
                <Clock size={18} className="text-slate-400" />
                <span>{formatTime(counter)}</span>
            </div>
            {message && (
                <div className="absolute left-1/2 top-24 -translate-x-1/2 animate-bounce rounded-full border border-slate-200 bg-white px-6 py-2 shadow-xl">
                    <Message message={message} 
                    containerStyle={message === 
                    "Wrong!!! Try again" 
                    ? "border-red-300 text-red-500" 
                    : "border-green-300 text-green-500"}/>
                </div>
            )}
        </header>
    )
}