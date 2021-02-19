import { createContext, useContext } from "react"

interface contextType {
    token: string
    setToken: (value: string) => void
}

const tokenContext = createContext<contextType>({ setToken: () => {}, token: "" })

export const TokenProvider = tokenContext.Provider

export const useToken = (): string => {
    return useContext(tokenContext).token
}

export const useSetToken = (): contextType["setToken"] => {
    return useContext(tokenContext).setToken
}

const LOCALSTORAGE_TOKEN = "__ipfs_token__"

export const getLocalToken = (): string => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(LOCALSTORAGE_TOKEN) || ""
    }
    return ""
}

export const setLocalStorageToken = (token: string) => {
    localStorage.setItem(LOCALSTORAGE_TOKEN, token)
}
