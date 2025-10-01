import CommentSection from './components/CommentSection'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import StateProvider from './context'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Routes>
          <Route path='/' element={<CommentSection />} />
          <Route path='/auth/login' element={<SignIn />} />
          <Route path='/auth/signup' element={<SignUp />} />
        </Routes>
      </StateProvider>
    </div>
  )
}

export default App