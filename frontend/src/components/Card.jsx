import { useContext } from "react"
import { StateContext } from "../App"

// This component extracts presentational logic which keeps both comments and replies visually consistent without needing to know about their differences.
const Card = ({
  item
}) => {
  const {dispatch} = useContext(StateContext)

  const handleReplyDispatch = () => {
    // accesses the object directly so you could find the parent comment through the 'parentId' property
    dispatch({
      type: 'CREATE_REPLY',
      id: item.id
    })
  }

  const handleEditDispatch = () => {
    // defines the edit method here so you can modify the object directly
    console.log('This triggers the edit functionality')
  }

  const handleIncrementScoreDispatch = () => {
    dispatch({
      type: 'INCREMENT_SCORE',
      id: item.id
    })
  }

  return (
    <div className="card">
      <div className="score-component">
        <button onClick={handleIncrementScoreDispatch}>
          <div className="icon-img">
            <img src="/images/icon-plus.svg" alt="" />
          </div>
        </button>

        <span>{item.score}</span>

        <button>
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