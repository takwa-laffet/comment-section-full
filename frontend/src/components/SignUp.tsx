import { FormEventHandler } from "react"

// const handleFileUpload = (file: File) => {
//     const reader = new FileReader()
//     reader.addEventListener('load', () => console.log(reader.result))
//     if (file) reader.readAsDataURL(file)
// }

function SignUp() {
    const handleSubmit: FormEventHandler = e => {
        e.preventDefault()
        const formElem = e.currentTarget as HTMLFormElement
        const formData = new FormData(formElem)

        try {
            fetch('http://localhost:3000/auth/signup', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.get('username'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    avatar: "/images/image-default.png"
                })
            })
            .then(console.log)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="sign-up">
            <form action="#" onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" required />
                </fieldset>

                {/* <fieldset>
                    <label htmlFor="avatar">Avatar:</label>
                    <input type="file" name="avatar" id="avatar" accept=".jpg, .jpeg, .gif, .png, .webp" required />
                </fieldset> */}

                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp