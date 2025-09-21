import * as React from 'react'
import users from '../data/users.json'

const CurrentUserAvatar = () => {
    const currentUser = users.currentUser

    return (
        <div className="current-user">
            <div className="user-img">
                <img src={currentUser.image.png} alt="" />
            </div>
        </div>
    )
}

function FormComponent({
    value,
    placeholderValue,
    onSubmitUpdate
}) {
    const textAreaRef = React.useRef(null)
    
    const handleSubmit = e => {
        e.preventDefault()
        
        const formElement = e.target
        const formData = new FormData(formElement)

        const content = formData.get('comment')

        if (content) onSubmitUpdate(content)

        formElement.reset()
    }

    React.useEffect(() => {
        const textAreaElement = textAreaRef.current
        textAreaElement?.focus()
    }, [])

    return (
        <div className="form-component">
            <CurrentUserAvatar />

            <form action="#" onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" defaultValue={value || ''} placeholder={placeholderValue} ref={textAreaRef}></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default FormComponent