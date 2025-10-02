import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks"

const logUserIn = async (email: string, password: string) => {
  try {
    const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

    return (await res.json()).token
  } catch (e) {
    console.error(e)
  }
}

function SignIn() {
  const [errorMessage, setErrorMessage] = useState('')
  const {storeToken} = useLocalStorage('token')
  const navigate = useNavigate()

  const handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault()

    const formElem = e.currentTarget as HTMLFormElement
    const formData = new FormData(formElem)

    const token = await logUserIn(formData.get('email') as string, formData.get('password') as string)

    if (token) {
      storeToken(token)
      navigate('/', { replace: true })
    } else {
      setErrorMessage('Invalid email or password')
    }
  }

  return (
    <div className="container">
      {errorMessage && (
        <p>{errorMessage}</p>
      )}

      <div className="sign-in">
        <form action="#" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="email">Email:</label>
            <input type="text" name='email' id='email' required />
          </fieldset>
          
          <fieldset>
            <label htmlFor="password">Password:</label>
            <input type="password" name='password' id='password' required />
          </fieldset>

          <button>Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn