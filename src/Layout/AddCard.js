import React, { useState, Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import CardForm from './CardForm'
import { createCard } from '../utils/api'

function AddCard({ currentDeck, setLoading, loading }) {
  const { deckId } = useParams()
  const history = useHistory()
  const initialState = {
    deckId,
    front: '',
    back: '',
  }
  const [cardData, setCardData] = useState(initialState)
  const { name } = currentDeck

  async function handleSubmit(event) {
    event.preventDefault()
    const abortController = new AbortController()

    try {
      setLoading(true)
      await createCard(deckId, cardData, abortController.signal)
      setCardData(initialState)
      setLoading(false)
      history.push(`/decks/${deckId}`)
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('CardForm Aborted')
      } else {
        throw error
      }
    }
    return () => abortController.abort()
  }

  const renderView = (
    <div>
      <h2>Add Card</h2>
      <h3>Deck: {name}</h3>
      <CardForm
        cardData={cardData}
        setCardData={setCardData}
        handleSubmit={handleSubmit}
      />
    </div>
  )
  if (loading) {
    return <p>Add Card Loading...</p>
  } else {
    return <Fragment>{renderView}</Fragment>
  }
}

export default AddCard
