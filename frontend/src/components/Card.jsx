import { useContext } from "react"
import { StateContext } from "../App"
import { useRef } from "react"
import users from '../data/users.json'

const UserActions = ({
  commentId,
  username
}) => {
  const {dispatch} = useContext(StateContext)
  // mimicks user authentication for now
  const isCurrentUser = username === 'juliusomo'

  const handleReplyDispatch = () =>
    // accesses the object directly so you could find the parent comment through the 'parentId' property
    dispatch({
      type: 'CREATE_REPLY',
      payload: {
        id: commentId,
        username
      }
    })

  return (
    <div className="actions">
      {!isCurrentUser && (
        <button onClick={handleReplyDispatch}>
          <div className="icon-img">
            <img src="/images/icon-reply.svg" alt="" />
          </div>

          Reply
        </button>
      )}

      <button>
        <div className="icon-img">
          <img src="/images/icon-edit.svg" alt="" />
        </div>

        Edit
      </button>

      <button>
        <div className="icon-img">
          <img src="/images/icon-delete.svg" alt="" />
        </div>

        Delete
      </button>
    </div>
  )
}

const UserProfile = ({ username }) => {
  const user = users.byUsername[username]
  console.log(user)

  return (
    <div className="user-profile">
      <div className="user-avatar">
        <img src={user.image.png} alt="" />
      </div>

      <h3>{user.username}</h3>
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
          <UserProfile username={item.user} />
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