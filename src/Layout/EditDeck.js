import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Button } from "./Button";
import { updateDeck } from "../utils/api/index";


function EditDeck({ setCurrentDeck, currentDeck, setLoading, loading }) {
  const { deckId } = useParams();

  const { name, description } = currentDeck;
  const history = useHistory();
  const [editDeckData, setEditDeckData] = useState({
    name,
    description,
    id: Number(deckId),
  });

  const handleChange = ({ target }) => {
    let val = target.value;
    setEditDeckData({
      ...editDeckData,
      [target.name]: val,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    setLoading(true);
    await updateDeck(editDeckData, abortController.signal);
    setLoading(false);
    history.push(`/decks/${deckId}`);
    return () => abortController.abort();
  }

  const renderView = (
    <div>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label className="col-form-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={editDeckData.name}
          id="name"
          name="name"
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          onChange={handleChange}
          value={editDeckData.description}
          id="description"
          name="description"
          rows="3"
        />
        <Link to={`/decks/${deckId}`}>
          <Button>Cancel</Button>
        </Link>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
  if (loading) {
    return <p>Edit Deck Loading...</p>;
  } else {
    return <Fragment>{renderView}</Fragment>;
  }
}

export default EditDeck;