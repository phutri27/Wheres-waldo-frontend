import { Link } from "react-router"

export default function MapSquare ({imgUrl, altText}: {imgUrl: string, altText:string}){
    return (
        <div data-testid="map-container"> 
            <div>
                <img src={imgUrl} alt={altText} />
            </div>
            <div>
                <Link to={altText}><button>Play map</button></Link>
                <button>Scoreboard</button>
            </div>
        </div>
    )
}