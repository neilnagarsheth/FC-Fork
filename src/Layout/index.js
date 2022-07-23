import React,  { useState,Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Deck from "./Deck";
import NotFound from "./NotFound";
import Breadcrumb from "./Breadcrumb";
import Home from "./Home";
import CreateDeck from "./CreateDeck";



function Layout() {

  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home setLoading={setLoading} loading={loading} />
          </Route>
          <Route path="/decks/new">
            <Breadcrumb crumbs={["Home", "Create Deck"]} loading={loading} />
            <CreateDeck setLoading={setLoading} loading={loading} />
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
  );
}

export default Layout;
