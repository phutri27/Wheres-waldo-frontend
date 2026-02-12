import type React from "react"

type ButtonElem = {
    children: React.ReactElement
    onClick: () => void
}

export function Button({children, onClick} : ButtonElem){
    return (
        <button onClick={onClick} className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors">
            {children}
        </button>
    )
}