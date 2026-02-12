import {  useState } from "react"
import { fetchPostApi } from "../utils/ApiService";

export function usePostData(){
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)  

    const fetchApiData = async (payload: {username: string, map_id: number, score: number}) => {
        setError(null)
        setIsLoading(true)

        try {
            const result = await fetchPostApi(payload, "/scoreboard")
            return result
        } catch (error) {
            if (error instanceof Error){
                setError(error.message)
            }
            return null
        } finally{
            setIsLoading(false)
        }
    }

    return {
        error,
        isLoading,
        fetchApiData
    }
}