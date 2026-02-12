import React, { useState, useRef } from "react"
import { characters } from "../../data-source/data_source"
import { mapPick, calculateDropdownCoord, getRelativeCoords } from "../../utils/utils"
import { useParams } from "react-router"
import "../../styles/Styles.css"
import GameHeader from "./GameHeader"
import DropDownMenu from "./DropDownMenu"
import { useGameTimer } from "../../hooks/useGameTimer"
import { useClickOutside } from "../../hooks/useClickOutside"
import { useHandleData } from "../../hooks/useHandleData";
import Scoreboard from "../Scoreboard/Scoreboard"
import Image from "./Image"

export type PickedCharacters = {
    name: string,
    position: {pctX: number, pctY: number}
}

function SpecificMap(){
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [positionStyle, setPositionStyle] = useState({left: 0, top: 0})
    const [message, setMessage] = useState<string>('')
    const [foundCharacter, setFoundCharacter] = useState<PickedCharacters[]>([])
    const [delay, setDelay] = useState<number | null>(1000)
    const [isWin, setIsWin] = useState<boolean>(false)
    
    const dropDownRef = useRef<HTMLDivElement>(null)
    const {counter, setCounter} = useGameTimer(delay)

    const { map_id } = useParams()
    const map = mapPick(Number(map_id))
    const { error, setError, fetchApiData } = useHandleData()
    
    if (foundCharacter.length === characters.length && isWin === false){
        setIsWin(true)
        setDelay(null)
    }

    const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        if (isVisible) {
            setIsVisible(false);
        } else {    
            const {xCoord, yCoord} = calculateDropdownCoord(
                e.nativeEvent.offsetX, 
                e.nativeEvent.offsetY,
                e.currentTarget.offsetWidth,
                e.currentTarget.offsetHeight)
            
            const {pctX, pctY} = getRelativeCoords(e) 
            setPositionStyle({...positionStyle, left: xCoord, top: yCoord})
            setPosition({ x: pctX, y: pctY});
            setIsVisible(true);
        }
    }
    
    const closeDropDown = () => {
        setIsVisible(false)
    }

    const resetGame = () => {
        setFoundCharacter([])
        setIsWin(false)
        setDelay(1000)
        setCounter(0)
    }

    useClickOutside(isVisible, closeDropDown, dropDownRef)

    const submitCoord = async (name: string) => {
        const result = await fetchApiData(Number(map_id), position.x, position.y, name)
        
        if (result) {
            if (result.message.includes(name)){
                setFoundCharacter((char) => [...char, {name: name, position: {pctX: position.x, pctY: position.y}}])
            }
            setMessage(result.message)
            setTimeout(() => {
                setMessage('')
                setError('')}, 5000)
        }
    }

    return (
        <>
            <GameHeader 
                message={error ? error : message} 
                characters={characters} 
                counter={counter}
                names={foundCharacter.map(char => char.name)}
            />
            <div className="relative">
            <Image map={map} map_id={Number(map_id)} handleClick={handleClick} foundCharacter={foundCharacter}/>
                {isVisible && (<DropDownMenu 
                    characters={characters} 
                    positionStyle={positionStyle}
                    ref={dropDownRef}
                    submitCoord={submitCoord}
                    callback={closeDropDown}
                    names={foundCharacter.map(char => char.name)}
                />)}
                <Scoreboard counter={counter} map_id={Number(map_id)} isWin={isWin} resetGame={resetGame}/>
            </div>
        </>
    )
}

export default SpecificMap