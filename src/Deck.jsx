import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card.jsx";
import "./Deck.css";
let url = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
  const deck_id = useRef();
  const [remaining, setRemaining] = useState(null);
  const [cards, setCards] = useState([]);
  //   const timerId = useRef();
  //   const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    async function loadDeck() {
      const res = await axios.get(`${url}/new/shuffle`);
      deck_id.current = res.data.deck_id;
      setRemaining(res.data.remaining);
      setCards([]);
    }
    loadDeck();
    // return () => {
    //   clearInterval(timerId.current);
    // };
  }, []);

  const addCards = async () => {
    if (remaining) {
      const res = await axios.get(`${url}/${deck_id.current}/draw/?count=1`);
      setRemaining(res.data.remaining);
      const newCards = [res.data.cards[0], ...cards];
      setCards(newCards);
    } else {
      alert("NO CARDS LEFT");
    }
  };

  //   const startDrawing = () => {
  //     setDrawing(true);
  //     // console.log(deck_id);

  //     timerId.current = setInterval(async () => {
  //       if (remaining) {
  //         const res = await axios.get(`${url}/${deck_id.current}/draw/?count=1`);
  //         console.log(res.data.cards[0]);

  //         // setRemaining(res.data.remaining);
  //         setRemaining((remaining) => remaining - 1);
  //         const newCards = [res.data.cards[0], ...cards];
  //         console.log(newCards);
  //         setCards(newCards);
  //         console.log(remaining);
  //         console.log(cards);
  //       } else {
  //         setDrawing(false);
  //         clearInterval(timerId.current);
  //       }
  //     }, 100);
  //   };

  //   const stopDrawing = () => {
  //     setDrawing(false);
  //     clearInterval(timerId.current);
  //   };

  const shuffleDeck = async () => {
    const res = await axios.get(`${url}/${deck_id.current}/shuffle/`);
    setCards([]);
    setRemaining(res.data.remaining);
  };

  return (
    <div className="deck-div">
      <div className="back-of-deck">
        {remaining ? (
          <img src="https://deckofcardsapi.com/static/img/back.png" />
        ) : (
          ""
        )}
      </div>

      {remaining ? (
        <button className="btn" onClick={addCards}>
          Draw a Card
        </button>
      ) : (
        ""
      )}

      {/*Further Study*/}
      {/* <button className="btn" onClick={!drawing ? startDrawing : stopDrawing}>
        {!drawing ? "Start Drawing" : "Stop Drawing"}
      </button> */}

      {!remaining ? (
        <button className="btn" onClick={shuffleDeck}>
          Shuffle Deck
        </button>
      ) : (
        ""
      )}

      <p>Cards Left: {remaining}</p>

      <div className="drawn-cards-div">
        {cards.map((c) => {
          return <Card img={c.image} type={c.code} key={c.code} />;
        })}
      </div>
    </div>
  );
};

export default Deck;
