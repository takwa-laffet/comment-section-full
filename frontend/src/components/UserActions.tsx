import data from '../data/users.json'

export type User = {
  image: {
    png: string
    webp: string
  }
  username: string
  id: string
}

export const users = data as unknown as {
  currentUser: User
  byId: Record<string, User>
  allId: string[]
}

export const selectUserById = (userId: User['id']) =>
  users.byId[userId] || users.currentUser

export const UserProfile = ({
  userId
}: {
  userId: string
}) => {
  const user = selectUserById(userId)
  const isCurrentUser = users.currentUser['id'] === userId

  return (
    <div className="user-profile">
      <div className="user-avatar">
        <img src={user.image.png} alt="" />
      </div>

      <h3 className={isCurrentUser ? 'current-user' : ''}>{user.username}</h3>
    </div>
  )
}

function UserActions({
  userId,
  updateFormStatus,
  showDeleteModal
}: {
  userId: string
  updateFormStatus: (status: 'replying' | 'editing') => void
  showDeleteModal: () => void
}) {
  const user = selectUserById(userId)
  // mimicks user authentication for now
  const isCurrentUser = users.currentUser.id === user?.id

  const handleReplyClick = () =>
    updateFormStatus('replying')

  const handleEditClick = () =>
    updateFormStatus('editing')

  const handleDeleteClick = () =>
    showDeleteModal()

  return (
    <div className="actions">
      {!isCurrentUser && (
        <button onClick={handleReplyClick}>
          <div className="icon-img">
            <img src="/images/icon-reply.svg" alt="" />
          </div>

          Reply
        </button>
      )}

      {isCurrentUser && (
        <button onClick={handleEditClick}>
            <div className="icon-img">
              <img src="/images/icon-edit.svg" alt="" />
            </div>

            Edit
        </button>
      )}

      {isCurrentUser && (
        <button onClick={handleDeleteClick}>
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