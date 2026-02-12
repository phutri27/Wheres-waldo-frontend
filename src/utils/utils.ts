export function formatTime(totalSeconds: number): string{
    const hour = Math.floor(totalSeconds / 3600)
    const minute = Math.floor(totalSeconds / 60) % 60 
    const second = totalSeconds % 60

    const pad = (num: number) => num.toString().padStart(2, '0')

    return `${pad(hour)}:${pad(minute)}:${pad(second)}`
}

export function mapPick(map_id: number): string {
    let map = ''
    if (map_id === 1){
        map = "../../../public/map_1.png"
    } else if (map_id === 2){
        map = "../../../public/map_2.png"
    } else {
        map = "../../../public/map_3.png"
    }

    return map
}

export const getRelativeCoords = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    return {
        pctX: (x / rect.width) * 100,
        pctY: (y / rect.height) * 100,
    };
}

export function calculateDropdownCoord(x: number, y: number, mapWidth: number, mapHeight: number): {xCoord: number, yCoord: number}{
    let xCoord = x
    let yCoord = y

    const dropdownHeight = 221
    const dropdownWidth = 160
    
    if (xCoord + dropdownWidth > mapWidth){
        xCoord = xCoord - dropdownWidth
    }
    if (yCoord + dropdownHeight > mapHeight){
        yCoord = yCoord - dropdownHeight
    } 

    return {
        xCoord,
        yCoord
    }
}