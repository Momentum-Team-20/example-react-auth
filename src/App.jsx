import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import Login from './Login'

function App() {
  const [questions, setQuestions] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    axios.get('https://qb.fly.dev/questions').then((res) => {
      setQuestions(res.data)
    })
  }, [])

  return (
    <>
      <h1>Questions</h1>
      {loggedIn ? (
        <ul>
          {questions.map((question) => {
            return <li key={question.id}>{question.title}</li>
          })}
        </ul>
      ) : (
        <Login />
      )}
    </>
  )
}

export default App
