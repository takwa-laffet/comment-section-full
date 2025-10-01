import { useEffect, useState } from "react"

function SignIn() {
  const [loggedStatus, setLoggedStatus] = useState({
    loggedIn: false,
    message: ''
  })

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault()

    const formElem = e.currentTarget as HTMLFormElement
    const formData = new FormData(formElem)

    try {
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password')
        })
      })
      .then(async res => {
        const data = await res.json()
        setLoggedStatus({ loggedIn: true, message: data.message})
      })
    } catch (e) {
      console.error(e)
    }
  }

  if (loggedStatus.loggedIn)
    return (
      <p>{loggedStatus.message}</p>
    )

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