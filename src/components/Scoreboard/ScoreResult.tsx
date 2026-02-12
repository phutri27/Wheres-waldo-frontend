import { Link } from 'react-router'
import { useGetData } from '../../hooks/useGetData'
import { formatTime } from '../../utils/utils'
import { useState, useEffect } from 'react'
import { Trophy, Home, RotateCcw, X, User } from 'lucide-react';
import { Button } from '../ActionComponent/Button';

type ScoreboardData = {
    username: string
    score: number
}

export default function ScoreResult({map_id, resetGame, type, setActive}: {map_id: number, resetGame: () => void, type: string, setActive: () => void}) {
    const [datas, setDatas] = useState<ScoreboardData[]>([])
    const {error, isLoading, fetchApiData} = useGetData()
   
    useEffect(() => {
        const load = async () => {
            const result = await fetchApiData(map_id)
            setDatas(result)
        }
        load()
    }, [map_id])

    const setHardReset = () => {
        setActive()
        resetGame()
    }

    if (error){
        return (
            <div className="flex h-64 w-full flex-col items-center justify-center gap-2 text-red-500">
                <span className="text-xl font-bold">⚠ Error</span>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div data-testid="scoreboard-container" className="relative flex h-full max-h-[80vh] w-full min-w-[350px] flex-col overflow-hidden bg-white text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-500" size={20} />
                    <h2 className="text-lg font-bold uppercase tracking-wider text-slate-700">Leaderboard</h2>
                </div>
                {type === "homepage" && (
                    <Button onClick={resetGame}>
                        <X size={20} />
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-4 gap-4 bg-slate-50/50 px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <div className="text-center">Rank</div>
                <div className="col-span-2">Player</div>
                <div className="text-right">Time</div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                {isLoading ? (
                    <div className="flex h-40 flex-col items-center justify-center gap-3 text-slate-400">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500"></div>
                        <span className="text-sm font-medium">Loading scores...</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1">
                        {datas.map((data, index) => (
                            <div 
                                key={index}
                                className={`
                                    grid grid-cols-4 items-center gap-4 rounded-lg px-4 py-3 transition-colors
                                    ${index === 0 ? "bg-yellow-50 border border-yellow-100" : "hover:bg-slate-50"}
                                `}
                            >
                                <div className="flex justify-center">
                                    <span className={`
                                        flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold
                                        ${index === 0 ? "bg-yellow-400 text-yellow-900" : 
                                          index === 1 ? "bg-slate-300 text-slate-700" : 
                                          index === 2 ? "bg-amber-600 text-amber-100" : "bg-slate-100 text-slate-500"}
                                    `}>
                                        {index + 1}
                                    </span>
                                </div>
                                <div className="col-span-2 flex items-center gap-2 overflow-hidden">
                                    <User size={14} className="text-slate-300" />
                                    <p className={`truncate text-sm font-semibold ${index === 0 ? "text-yellow-700" : "text-slate-700"}`}>
                                        {data.username}
                                    </p>
                                </div>
                                <div className="flex items-center justify-end gap-1 font-mono text-sm font-bold text-slate-600">
                                    {formatTime(data.score)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {type === "in-game" ? (
                <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={setHardReset} 
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                        >
                            <RotateCcw size={18} />
                            Restart Game
                        </button>
                        
                        <Link to="/" className="w-full">
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800">
                                <Home size={18} />
                                Back to Homepage
                            </button>
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    )
}