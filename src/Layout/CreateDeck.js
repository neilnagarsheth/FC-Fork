import React, { Fragment } from 'react'
import { Button } from './Button'
import { useHistory } from 'react-router-dom'

function CreateDeck({ deckData, handleChange, handleSubmit, loading }) {
  const history = useHistory()

  const renderView = (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label className="col-form-label" htmlFor="deckName">
          Name
        </label>
        <input
          id="deckName"
          type="text"
          name="name"
          onChange={handleChange}
          className="form-control"
          value={deckData.name}
          placeholder="Deck Name"
        />
        <label htmlFor="deckDescription">Description</label>
        <textarea
          id="deckDescription"
          name="description"
          onChange={handleChange}
          className="form-control"
          value={deckData.description}
          rows="3"
          placeholder="Brief description of the deck"
        />
        <Button onClick={() => history.push('/')}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
  if (loading) {
    return <p>Loading Create Deck...</p>
  } else {
    return <Fragment>{renderView}</Fragment>
  }
}

export default CreateDeck
