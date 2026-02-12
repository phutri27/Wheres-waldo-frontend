import { CheckCircle, XCircle } from 'lucide-react';

export default function Message({message, containerStyle}:{message: string, containerStyle: string}){
    const isError = containerStyle.includes("red");

    return (
        <div className={`
            fixed top-24 left-1/2 z-50 -translate-x-1/2 transform
            flex items-center gap-3 rounded-full border-2 bg-white px-6 py-3 shadow-2xl
            animate-bounce
            ${containerStyle}
        `}>
            {isError ? (
                <XCircle size={24} strokeWidth={2.5} />
            ) : (
                <CheckCircle size={24} strokeWidth={2.5} />
            )}
            <span className="whitespace-nowrap font-bold uppercase tracking-wide">
                {message}
            </span>
        </div>
    )
}