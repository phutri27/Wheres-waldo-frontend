const API_URL = import.meta.env.VITE_API_URL

export async function fetchApi(url: string, signal: AbortSignal){
    const response = await fetch(`${API_URL}` + `${url}`, {
        signal: signal
    })
    if (response.status >= 400){
        throw new Error("Fetching error")
    }
    const result = await response.json()
    return result
}

export async function fetchPostApi(payload: {username: string, map_id: number, score: number},url: string) {
    const response = await fetch(`${API_URL}` + `${url}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    if (response.status >= 400){
        const res = await response.json()
        if(response.status == 408){
            throw new Error(res.errors[0])
        }
        throw new Error(await response.text())
    }
    const result = await response.json()
    return result
}