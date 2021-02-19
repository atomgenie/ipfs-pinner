import { useCallback, useState } from "react"

import "../styles/globals.scss"
import { WithNavigation } from "components/navigation"
import { TokenProvider, getLocalToken, setLocalStorageToken } from "components/token"

const MyApp = ({ Component, pageProps }: any) => {
    const [token, setToken] = useState(() => getLocalToken())

    const handleSetToken = useCallback((_token: string) => {
        setToken(_token)
        setLocalStorageToken(_token)
    }, [])

    return (
        <TokenProvider value={{ token, setToken: handleSetToken }}>
            <WithNavigation>
                <Component {...pageProps} />
            </WithNavigation>
        </TokenProvider>
    )
}

export default MyApp
