import { useContext } from "react"
import { StateContext } from "../context"
import Thread from "./Thread"

function CommentList() {
  const {comments} = useContext(StateContext)
  // grabs top level comments only
  const commentIds = comments.allId.filter(id => !comments.byId[id].parentId)

  return (
    <div className="comments-list">
      {commentIds.map(id => {
        const comment = comments.byId[id]

        return (
          <Thread
            comment={comment}
            key={id}
          />
        )
      })}
    </div>
  )
}

export default CommentList