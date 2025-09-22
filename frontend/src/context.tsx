import { createContext } from "react"
import { useComments } from "./hooks"

export type Comment = {
    parentId: string | null
    id: string
    content: string
    user: string
    score: number
    replyingTo: string | null
    replies: string[] | null
    createdAt: string
}

export type CreateComment = (content: string) => void
export type CreateReply = (commentId: string, username: string, content: string) => void
export type EditComment = (commentId: string, content: string) => void
export type DeleteComment = (commentId: string) => void
export type UpdateScore = (commentId: string, currentScore: number) => void

export const StateContext = createContext<{
    comments: {
        byId: Record<string, Comment>
        allId: string[]
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
    console.log(comments)

    return (
        <StateContext.Provider value={{comments, actions}}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider