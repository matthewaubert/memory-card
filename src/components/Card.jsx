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
  const cardRef = useRef(null); // ref '.card' wrapper

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

  // change Card's transform value based on mouse position,
  // causing it to 3d rotate to pull toward mouse
  function handleMouseMove(e) {
    requestAnimationFrame(() => {
      console.log('mousemove');
      cardRef.current.style.transform = getTransforms(
        e.clientX,
        e.clientY,
        cardRef.current,
      );
    });
  }

  // based on given x & y mouse coords and element, calculate and return transform value
  // e.g. 'transform: perspective(1000px) rotateX(-40.7617deg) rotateY(-33.0273deg)'
  function getTransforms(x, y, el) {
    const constraint = 2; // constrain rotation by this factor
    const box = el.getBoundingClientRect();
    const rotateX = (y - box.y - box.height / 2) / constraint;
    const rotateY = -(x - box.x - box.width / 2) / constraint;

    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  // reset Card transform value to 0deg (default)
  function handleMouseLeave() {
    setTimeout(() => {
      console.log('mouseleave');
      cardRef.current.style.transform = 'rotate(0deg)';
    }, 10);
  }

  return (
    <div
      ref={cardRef}
      className="card"
      onClick={() => handleSelection(name)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
