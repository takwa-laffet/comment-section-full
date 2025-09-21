import { useContext } from "react"
import { StateContext } from "../context"
import { useRef } from "react"
import UserActions, { UserProfile } from "./UserActions"
import FormComponent from "./FormComponent"
import { useState } from "react"

const ScoreComponent = ({ score, commentId }) => {
  const {actions} = useContext(StateContext)
  const currentScoreRef = useRef(score)

  const handleIncrementScoreClick = () =>
    actions.scoreIncremented(commentId, currentScoreRef.current)

  const handleDecrementScoreClick = () =>
    actions.scoreDecremented(commentId, currentScoreRef.current)

  return (
    <div className="score-component">
      <button onClick={handleIncrementScoreClick}>
        <div className="icon-img">
          <img src="/images/icon-plus.svg" alt="" />
        </div>
      </button>

      <span>{score}</span>

      <button onClick={handleDecrementScoreClick}>
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
  const [isHidden, setIsHidden] = useState(false)

  return (
    <div className="container">
      <div className="card">
        <ScoreComponent
          score={item.score}
          commentId={item.id}
        />

        <div className="content">
          <div className="profile-header">
            <UserProfile username={item.user} />
            <span className="comment-date">{item.createdAt}</span>

            <UserActions
              toggleForm={() => setIsHidden(prev => !prev)}
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

      {isHidden && (
        <FormComponent
          placeholderValue='Add comment!'
          onSubmitUpdate={() => {}}
        />
      )}
    </div>
  )
}

export default Card