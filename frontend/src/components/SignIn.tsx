function SignIn() {
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
      .then(async res => console.log(await res.json()))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="sign-in">
      <form action="#" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input type="text" name='email' id='email' />
        </fieldset>
        
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input type="password" name='password' id='password' />
        </fieldset>

        <button>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn