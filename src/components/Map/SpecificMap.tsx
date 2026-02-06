import React, { useEffect, useState, useRef } from "react"
import { formatTime, mapPick, getWindowDimension } from "./utils"
import { useParams, Link } from "react-router"
import CharacterList from "./CharacterList"
import { ArrowLeft } from 'lucide-react';
import "../../styles/Styles.css"

export type CharactersInfo = {
    id: number
    imgUrl: string,
    name: string
}

function SpecificMap(){
    const [counter, setCounter] = useState<number>(0)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [position, setPosition] = useState({x: 0, y:0})

    const dropDownRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<HTMLImageElement>(null)

    const { map_id } = useParams()
    const map = mapPick(map_id)
    const windowSize = getWindowDimension()

    useEffect(() => {
        const key = setInterval(() => {
            setCounter(c => c + 1)
        }, 1000)

        return () => clearInterval(key)
    }, [])

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            if (!isVisible) return
            if (dropDownRef.current && dropDownRef.current.contains(e.target as Node)){
                return
            }

            setIsVisible(false)
        }

        document.addEventListener('click', handleGlobalClick)
        return () => document.removeEventListener('click', handleGlobalClick)
    }, [isVisible])

    const characters: CharactersInfo[]  = [
        {id: 1, imgUrl: "../../../public/characters/waldo.png", name: "Waldo"},
        {id: 2, imgUrl:"../../../public/characters/wenda.png", name: "Wenda"},
        {id: 3, imgUrl: "../../../public/characters/odlaw.png", name: "Odlaw"},
        {id: 4, imgUrl: "../../../public/characters/wizard.png", name: "Wizard"}
    ]

    const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        if (isVisible) {
            setIsVisible(false);
        } else {
            let xCoord = e.nativeEvent.offsetX
            let yCoord = e.nativeEvent.offsetY
            const mapWidth = e.currentTarget.offsetWidth
            const mapHeight = e.currentTarget.offsetHeight
            const dropdownHeight = 418
            const dropdownWidth = 131

            console.log("x: ",xCoord, "y: ", yCoord)
            console.log("width: ", windowSize.width, "height:", windowSize.height)
            if (xCoord + dropdownWidth > mapWidth){
                xCoord -= dropdownWidth 
            }
            if (yCoord + dropdownHeight > mapHeight) {
                yCoord -= dropdownHeight
            }
            setPosition({ x: xCoord, y: yCoord});
            setIsVisible(true);
        }
    }

    return (
        <>
            <header className="flex font-semibold text-[10px] md:text-lg justify-center items-center h-30 gap-3 bg-gray-200 shadow-md">
                <div className="absolute top-3 left-2 hover:bg-slate-50 rounded-2xl"><Link to="/"><ArrowLeft size={30} /></Link></div>
                <div className="flex gap-5">
                    {characters.map((character) => 
                        <CharacterList key={character.id} character={character} />
                    )}
                </div>
                <div className=" flex items-center" data-testid="counter">{formatTime(counter)}</div>
            </header>
            <div className="relative">
                <img ref={mapRef} onClick={handleClick} src={map} alt={map_id} />
            {isVisible && (
                <div data-testid="answer-container" className="absolute font-semibold bg-gray-200 border p-10 z-10" style={{left: position.x, top: position.y}} ref={dropDownRef} >
                    {characters.map((character) => 
                        <CharacterList key={character.id} character={character} />
                    )}
                </div>
            )}
            </div>

        </>
    )
}

export default SpecificMap