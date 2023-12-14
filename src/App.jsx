import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import Login from './components/Login'
import useLocalStorageState from 'use-local-storage-state'
import { Route, Routes } from 'react-router-dom'

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
      <Routes>
        <Route path="/" element={<h2>Homepage</h2>} />
        <Route
          path="/questions"
          element={<QuestionList questions={questions} />}
        />
        {/* <Route path="questions/:id" element={}> */}
        <Route
          path="questions/mine"
          element={token ? <QuestionUserList token={token} username={username} /> : <Login />}
        />
        <Route path="/login" element={<Login />}
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    </>
  )
}

const QuestionUserList = ({ username, token }) => {
  const [questions, setQuestions] = useState([])

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
      <h2> Questions by {username} </h2>
      <ul>
        {questions.map((question) => {
          return <li key={question.id}>{question.title}</li>
        })}
      </ul>
    </>
  )
}

const QuestionList = ({ questions }) => {
  return (
    <ul>
      {questions.map((question) => {
        return <li key={question.id}>{question.title}</li>
      })}
    </ul>
  )
}

const QuestionDetail = () => {
  return <h1> Question Detail page</h1>
}
export default App
