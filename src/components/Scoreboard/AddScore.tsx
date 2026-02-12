import { formatTime } from "../../utils/utils";
import React, { useState } from "react";
import { usePostData } from "../../hooks/usePostData";
import { Trophy, Check, Loader2, Sparkles } from 'lucide-react';

export default function AddScore({ setActive, map_id, counter}: {setActive: () => void, map_id: number, counter: number}){
    const [username, setUsername] = useState<string>('')
    const { error, fetchApiData, isLoading } = usePostData()
 
    const addUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const payload = {
        map_id: map_id,
        score: counter,
        username: username
    }

    const handleSubmitScore = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await fetchApiData(payload)
        if (result){
            if (result.message === "Add to scoreboard succesfully"){
                setActive()
            }
        }
    }

    return (
        <div className="relative flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-white p-8 text-center shadow-xl md:w-[400px]">
            <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 ring-8 ring-yellow-50">
                    <Trophy className="text-yellow-600" size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">You Found Waldo!</h2>
                    <p className="text-sm font-medium text-slate-500">Enter your name to save your score</p>
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center rounded-xl bg-slate-50 py-4 border border-slate-100">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Final Time</span>
                <div className="flex items-center gap-2 text-3xl font-black text-slate-800 font-mono tracking-tight">
                    <Sparkles className="text-yellow-500" size={20} />
                    {formatTime(counter)}
                    <Sparkles className="text-yellow-500" size={20} />
                </div>
            </div>
            <form onSubmit={handleSubmitScore} className="flex w-full flex-col gap-4">
                
                <div className="flex flex-col gap-1 text-left">
                    <label htmlFor="username" className="ml-1 text-xs font-bold uppercase text-slate-500">
                        Username
                    </label>
                    <input 
                        onChange={addUsername}
                        value={username}
                        type="text" 
                        name="username" 
                        id="username"
                        placeholder="e.g. WaldoFinder69"
                        className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        autoFocus
                        maxLength={50}
                    />
                    {error && (
                        <span className="ml-1 text-xs font-medium text-red-500 animate-pulse">
                            ⚠ {error}
                        </span>
                    )}
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading || !username.trim()}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none active:scale-[0.98]"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Saving...
                        </>
                    ) : (
                        <>
                            Submit Score
                            <Check className="transition-transform group-hover:translate-x-1" size={20} strokeWidth={3} />
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}