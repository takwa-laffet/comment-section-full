import { useContext, useState, useRef } from "react"
import { StateContext } from "../context"
import UserActions, { UserProfile } from "./UserActions"
import FormComponent from "./FormComponent"

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
  const {actions} = useContext(StateContext)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isModalHidden, setIsModalHidden] = useState(true)

  if (!item) return

  const handleAddReplyDispatch = content =>
    actions.replyCreated(item.id, item.user, content)

  const handleEditCommentDispatch = content =>
    actions.commentEdited(item.id, content)

  const handleCancelClick = () =>
    setIsModalHidden(true)

  const handleDeleteClick = () =>
    actions.commentDeleted(item.id)

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
              toggleReplyForm={() => setIsReplying(prev => !prev)}
              toggleEditForm={() => setIsEditing(prev => !prev)}
              toggleDeleteModal={() => setIsModalHidden(false)}
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

      {isReplying && (
        <FormComponent
          placeholderValue='Add reply'
          onSubmitUpdate={handleAddReplyDispatch}
        />
      )}

      {isEditing && (
        <FormComponent
          value={item.content}
          onSubmitUpdate={handleEditCommentDispatch}
        />
      )}

      {!isModalHidden && (
        <div className="modal-container">
          <h3>Delete comment</h3>
          <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          
          <div className="buttons">
              <button className="cancel" onClick={handleCancelClick}>No, Cancel</button>
              <button className="confirm" onClick={handleDeleteClick}>Yes, Confirm</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card