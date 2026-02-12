import { Link } from "react-router"
import { useState } from "react"
import ScoreResult from "../Scoreboard/ScoreResult"
import { Trophy, Play } from 'lucide-react'
import { PopupNode } from "../ActionComponent/Popup"

export default function MapSquare ({imgUrl, altText, map_id}: {imgUrl: string, altText:string, map_id: number}){
    const [displayScoreboard, setDisplayScoreboard] = useState<boolean>(false) 

    const displayPopup = () => {
        setDisplayScoreboard(true)
    }

    const closePopup = () => {
        setDisplayScoreboard(false)
    }

    return (
        <div 
            data-testid="map-container" 
            className="group relative overflow-hidden rounded-2xl shadow-xl transition-all hover:shadow-2xl"
        >
            <div className="aspect-video w-full overflow-hidden bg-gray-200">
                <img 
                    src={imgUrl} 
                    alt={altText} 
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] pointer-events-none rounded-2xl" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
            </div>
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3 translate-y-2 opacity-100 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:opacity-100 md:translate-y-0">
                <Link to={`${map_id}`}>
                    <button className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 font-bold text-white shadow-lg transition-transform hover:bg-red-700 hover:scale-105 active:scale-95">
                        <Play size={18} fill="currentColor" />
                        Play
                    </button>
                </Link>
                <button 
                    onClick={displayPopup}
                    className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2.5 font-semibold text-white shadow-lg transition-colors hover:bg-white/30 hover:scale-105 active:scale-95"
                >
                    <Trophy size={18} />
                    Scoreboard
                </button>
            </div>

            <PopupNode open={displayScoreboard} onClose={closePopup}>
                <div className="bg-white p-1 rounded-xl">
                    <ScoreResult setActive={() => {}} map_id={map_id} resetGame={closePopup} type="homepage"/>
                </div>
            </PopupNode>
        </div>
    )
}