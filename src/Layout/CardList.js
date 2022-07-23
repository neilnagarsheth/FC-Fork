import React,{Fragment} from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button, DeleteButton } from "./Button";
import { deleteCard } from "../utils/api/index";

function CardList({ cards, setLoading, loading }) {
  const { url } = useRouteMatch();

  async function deleteHandler(id) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      setLoading(true);
      await deleteCard(id);
      setLoading(false);
    }
  }
  const renderView = cards.map((card) => (
    <div key={card.id}>
      <div className="card border-primary mb-3" >
        <div className="card-body">
          <h4 className="card-text text-danger">Front</h4>
          <p className="card-text">{card.front}</p>
          <br />
          <h4 className="card-text text-danger">Back</h4>
          <p className="card-text">{card.back}</p>
          <Link to={`${url}/cards/${card.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <DeleteButton onClick={() => deleteHandler(card.id)}>
            Delete
          </DeleteButton>
        </div>
      </div>
      <br />
      <br />
    </div>
  ));
  if (loading) {
    return <p>Loading Card List...</p>;
  } else {
    return <Fragment>{renderView}</Fragment>;
  }
}

export default CardList;