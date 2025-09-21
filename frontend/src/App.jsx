import CommentList from './components/CommentList'
import StateProvider from './context'

function App() {
  return (
    <div className="App">
      <StateProvider>
        <CommentList />
      </StateProvider>
    </div>
  )
}

export default App