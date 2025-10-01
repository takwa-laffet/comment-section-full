import { useContext, useEffect } from "react";
import CommentList from "./CommentList";
import FormComponent from "./FormComponent";
import { StateContext } from "../context";
import { useNavigate } from "react-router-dom";

const logUserOut = async () => {
    try {
        return await fetch('http://localhost:3000/auth/logout', {
            method: 'POST'
        })
    } catch (err) {
        console.error(err)
    }
}

function CommentSection() {
    const {actions} = useContext(StateContext)
    const navigate = useNavigate()

    const handleLogoutClick = async () => {
        const res = await logUserOut()
        
        if (res?.ok) {
            localStorage.removeItem('token')
            navigate('/auth/login')
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/auth/login')
    }, [])

    return (
        <div className="comment-section">
            <button onClick={handleLogoutClick}>Log out</button>
            <CommentList />

            <FormComponent
                value=""
                placeholderValue="Add a comment..."
                onSubmitUpdate={content => actions.commentCreated(content)}
            />
        </div>
    )
}

export default CommentSection