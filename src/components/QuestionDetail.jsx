import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
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

export default QuestionDetail
