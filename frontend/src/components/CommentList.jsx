import { useReducer, useContext } from "react"
import comments from '../data/comments.json'
import { StateContext } from "../App"
import { reducer } from "../reducer"
import Card from "./Card"

const Comment = ({
  comment
}) => {
  const {state} = useContext(StateContext)

  return (
    <div className="comment">
      <Card item={comment} />

      <div className="replies-list">
        {comment.replies.map(id => (
          <Card
            item={state.byId[id]}
            key={id}
          />
        ))}
      </div>
    </div>
  )
}

function CommentList() {
  const [state, dispatch] = useReducer(reducer, comments)
  const commentIds = state.allId.filter(id => !state.byId[id].parentId)

  return (
    <div className="comments-list">
      <StateContext.Provider value={{state, dispatch}}>
        {commentIds.map(id => (
          <Comment
            comment={state.byId[id]}
            key={id}
          />
        ))}
      </StateContext.Provider>
    </div>
  )
}

export default CommentList