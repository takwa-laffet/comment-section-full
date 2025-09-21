import { createContext, useReducer } from "react"
import {reducer} from './reducer'
import data from './data/comments.json'

export const StateContext = createContext()

/*
    Just keeping this here for reference. I'm going to define some "abstract" methods that update state so I don't have to track dispatch calls throughout the codebase. The easier it gets to modify the way dispatch calls work, the less time I can spend on making several changes within components that shouldn't care how state gets updated.
*/

function StateProvider({ children }) {
    const [comments, dispatch] = useReducer(reducer, data)

    const actions = {
        scoreIncremented: (id, currentScore) =>
            dispatch({
                type: 'INCREMENT_SCORE',
                payload: {
                    id,
                    currentScore
                }
            }),
        scoreDecremented: (id, currentScore) =>
            dispatch({
                type: 'DECREMENT_SCORE',
                payload: {
                    id,
                    currentScore
                }
            }),
        replyCreated: (id, username) =>
            dispatch({
                type: 'CREATE_REPLY',
                payload: {
                    id,
                    username
                }
            })
    }

    return (
        <StateContext.Provider value={{comments, actions}}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider