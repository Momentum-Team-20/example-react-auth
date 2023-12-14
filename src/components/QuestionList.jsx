import { useState, useEffect } from 'react'
import axios from 'axios'
const QuestionList = () => {
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    axios.get('https://qb.fly.dev/questions').then((res) => {
      setQuestions(res.data)
    })
  }, [])
  return (
    <ul>
      {questions.map((question) => {
        return <li key={question.id}>{question.title}</li>
      })}
    </ul>
  )
}

export default QuestionList
