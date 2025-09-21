import { useContext } from "react"
import { StateContext } from "../context"
import Card from "./Card"

const Comment = ({
  comment
}) => {
  const {comments} = useContext(StateContext)

  return (
    <div className="comment">
      <Card item={comment} />

      <div className="replies-list">
        {comment.replies.map(id => (
          <Card
            item={comments.byId[id]}
            key={id}
          />
        ))}
      </div>
    </div>
  )
}

function CommentList() {
  const {comments} = useContext(StateContext)
  const commentIds = comments.allId.filter(id => !comments.byId[id].parentId)

  return (
    <div className="comments-list">
      {commentIds.map(id => (
        <Comment
          comment={comments.byId[id]}
          key={id}
        />
      ))}
    </div>
  )
}

export default CommentList