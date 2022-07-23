import React, { useEffect, useState,Fragment } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";
import { Button } from "./Button";

function CardForm({ initialCardData, setLoading }) {
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const [cardData, setCardData] = useState(initialCardData);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setCardData({
      ...cardData,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      if (cardData.id) {
        setLoading(true);
        await updateCard(cardData, abortController.signal);
        setLoading(false);
        history.push(`/decks/${deckId}`);
      } else {
        setLoading(true);
        await createCard(deckId, cardData, abortController.signal);
        setCardData(initialCardData);
        setLoading(false);
        history.push(`/decks/${deckId}`);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("CardForm Aborted");
      } else {
        throw error;
      }
    }
    return () => abortController.abort();
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
            return history.push(`/decks/${deckId}`);
          }}
        >
          Done
        </Button>
        <Button type="submit">Save</Button>
      </form>
    </Fragment>
  );
  return renderView;
}
export default CardForm;