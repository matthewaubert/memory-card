import { useEffect, useRef } from 'react';
import '../styles/Card.css';

// React component for each card
// input: Pokemon obj instance, click event handler, gameOver state, setTimeout delay in ms
export default function Card({
  data: { name, types, imageUrl },
  handleSelection,
  gameOver,
  delay,
}) {
  const cardRef = useRef(); // ref '.card' wrapper

  // on re-render: flip card, wait delay ms, flip card again
  useEffect(() => {
    function flipCard() {
      if (cardRef.current && !gameOver) {
        cardRef.current.classList.toggle('flip');
        console.log('flipped!');
      }
    }
    flipCard();
    setTimeout(flipCard, delay);
  });

  return (
    <div ref={cardRef} className="card" onClick={() => handleSelection(name)}>
      <div className="card-inner">
        <div
          className="card-front"
          // set backgroundColor to CSS variable name of first type
          style={{ backgroundColor: `var(--${types[0]})` }}
        >
          <img src={imageUrl}></img>
          <h3 className="name">{name}</h3>
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
}
