import MapSquare from './MapSquare'

function Homepage() {
  const imgArr:string[] = [
    "../../../public/map_1.png",
    "../../../public/map_2.png",
    "../../../public/map_3.png"
  ]

  return (
    <>
      {imgArr.map((img, index) => 
        <MapSquare key={`map_${index + 1}`} imgUrl={img} altText={`map_${index + 1}`}/>
      )}
    </>
  )
}

export default Homepage
