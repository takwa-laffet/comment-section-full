import { createContext } from "react"
import { useComments } from "./hooks"

export const StateContext = createContext()

function StateProvider({ children }) {
    const {comments, actions} = useComments()

    return (
        <StateContext.Provider value={{comments, actions}}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider