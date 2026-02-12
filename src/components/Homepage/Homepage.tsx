  import MapSquare from './MapSquare'
  import { imgArr } from '../../data-source/data_source'
  import { useState } from 'react'
  import { X } from 'lucide-react'
  import { Button } from '../ActionComponent/Button'
  import Instruction from './Instruction'
  import { PopupNode } from '../ActionComponent/Popup'

  function Homepage() {
    const [instruction, setInstruction] = useState<boolean>(false)

    const displayInstruction = () => {
      setInstruction(true)
    }

    const closeInstruction = () => {
      setInstruction(false)
    }

    return (
      <>
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Where's <span className="text-red-600">Waldo?</span>
              </h1>
            </div>
            <div className='flex gap-3 items-center'>
              <button 
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95" 
                onClick={displayInstruction}
              >
                Instruction
              </button>
              <p className="text-sm font-medium text-slate-500 hidden md:block">
                Select a map to start
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6' data-testid="overall-container">
            {imgArr.map((img, index) => 
              <MapSquare 
                key={`map_${index + 1}`} 
                imgUrl={img} 
                altText={`map_${index + 1}`}
                map_id={(index + 1)}
              />
            )}
          </div>
        </main>
        <PopupNode 
          open={instruction}
          onClose={closeInstruction}>
          <div className="bg-white p-1 rounded-xl">
            <Button onClick={closeInstruction}>
              <X size={20} />
            </Button>
            <Instruction />
          </div>
        </PopupNode>
      </>
    )
  }

  export default Homepage
