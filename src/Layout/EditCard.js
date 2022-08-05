import React, { useEffect, Fragment, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { readCard, updateCard } from '../utils/api'
import CardForm from './CardForm'

function EditCard({ setLoading, loading }) {
  const { cardId, deckId } = useParams()
  const [cardData, setCardData] = useState()
  const history = useHistory()

  useEffect(() => {
    async function loadEditCardData() {
      const abortController = new AbortController()
      try {
        const currentCard = await readCard(cardId, abortController.signal)
        setCardData(currentCard)
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('loadEditCardData Aborted')
        } else {
          throw error
        }
      }
      return () => abortController.abort()
    }
    loadEditCardData()
  }, [cardId])

  async function handleSubmit(event) {
    event.preventDefault()
    const abortController = new AbortController()

    try {
      setLoading(true)
      await updateCard(cardData, abortController.signal)
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
      <h2>Edit Card</h2>
      <CardForm
        cardData={cardData}
        setCardData={setCardData}
        handleSubmit={handleSubmit}
      />
    </div>
  )
  if (loading || !cardData) {
    return <p>Edit Card Loading...</p>
  } else {
    return <Fragment>{renderView}</Fragment>
  }
}

export default EditCard
