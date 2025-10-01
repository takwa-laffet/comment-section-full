import { useContext, useEffect } from "react";
import CommentList from "./CommentList";
import FormComponent from "./FormComponent";
import { StateContext } from "../context";
import { useNavigate } from "react-router-dom";

function CommentSection() {
    const {actions} = useContext(StateContext)
    const navigate = useNavigate()

    const handleLogoutClick = () => {
        const logOut = async () => {
            try {
                const res = await fetch('http://localhost:3000/auth/logout', {
                    method: 'POST'
                })

                if (res.ok) {
                    localStorage.removeItem('token')
                    navigate('/auth/login')
                }
            } catch (err) {
                console.error(err)
            }
        }

        logOut()
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