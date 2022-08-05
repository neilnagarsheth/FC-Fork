import React, { useState, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Deck from './Deck'
import NotFound from './NotFound'
import Breadcrumb from './Breadcrumb'
import Home from './Home'
import CreateDeck from './CreateDeck'
import { createDeck } from '../utils/api/index'
import { useHistory } from 'react-router-dom'

const initialState = {
  name: '',
  description: '',
}

function Layout() {
  const history = useHistory()

  const [deckData, setDeckData] = useState(initialState)

  const [loading, setLoading] = useState(false)

  const handleChange = ({ target }) => {
    setDeckData({
      ...deckData,
      [target.name]: target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    const { id } = await createDeck(deckData)
    setDeckData(initialState)
    setLoading(false)
    history.push(`/decks/${id}`)
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home setLoading={setLoading} loading={loading} />
          </Route>
          <Route path="/decks/new">
            <Breadcrumb crumbs={['Home', 'Create Deck']} loading={loading} />
            <CreateDeck
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              deckData={deckData}
            />
          </Route>
          <Route path="/decks/:deckId">
            {/* nested routing continues in Deck component */}
            <Deck setLoading={setLoading} loading={loading} />
          </Route>
          <Route>
            <NotFound loading={loading} />
          </Route>
        </Switch>
      </div>
    </Fragment>
  )
}

export default Layout
