import CommentSection from './components/CommentSection'
import StateProvider from './context'
import { v4 as uuidv4 } from 'uuid'

function App() {
  console.log(uuidv4())
  
  return (
    <div className="App">
      <StateProvider>
        <CommentSection />
      </StateProvider>
    </div>
  )
}

export default App