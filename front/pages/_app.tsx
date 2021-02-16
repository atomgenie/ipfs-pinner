import "../styles/globals.scss"
import { WithNavigation } from "components/navigation"

const MyApp = ({ Component, pageProps }: any) => {
    return (
        <WithNavigation>
            <Component {...pageProps} />
        </WithNavigation>
    )
}

export default MyApp
