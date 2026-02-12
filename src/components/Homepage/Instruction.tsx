import { Map, MousePointer2, Trophy } from 'lucide-react';
export default function Instruction(){
    return (
        <div className="flex w-full max-w-md flex-col gap-6 p-4 text-slate-800 md:p-6">
            <div className="text-center">
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                    How to Play
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                    Find the hidden characters as fast as you can!
                </p>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Map size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Pick a Map</h3>
                        <p className="text-sm text-slate-600">
                            Choose from different worlds like the Ski Slope, Beach, or Space.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <MousePointer2 size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="font-bold text-slate-900">Tag Characters</h3>
                            <p className="text-sm text-slate-600">
                                Click on the map and select the character that matches.
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                            <img 
                                className="h-auto w-full object-cover" 
                                src="/instruction/characters.png" 
                                alt="Characters Guide" 
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                        <Trophy size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Win the Game</h3>
                        <p className="text-sm text-slate-600">
                            Find all 4 characters to stop the timer and save your high score!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}