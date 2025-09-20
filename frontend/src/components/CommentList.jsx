import { useReducer, useContext } from "react"
import data from '../data/comments.json'
import { StateContext } from "../App"
import { reducer } from "../reducer"
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
  const [comments, dispatch] = useReducer(reducer, data)
  const commentIds = comments.allId.filter(id => !comments.byId[id].parentId)

  return (
    <div className="comments-list">
      <StateContext.Provider value={{comments, dispatch}}>
        {commentIds.map(id => (
          <Comment
            comment={comments.byId[id]}
            key={id}
          />
        ))}
      </StateContext.Provider>
    </div>
  )
}

export default CommentList