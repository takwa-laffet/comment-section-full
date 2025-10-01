import CommentSection from './components/CommentSection'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import StateProvider from './context'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <StateProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={<CommentSection />} />
          <Route path='/auth/login' element={<SignIn />} />
          <Route path='/auth/signup' element={<SignUp />} />
        </Routes>
      </div>
    </StateProvider>
  )
}

export default App