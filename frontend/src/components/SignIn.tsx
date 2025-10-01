import { Navigate, useNavigate } from "react-router-dom"

function SignIn() {
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

        if (res.ok) {
          const data = await res.json()
          localStorage.setItem('token', data.token)
          navigate('/')
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
  )
}

export default SignIn