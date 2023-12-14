import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import Login from './components/Login'
import QuestionList from './components/QuestionList'
import QuestionDetail from './components/QuestionDetail'
import QuestionForm from './components/QuestionForm'
import useLocalStorageState from 'use-local-storage-state'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const [token, setToken] = useLocalStorageState('qbToken', '')
  const [username, setUsername] = useLocalStorageState('qbUsername', '')

  const setAuth = (username, token) => {
    setUsername(username)
    setToken(token)
  }

  return (
    <>
      <h1>Questions</h1>
      <Routes>
        <Route path="/" element={<h2>Homepage</h2>} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login setAuth={setAuth} />}
        />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/questions/new" element={<QuestionForm token={token} />} />
        <Route
          path="questions/me"
          element={
            token ? (
              <QuestionsMyList token={token} />
            ) : (
              <Login setAuth={setAuth} />
            )
          }
        />
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    </>
  )
}

const QuestionsMyList = ({ username, token }) => {
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




export default App
