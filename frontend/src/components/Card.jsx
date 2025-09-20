import { useContext } from "react"
import { StateContext } from "../App"
import { useRef } from "react"

const UserActions = ({
  commentId,
  username
}) => {
  const {dispatch} = useContext(StateContext)
  console.log(commentId)

  const handleReplyDispatch = () =>
    // accesses the object directly so you could find the parent comment through the 'parentId' property
    dispatch({
      type: 'CREATE_REPLY',
      payload: {
        id: commentId,
        username
      }
    })

  const handleEditDispatch = () => {
    // defines the edit method here so you can modify the object directly
    console.log('This triggers the edit functionality')
  }

  return (
    <div className="actions">
      {/* Passes in the id so we can find what object we are modifying */}
      <button onClick={handleReplyDispatch}>
        <div className="icon-img">
          <img src="/images/icon-reply.svg" alt="" />
        </div>

        Reply
      </button>

      <button onClick={handleEditDispatch}>
        <div className="icon-img">
          <img src="/images/icon-edit.svg" alt="" />
        </div>

        Edit
      </button>
    </div>
  )
}

// This component extracts presentational logic which keeps both comments and replies visually consistent without needing to know about their differences.
const Card = ({
  item
}) => {
  const {dispatch} = useContext(StateContext)
  const currentScoreRef = useRef(item.score)

  const handleIncrementScoreDispatch = () =>
    dispatch({
      type: 'INCREMENT_SCORE',
      payload: {
        id: item.id,
        currentScore: currentScoreRef.current
      }
    })

  const handleDecrementScoreDispatch = () =>
    dispatch({
      type: 'DECREMENT_SCORE',
      payload: {
        id: item.id,
        currentScore: currentScoreRef.current
      }
    })

  return (
    <div className="card">
      <div className="score-component">
        <button onClick={handleIncrementScoreDispatch}>
          <div className="icon-img">
            <img src="/images/icon-plus.svg" alt="" />
          </div>
        </button>

        <span>{item.score}</span>

        <button onClick={handleDecrementScoreDispatch}>
          <div className="icon-img">
            <img src="/images/icon-minus.svg" alt="" />
          </div>
        </button>
      </div>

      <div className="content">
        <div className="profile-header">
          <div className="user-profile">
            <div className="user-avatar">
              <img src={item.user.image.png} alt="" />
            </div>

            <h3>{item.user.username}</h3>
          </div>

          <span className="comment-date">{item.createdAt}</span>

          <UserActions
            commentId={item.id}
            username={item.user.username}
          />
        </div>

        {item.replyingTo ? (
          <p>
            <span className="replying-to">@{item.replyingTo} </span>
            {item.content}
          </p>
        ) : (
          <p>{item.content}</p>
        )}
      </div>
    </div>
  )
}

export default Card