import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import Login from './components/Login'

function App() {
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')

  const setAuth = (username, token) => {
    setUsername(username)
    setToken(token)
  }

  useEffect(() => {
    axios
      .get('https://qb.fly.dev/questions/me', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setQuestions(res.data)
      })
  }, [token])

  return (
    <>
      <h1>Questions</h1>
      {token ? (
        <ul>
          {questions.map((question) => {
            return <li key={question.id}>{question.title}</li>
          })}
        </ul>
      ) : (
        <Login setAuth={setAuth} />
      )}
    </>
  )
}

export default App
