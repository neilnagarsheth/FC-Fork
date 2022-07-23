import React, { useEffect,Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { readCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard({ setLoading, loading }) {
  const { cardId, deckId } = useParams();
  const [initialEditCardData, setCardData] = useState();

  useEffect(() => {
    function loadEditCardData() {
      const abortController = new AbortController();
      try {
        readCard(cardId, abortController.signal).then((currentCard) => {
           setCardData(currentCard);
        });  
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadEditCardData Aborted");
        } else {
          throw error;
        }
      }
      return () => abortController.abort();
    }
    loadEditCardData();
  }, []);

  const renderView = (
    <div>
      <h2>Edit Card</h2>
      <CardForm initialCardData={initialEditCardData} setLoading={setLoading} />
    </div>
  );
  if (loading || !initialEditCardData) {
    return <p>Edit Card Loading...</p>;
  } else {
    return <Fragment>{renderView}</Fragment>;
  }
}

export default EditCard;