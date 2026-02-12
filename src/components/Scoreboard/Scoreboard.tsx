import { useState } from "react"
import { PopupNode } from "../ActionComponent/Popup"
import AddScore from "./AddScore"
import ScoreResult from "./ScoreResult"

type ScoreboardType = {
    isWin: boolean
    resetGame: () => void
    counter: number
    map_id: number
}

export default function Scoreboard({ isWin, resetGame, counter, map_id}: ScoreboardType) {
    const [isScore, setIsScore] = useState<boolean>(true)

    const setActive = () => {
        setIsScore(false)
    }

    const setToScore = () => {
        setIsScore(true)
    }

    return (
    <PopupNode open={isWin} onClose={resetGame}>
        {isScore 
        ? <AddScore setActive={setActive} counter={counter} map_id={map_id}/> 
        : <ScoreResult map_id={map_id} setActive={setToScore} resetGame={resetGame} type="in-game"/>}
    </PopupNode>
    )
}