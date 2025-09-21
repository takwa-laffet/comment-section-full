import users from './data/users.json'

export function reducer(state, action) {
    const clonedState = structuredClone(state)
    const comment = clonedState.byId[action.payload.id]

    switch (action.type) {
        case 'CREATE_REPLY':
            const targetId = comment.parentId || action.payload.id
            const newId = Math.max.apply(null, state.allId) + 1

            clonedState.byId[newId] = {
                content: 'A new reply!',
                score: 0,
                replies: null,
                id: newId,
                parentId: targetId,
                replyingTo: action.payload.username,
                createdAt: 'just now',
                user: users.currentUser.username
            }

            // prevents adding a reply to reply and instead looks up the parentComment and adds it to parentComment's replies array of references.
            clonedState.byId[targetId].replies.push(newId)
            clonedState.allId.push(newId)

            return clonedState

        case 'EDIT_COMMENT':
            comment.content = action.payload.content
            return clonedState

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