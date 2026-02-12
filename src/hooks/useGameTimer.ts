import { useState } from "react";
import { useInterval } from "./useInterval";
export function useGameTimer(delay: number | null){
    const [counter, setCounter] = useState<number>(0)
    useInterval(() => {
        setCounter((count) => count + 1)
    }, delay)
    return {counter, setCounter}
}