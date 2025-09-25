import { createContext } from "react"
<<<<<<< HEAD
import { useComments } from "./hooks"
=======
import { useComments, CreateComment, CreateReply, EditComment, DeleteComment, UpdateScore } from "./hooks"
>>>>>>> frontend

export type Comment = {
    parentId: string | null
    id: string
    content: string
<<<<<<< HEAD
    user: string
=======
    userId: string
>>>>>>> frontend
    score: number
    replyingTo: string | null
    replies: string[] | null
    createdAt: string
}

export type CommentId = Comment['id']

<<<<<<< HEAD
export type CreateComment = (content: Comment['content']) => void
export type CreateReply = (commentId: CommentId, username: Comment['user'], content: Comment['content']) => void
export type EditComment = (commentId: CommentId, content: string) => void
export type DeleteComment = (commentId: CommentId) => void
export type UpdateScore = (commentId: CommentId, currentScore: number) => void

=======
>>>>>>> frontend
export const StateContext = createContext<{
    comments: {
        byId: Record<CommentId, Comment>
        allId: CommentId[]
    },
    actions: {
        commentCreated: CreateComment,
        replyCreated: CreateReply,
        commentEdited: EditComment,
        commentDeleted: DeleteComment,
        scoreIncremented: UpdateScore,
        scoreDecremented: UpdateScore
    }
}>({
    comments: {
        byId: {},
        allId: []
    },
    actions: {
        commentCreated: () => {},
        replyCreated: () => {},
        commentEdited: () => {},
        commentDeleted: () => {},
        scoreIncremented: () => {},
        scoreDecremented: () => {}
    }
})

function StateProvider({
    children
}: {
    children: React.ReactNode
}) {
    const {comments, actions} = useComments()
<<<<<<< HEAD
    console.log(comments)
=======
>>>>>>> frontend

    return (
        <StateContext.Provider value={{comments, actions}}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider