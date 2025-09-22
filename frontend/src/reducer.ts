import users from './data/users.json'
import { Comment } from './context'

export function reducer(state: {
    byId: Record<string, Comment>
    allId: string[]
}, action: {
    type: string
    payload: any
}) {
    const clonedState = structuredClone(state)
    const comment = clonedState.byId[action.payload.id]

    switch (action.type) {
        case 'CREATE_COMMENT':
            const newId = action.payload.newId

            clonedState.byId[newId] = {
                content: action.payload.content,
                score: 0,
                replies: [],
                id: newId,
                parentId: null,
                replyingTo: null,
                createdAt: 'just now',
                user: users.currentUser.username
            }

            clonedState.allId.push(newId)

            return clonedState
            
        case 'CREATE_REPLY':
            const targetId = comment?.parentId || action.payload.id
            const targetComment = clonedState.byId[targetId]
            
            clonedState.byId[action.payload.newId] = {
                content: action.payload.content,
                score: 0,
                replies: null,
                id: action.payload.newId,
                parentId: targetId,
                replyingTo: action.payload.username,
                createdAt: 'just now',
                user: users.currentUser.username
            }

            // prevents adding a reply to reply and instead looks up the parentComment and adds it to parentComment's replies array of references.
            targetComment.replies && targetComment.replies.push(action.payload.newId)
            clonedState.allId.push(action.payload.newId)

            return clonedState

        case 'EDIT_COMMENT':
            comment.content = action.payload.content
            return clonedState

        case 'DELETE_COMMENT': {
            const {[action.payload.id]: comment, ...rest} = clonedState.byId
            clonedState.allId = clonedState.allId.filter(id => id !== comment.id)
            clonedState.byId = rest
            return clonedState
        }

        case 'INCREMENT_SCORE': {
            clonedState.byId[action.payload.id] = {
                ...comment,
                score: comment.score == action.payload.currentScore ? comment.score + 1 : action.payload.currentScore
            }

            return clonedState
        }

        case 'DECREMENT_SCORE': {
            clonedState.byId[action.payload.id] = {
                ...comment,
                score: comment.score === action.payload.currentScore ? comment.score - 1 : action.payload.currentScore
            }

            return clonedState
        }

        default:
            return state
    }
  }