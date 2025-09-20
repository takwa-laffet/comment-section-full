import { useReducer } from 'react'
import comments from './data/comments.json'
import { createContext } from 'react'
import Card from './components/Card'
import { reducer } from './reducer'
import { useContext } from 'react'

export const StateContext = createContext()

const Comment = ({
  comment
}) => {
  const {state} = useContext(StateContext)

  return (
    <div className="comment">
      <Card item={comment} />

      <div className="replies-list">
        {comment.replies.map(id => (
          <Card
            item={state.byId[id]}
            key={id}
          />
        ))}
      </div>
    </div>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, comments)
  const commentIds = state.allId.filter(id => !state.byId[id].parentId)

  return (
    <div className="App">
      <StateContext.Provider value={{state, dispatch}}>
        {commentIds.map(id => (
          <Comment
            comment={state.byId[id]}
            key={id}
          />
        ))}
      </StateContext.Provider>
    </div>
  )
}

export default App