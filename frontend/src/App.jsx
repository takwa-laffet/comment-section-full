import { createContext } from 'react'
import CommentList from './components/CommentList'

export const StateContext = createContext()

function App() {
  return (
    <div className="App">
      <CommentList />
    </div>
  )
}

export default App