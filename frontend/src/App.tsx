import CommentSection from './components/CommentSection'
import SignUp from './components/SignUp'
import StateProvider from './context'

function App() {
  return (
    <div className="App">
      <StateProvider>
        <SignUp />
      </StateProvider>
    </div>
  )
}

export default App