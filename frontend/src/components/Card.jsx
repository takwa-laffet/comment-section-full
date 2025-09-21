import { useContext } from "react"
import { StateContext } from "../context"
import { useRef } from "react"
import UserProfile, { UserActions } from "./UserProfile"

const ScoreComponent = ({ score, itemId }) => {
  const {actions} = useContext(StateContext)
  const currentScoreRef = useRef(score)

  const handleIncrementScoreClick = () =>
    actions.scoreIncremented(itemId, currentScoreRef.current)

  const handleDecrementScoreDispatch = () =>
    actions.scoreDecremented(itemId, currentScoreRef.current)

  return (
    <div className="score-component">
      <button onClick={handleIncrementScoreClick}>
        <div className="icon-img">
          <img src="/images/icon-plus.svg" alt="" />
        </div>
      </button>

      <span>{score}</span>

      <button onClick={handleDecrementScoreDispatch}>
        <div className="icon-img">
          <img src="/images/icon-minus.svg" alt="" />
        </div>
      </button>
    </div>
  )
}

// This component extracts presentational logic which keeps both comments and replies visually consistent without needing to know about their differences.
const Card = ({
  item
}) => {
  return (
    <div className="card">
      <ScoreComponent
        score={item.score}
        itemId={item.id}
      />

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