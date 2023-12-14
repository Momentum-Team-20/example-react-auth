import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import Login from './components/Login'
import useLocalStorageState from 'use-local-storage-state'

function App() {
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useLocalStorageState('qbToken', '')
  const [username, setUsername] = useLocalStorageState('qbUsername', '')

  const setAuth = (username, token) => {
    setUsername(username)
    setToken(token)
  }

  useEffect(() => {
    axios.get('https://qb.fly.dev/questions').then((res) => {
      setQuestions(res.data)
    })
  }, [])

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
