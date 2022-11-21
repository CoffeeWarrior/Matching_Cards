import React, { useEffect, useState } from "react";
import { Card, CardState } from "./Card/Card";
import { cardVisualStates } from "./cardVisiualStates";

function App() {
  const [cards, setCards] = useState<CardState[]>(
    new Array(8).fill(0).map((val: any, i: number) => {
      return {
        cardVisualState: cardVisualStates.unflipped,
        cardValue: i % 4,
      };
    })
  );

  useEffect(() => {
    //randomize card order, export to function
    const currCards = [...cards];
    cards.sort((a, b) => Math.ceil(Math.random() * -2));
    setCards(currCards);
  }, []);

  useEffect(() => {
    const flippedCards = cards.filter(
      (card: CardState) => card.cardVisualState === cardVisualStates.flipped
    );

    if (flippedCards.length === 2) {
      const [cardA, cardB] = flippedCards;
      let result = cards;
      if (cardA.cardValue === cardB.cardValue) {
        //both cardA and cardB should be found
        result = cards.map((card: CardState) => {
          if (card.cardVisualState === cardVisualStates.flipped) {
            card.cardVisualState = cardVisualStates.found;
          }
          return card;
        });
      } else {
        //neither cardA and cardB should be found
        result = cards.map((card: CardState) => {
          if (card.cardVisualState === cardVisualStates.flipped) {
            card.cardVisualState = cardVisualStates.unflipped;
          }
          return card;
        });
      }
      setCards(result);
    }
  }, [cards]);

  const updateCards = (cardPosition: number) => {
    if (cards[cardPosition].cardVisualState === cardVisualStates.found) {
      return;
    }
    const currCards = [...cards];
    currCards[cardPosition].cardVisualState = cardVisualStates.flipped;
    setCards(currCards);
  };

  return (
    <div className="App">
      {cards.map((cardState: CardState, i: number) => {
        return (
          <Card
            {...cardState}
            cardPosition={i}
            callback={(cardPosition: number) => updateCards(cardPosition)}
          />
        );
      })}
    </div>
  );
}

export default App;
