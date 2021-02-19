import { useEffect } from "react"
import { Subject } from "rxjs"

const refreshSource = new Subject<null>()

export const triggerRefresh = () => {
    refreshSource.next(null)
}

export const useRefresh = (fn: () => void) => {
    useEffect(() => {
        const subscription = refreshSource.subscribe(() => fn())

        return () => {
            subscription.unsubscribe()
        }
    }, [fn])
}
