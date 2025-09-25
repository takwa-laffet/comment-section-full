import users from './data/users.json'
import { Comment, CommentId } from './context'
<<<<<<< HEAD
=======
import { State } from './hooks'
import { Draft } from 'immer'
>>>>>>> frontend

interface CreateCommentPayload extends Pick<Comment, 'content'> {
    newId: string
}

interface CreateReplyPayload extends CreateCommentPayload {
    id: CommentId
    username: string
}

interface EditCommentPayload extends Pick<Comment, 'content'> {}
interface DeleteCommentPayload extends Pick<Comment, 'id'> {}

interface UpdateScorePayload {
    id: CommentId
    currentScore: number
}

<<<<<<< HEAD
type State = {
    byId: Record<CommentId, Comment>
    allId: CommentId[]
}

export function reducer(state: State, action: {
    type: string
    payload: any
}) {
    const clonedState = structuredClone(state)
    const comment = clonedState.byId[action.payload.id]
=======
export function reducer(draft: Draft<State>, action: {
    type: string
    payload: any
}) {
    const comment = draft.byId[action.payload.id]
>>>>>>> frontend

    switch (action.type) {
        case 'CREATE_COMMENT': {
            const payload = action.payload as CreateCommentPayload
            const newId = payload.newId

<<<<<<< HEAD
            clonedState.byId[newId] = {
=======
            draft.byId[newId] = {
>>>>>>> frontend
                content: payload.content,
                score: 0,
                replies: [],
                id: newId,
                parentId: null,
                replyingTo: null,
                createdAt: 'just now',
                user: users.currentUser.username
            }

<<<<<<< HEAD
            clonedState.allId.push(newId)

            return clonedState
=======
            draft.allId.push(newId)

            break
>>>>>>> frontend
        }
            
        case 'CREATE_REPLY': {
            const payload = action.payload as CreateReplyPayload
            const targetId = comment?.parentId || payload.id
<<<<<<< HEAD
            const targetComment = clonedState.byId[targetId]
            
            clonedState.byId[payload.newId] = {
=======
            const targetComment = draft.byId[targetId]
            
            draft.byId[payload.newId] = {
>>>>>>> frontend
                content: payload.content,
                score: 0,
                replies: null,
                id: payload.newId,
                parentId: targetId,
                replyingTo: payload.username,
                createdAt: 'just now',
                user: users.currentUser.username
            }

            // prevents adding a reply to reply and instead looks up the parentComment and adds it to parentComment's replies array of references.
            targetComment.replies && targetComment.replies.push(payload.newId)
<<<<<<< HEAD
            clonedState.allId.push(payload.newId)

            return clonedState
=======
            draft.allId.push(payload.newId)

            break
>>>>>>> frontend
        }

        case 'EDIT_COMMENT': {
            const payload = action.payload as EditCommentPayload
            comment.content = payload.content
<<<<<<< HEAD
            return clonedState
=======
            break
>>>>>>> frontend
        }

        case 'DELETE_COMMENT': {
            const payload = action.payload as DeleteCommentPayload
<<<<<<< HEAD
            const {[payload.id]: comment, ...rest} = clonedState.byId
            clonedState.allId = clonedState.allId.filter(id => id !== comment.id)
            clonedState.byId = rest
            return clonedState
=======
            const {[payload.id]: comment, ...rest} = draft.byId
            draft.allId = draft.allId.filter(id => id !== comment.id)
            draft.byId = rest
            break
>>>>>>> frontend
        }

        case 'INCREMENT_SCORE': {
            const payload = action.payload as UpdateScorePayload
            comment.score = comment.score === payload.currentScore ? comment.score + 1 : comment.score < payload.currentScore ? comment.score + 2 : payload.currentScore
<<<<<<< HEAD
            return clonedState
=======
            break
>>>>>>> frontend
        }

        case 'DECREMENT_SCORE': {
            const payload = action.payload as UpdateScorePayload
            comment.score = comment.score === payload.currentScore ? comment.score - 1 : comment.score > payload.currentScore ? comment.score - 2 : payload.currentScore
<<<<<<< HEAD
            return clonedState
        }

        default:
            return state
=======
            break
        }

        default:
            break
>>>>>>> frontend
    }
  }