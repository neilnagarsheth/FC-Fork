import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "./Button";


function NotEnoughCards({ cards }) {
  const { deckId } = useParams();

  return (
    <div>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {cards.length} cards in
        this deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <Button>Add Cards</Button>
      </Link>
    </div>
  );
}

export default NotEnoughCards;