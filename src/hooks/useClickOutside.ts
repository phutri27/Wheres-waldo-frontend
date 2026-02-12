import { useEffect, type RefObject } from "react";

export function useClickOutside (isVisible: boolean, callback: () => void, ref: RefObject<HTMLElement | null>){
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            if (!isVisible) return
            if (ref.current && ref.current.contains(e.target as Node)){
                return
            }

            callback()
        }

        document.addEventListener('click', handleGlobalClick)
        return () => document.removeEventListener('click', handleGlobalClick)
    }, [isVisible, ref, callback])
}