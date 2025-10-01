import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

function SignIn() {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault()

    const formElem = e.currentTarget as HTMLFormElement
    const formData = new FormData(formElem)

    const loginRequest = async () => {
      try {
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: formData.get('email'),
              password: formData.get('password')
            })
          })

        const data = await res.json()

        if (res.ok) {
          localStorage.setItem('token', data.token)
          navigate('/')
        } else {
          setErrorMessage(data.message)
        }
      } catch (e) {
        console.error(e)
      }
    }

    loginRequest()
  }

  if (localStorage.getItem('token'))
    return <Navigate to='/' replace />

  return (
    <div className="container">
      {errorMessage && (<p>{errorMessage}</p>)}

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