import {  useState } from "react"
import { fetchApi } from "../utils/ApiService";

export function useGetData(){
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchApiData = async (map_id: number) => {
        const controller = new AbortController()
        setError(null)
        setIsLoading(true)

        try {
            const result = await fetchApi(`/scoreboard/${map_id}`, controller.signal)
            return result
        } catch (error) {
            if (error instanceof Error){
                setError(error.message)
            }
            return null
        }  finally{
            setIsLoading(false)
        }
    }

    return {
        error,
        isLoading,
        fetchApiData
    }
}