import CommentSection from './components/CommentSection'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import StateProvider from './context'

function App() {
  return (
    <div className="App">
      <StateProvider>
        <SignIn />
      </StateProvider>
    </div>
  )
}

export default App