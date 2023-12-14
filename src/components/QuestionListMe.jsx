import { useState, useEffect } from 'react'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
const QuestionListMe = ({ username }) => {
  const [questions, setQuestions] = useState([])
  const token = useOutletContext()
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
  }, [])
  return (
    <div>
      <h2>Questions by {username}</h2>
      {questions.map((question) => {
        return (
          <div key={question.id}>
            <h3>{question.title}</h3>
            {!question.answered && <a href="#">Edit</a>}
            <a href="#">Delete</a>
          </div>
        )
      })}
    </div>
  )
}

export default QuestionListMe
