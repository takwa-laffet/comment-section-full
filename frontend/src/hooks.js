import { useReducer } from "react"
import { reducer } from './reducer'
import data from './data/comments.json'

/*
    Just keeping this here for reference. I'm going to define some "abstract" methods that update state so I don't have to track dispatch calls throughout the codebase. The easier it gets to modify the way dispatch calls work, the less time I can spend on making several changes within components that shouldn't care how state gets updated.
*/

export function useComments() {
    const [comments, dispatch] = useReducer(reducer, data)

    const scoreIncremented = (id, currentScore) =>
        dispatch({
            type: 'INCREMENT_SCORE',
            payload: {
                id,
                currentScore
            }
        })

    const scoreDecremented = (id, currentScore) =>
        dispatch({
            type: 'DECREMENT_SCORE',
            payload: {
                id,
                currentScore
            }
        })

    const commentCreated = content =>
        dispatch({
            type: 'CREATE_COMMENT',
            payload: {
                content
            }
        })

    const replyCreated = (id, username, content) =>
        dispatch({
            type: 'CREATE_REPLY',
            payload: {
                id,
                username,
                content
            }
        })

    const commentDeleted = id =>
        dispatch({
            type: 'DELETE_COMMENT',
            payload: {
                id
            }
        })

    const commentEdited = (id, content) =>
        dispatch({
            type: 'EDIT_COMMENT',
            payload: {
                id,
                content
            }
        })

    return {
        comments,
        actions: {
            scoreIncremented,
            scoreDecremented,
            commentCreated,
            replyCreated,
            commentEdited,
            commentDeleted
        }
    }
}