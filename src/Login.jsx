import { useState } from 'react'
import axios from 'axios'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitting form')
    console.log(username)
    console.log(password)
    axios
      .post('https://qb.fly.dev/auth/token/login', {
        username: username,
        password: password,
      })
      .then((res) => console.log(res.data))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-controls">
        <label htmlFor="username-field">username</label>
        <input
          id="username-field"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-controls">
        <label htmlFor="password-field">password</label>
        <input
          id="password-field"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-submit">
        <input type="submit" value="Log In" />
      </div>
    </form>
  )
}

export default Login
