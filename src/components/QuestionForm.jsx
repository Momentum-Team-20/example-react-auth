import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useOutletContext } from 'react-router-dom'
const QuestionForm = () => {
  const [questionData, setQuestionData] = useState({})
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const token = useOutletContext()

  const handleInputChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        'https://qb.fly.dev/questions',
        {
          ...questionData,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        navigate('/questions')
      })
      .catch((err) => setError(err.response.data.non_field_errors[0]))
  }

  return (
    <>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}> {error} </p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={questionData.title || ''}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          name="body"
          value={questionData.body || ''}
          onChange={handleInputChange}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default QuestionForm
