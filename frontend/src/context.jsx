import { createContext } from "react"
import { useComments } from "./hooks"

export const StateContext = createContext()

function StateProvider({ children }) {
    const {comments, actions} = useComments()
    console.log(comments)

    return (
        <StateContext.Provider value={{comments, actions}}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider