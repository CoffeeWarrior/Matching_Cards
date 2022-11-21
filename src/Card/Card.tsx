import { cardVisualStates } from "../cardVisiualStates";

export type CardProps = CardState & {
  callback: Function;
  cardPosition: number;
};

export type CardState = {
  cardVisualState: cardVisualStates;
  cardValue: number;
};

export const Card: React.FC<CardProps> = ({
  callback,
  cardVisualState,
  cardValue,
  cardPosition,
}) => {
  return (
    <div
      onClick={() => callback(cardPosition)}
      style={{ border: "1px solid black" }}
    >
      <b>Card Position:</b> {cardPosition + " "}
      <b>Card Value:</b> {cardValue + " "} <br />
      {cardVisualState === cardVisualStates.unflipped
        ? "unflipped"
        : cardVisualState === cardVisualStates.flipped
        ? "flipped"
        : "found"}
    </div>
  );
};
