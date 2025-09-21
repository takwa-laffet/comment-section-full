import CommentList from "./CommentList";
import FormComponent from "./FormComponent";

function CommentSection() {
    return (
        <div className="comment-section">
            <CommentList />

            <FormComponent
                placeholderValue="Add a comment..."
                onSubmitUpdate={() => console.log('Create comment!')}
            />
        </div>
    )
}

export default CommentSection