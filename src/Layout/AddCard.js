import React,{Fragment} from "react";
import {  useParams } from "react-router-dom";
import CardForm from "./CardForm";

function AddCard({ currentDeck, setLoading, loading }) {
  const { deckId } = useParams();
  const { name } = currentDeck;
  const initialAddCardData = {
    deckId,
    front: "",
    back: "",
  };
  
  const renderView = (
    <div>
      <h2>Add Card</h2>
      <h3>Deck: {name}</h3>
      <CardForm initialCardData={initialAddCardData} setLoading={setLoading} />
    </div>
  );
  if (loading) {
    return <p>Add Card Loading...</p>;
  } else {
    return <Fragment>{renderView}</Fragment>;
  }
}

export default AddCard;