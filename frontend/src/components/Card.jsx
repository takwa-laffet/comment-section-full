import { useContext } from "react"
import { StateContext } from "../App"
import { useRef } from "react"

// This component extracts presentational logic which keeps both comments and replies visually consistent without needing to know about their differences.
const Card = ({
  item
}) => {
  const {dispatch} = useContext(StateContext)
  const currentScoreRef = useRef(item.score)

  const handleReplyDispatch = () =>
    // accesses the object directly so you could find the parent comment through the 'parentId' property
    dispatch({
      type: 'CREATE_REPLY',
      payload: {
        id: item.id,
        username: item.user.username
      }
    })

  const handleEditDispatch = () => {
    // defines the edit method here so you can modify the object directly
    console.log('This triggers the edit functionality')
  }

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

            <h3>{item.username}</h3>
          </div>

          <span className="comment-date">{item.createdAt}</span>

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
        </div>

        {item.replyingTo ? (
          <p>
            <span>@{item.replyingTo} </span>
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