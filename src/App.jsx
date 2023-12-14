import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import Login from './components/Login'
import useLocalStorageState from 'use-local-storage-state'
import { Route, Routes, useParams } from 'react-router-dom'

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
        <Route path="questions/:id" element={<QuestionDetail />} />
        <Route
          path="questions/me"
          element={token ? <QuestionsMyList token={token} /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
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
  const [question, setQuestion] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`https://qb.fly.dev/questions/${id}`)
      .then((res) => setQuestion(res.data))
  }, [id])
  return (
    <>
      <h1> Question Detail page</h1>
      {question && (
        <>
          <h2>{question.title}</h2>
          <p>{question.body}</p>
          {question.answers &&
            question.answers.map((answer) => (
              <div
                className="answer"
                style={{ border: '1px solid silver', padding: '1rem' }}
                key={answer.id}
              >
                <p>{answer.text}</p>
                <p style={{ fontWeight: 'bold' }}>{answer.author.username}</p>
              </div>
            ))}
        </>
      )}
    </>
  )
}
export default App
