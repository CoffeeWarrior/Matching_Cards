import React, { useEffect, useState } from "react";
import { Card, CardState } from "./Card/Card";
import { cardVisualStates } from "./cardVisiualStates";

function App() {
  const [thinking, setThinking] = useState<boolean>(false);
  const [cards, setCards] = useState<CardState[]>(
    new Array(8).fill(0).map((val: any, i: number) => {
      return {
        cardVisualState: cardVisualStates.unflipped,
        cardValue: i % 4,
      };
    })
  );

  const shuffleCards = () => {
    const currCards = [...cards];
    cards.sort((a, b) => Math.ceil(Math.random() * -2));
    setCards(currCards);
  };

  useEffect(() => {
    //randomize card order, export to function
    shuffleCards();
  }, []);

  useEffect(() => {
    let allCardsFound = true;
    cards.map((card: CardState) => {
      allCardsFound =
        card.cardVisualState === cardVisualStates.found && allCardsFound;
    });

    if (allCardsFound) {
      alert("congrats, you found all the cards, hit ok to play again!");
      window.location.reload();
    }
  }, [cards]);

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
      setTimeout(() => {
        setCards(result);
      }, 2000);
    }
  }, [cards]);

  const updateCards = (cardPosition: number) => {
    if (!thinking) {
      if (cards[cardPosition].cardVisualState === cardVisualStates.found) {
        return;
      }
      const currCards = [...cards];
      currCards[cardPosition].cardVisualState = cardVisualStates.flipped;
      setThinking(true);
      setCards(currCards);
      setTimeout(() => setThinking(false), 2000);
    }
  };

  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <h1>Card matching game</h1>
      <p>flip the cards to match the numbers</p>
      <p>
        note from the creator: There is a delay between each choice. This is
        intentional, as the project requirements stated that there should be a
        delay while comparing. adding a delay between each choice was easier &
        satisfies the project requirement
      </p>
      <div
        style={{ display: "flex", gap: "10px", width: "100%", height: "20vh" }}
      >
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
    </div>
  );
}

export default App;
