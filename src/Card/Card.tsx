import { cardVisualStates } from "../cardVisiualStates";
import "./Card.css";

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
    <div className="container" onClick={() => callback(cardPosition)}>
      <div
        className={`back ${
          cardVisualState === cardVisualStates.unflipped
            ? "animation"
            : "reverseAnimation"
        }`}
      ></div>
      <div
        className={`front ${
          cardVisualState === cardVisualStates.unflipped
            ? "animation"
            : "reverseAnimation"
        }`}
      >
        {cardValue}
      </div>
    </div>
  );
};
