import users from '../data/users.json'
import { useContext } from 'react'
import { StateContext } from '../context'

export const UserProfile = ({ username }) => {
  const user = users.byUsername[username] || users.currentUser

  return (
    <div className="user-profile">
      <div className="user-avatar">
        <img src={user.image.png} alt="" />
      </div>

      <h3>{user.username}</h3>
    </div>
  )
}

function UserActions({
  username,
  toggleReplyForm,
  toggleEditForm,
  toggleDeleteModal
}) {
  const {actions} = useContext(StateContext)
  // mimicks user authentication for now
  const isCurrentUser = users.currentUser.username === username

  const handleToggleReplyFormClick = () =>
    toggleReplyForm()

  const handleToggleEditFormClick = () =>
    toggleEditForm()

  const handleToggleDeleteModalClick = () =>
    toggleDeleteModal()

  return (
    <div className="actions">
      {!isCurrentUser && (
        <button onClick={handleToggleReplyFormClick}>
          <div className="icon-img">
            <img src="/images/icon-reply.svg" alt="" />
          </div>

          Reply
        </button>
      )}

      {isCurrentUser && (
        <button onClick={handleToggleEditFormClick}>
            <div className="icon-img">
              <img src="/images/icon-edit.svg" alt="" />
            </div>

            Edit
        </button>
      )}

      {isCurrentUser && (
        <button onClick={handleToggleDeleteModalClick}>
            <div className="icon-img">
              <img src="/images/icon-delete.svg" alt="" />
            </div>

            Delete
        </button>
      )}
    </div>
  )
}

export default UserActions