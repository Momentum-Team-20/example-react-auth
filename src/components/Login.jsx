import { useState } from 'react'
import axios from 'axios'
const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

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
      .then((res) => setAuth(username, res.data.auth_token))
      .catch((err) => setError(err.response.data.non_field_errors[0]))
  }

  return (
    <>
      {error && <p style={{ color: 'red' }}> {error} </p>}
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
    </>
  )
}

export default Login
