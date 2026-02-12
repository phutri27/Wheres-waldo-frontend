import {  useState } from "react"
import { fetchApi } from "../utils/ApiService";

export function useHandleData(){
    const [error, setError] = useState<string | null>(null)

    const fetchApiData = async (map_id: number, x_coord: number, y_coord:number, name: string) => {
        const controller = new AbortController()
        
        try {
            const result = await fetchApi(`/${map_id}/${x_coord}/${y_coord}/${name}`, controller.signal)
            return result
        } catch (error) {
            if (error instanceof Error){
                setError(error.message)
            }
            return null
        } 
    }

    return {
        error,
        setError,
        fetchApiData
    }
}