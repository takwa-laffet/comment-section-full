import { useContext } from "react"
import { StateContext } from "../context"
import { useRef } from "react"
import UserProfile, { UserActions } from "./UserProfile"

// This component extracts presentational logic which keeps both comments and replies visually consistent without needing to know about their differences.
const Card = ({
  item
}) => {
  const {scoreIncremented, scoreDecremented} = useContext(StateContext)
  const currentScoreRef = useRef(item.score)

  const handleIncrementScoreClick = () =>
    scoreIncremented(item.id, currentScoreRef.current)

  const handleDecrementScoreDispatch = () =>
    scoreDecremented(item.id, currentScoreRef.current)

  return (
    <div className="card">
      <div className="score-component">
        <button onClick={handleIncrementScoreClick}>
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
            username={item.user}
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