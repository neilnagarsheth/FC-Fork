import React, {Fragment} from "react";
import Card from "./Card";
import NotEnoughCards from "./NotEnoughCards";


function Study({ currentDeck, loading }) {

  const { name, cards } = currentDeck;
  const renderView = (
    <div>
      <h2>Study: {name}</h2>
      <Card currentDeck={currentDeck} loading={loading} />
    </div>
  );
  if (loading) {
    return <p>Study Loading...</p>;
  }
  if (cards.length < 3) {
    return (
      <div>
        <NotEnoughCards cards={cards} />
      </div>
    );
  }
  return <Fragment>{renderView}</Fragment>;
}

export default Study;