function SignUp() {
    return (
        <div className="sign-up">
            <form action="#">
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" />
                </fieldset>

                <fieldset>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </fieldset>

                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </fieldset>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp