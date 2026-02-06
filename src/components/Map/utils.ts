export function formatTime(totalSeconds: number): string{
    const hour = Math.floor(totalSeconds / 3600)
    const minute = Math.floor(totalSeconds / 60)
    const second = totalSeconds % 60

    const pad = (num: number) => num.toString().padStart(2, '0')

    return `${pad(hour)}:${pad(minute)}:${pad(second)}`
}

export function mapPick(map_id: string | undefined): string {
    let map = ''
    if (map_id === "map_1"){
        map = "../../../public/map_1.png"
    } else if (map_id === "map_2"){
        map = "../../../public/map_2.png"
    } else {
        map = "../../../public/map_3.png"
    }

    return map
}

export function getWindowDimension(){
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}
