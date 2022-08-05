import React, { Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from './Button'

function CardForm({ cardData, setCardData, handleSubmit }) {
  const { deckId } = useParams()
  const history = useHistory()

  const handleChange = ({ target }) => {
    setCardData({
      ...cardData,
      [target.name]: target.value,
    })
  }

  const renderView = (
    <Fragment>
      <form onSubmit={handleSubmit} className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          rows="3"
          onChange={handleChange}
          value={cardData.front}
        />
        <label htmlFor="backText">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          onChange={handleChange}
          value={cardData.back}
        />
        <Button
          onClick={() => {
            return history.push(`/decks/${deckId}`)
          }}
        >
          Done
        </Button>
        <Button type="submit">Save</Button>
      </form>
    </Fragment>
  )
  return renderView
}
export default CardForm
