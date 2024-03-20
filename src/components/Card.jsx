import { useEffect, useRef } from 'react';
import getBackground from '../card-background.js';
import '../styles/Card.css';

// React component for each card
// input: Pokemon obj instance, click event handler, gameOver state, setTimeout delay in ms
export default function Card({
  data: { name, types, imageUrl },
  handleSelection,
  gameOver,
  delay,
}) {
  const cardRef = useRef(null); // ref '.card' div
  const glareRef = useRef(null); // ref '.glare' div

  // on re-render: flip card, wait {delay} ms, flip card again
  useEffect(() => {
    function flipCard() {
      if (cardRef.current && !gameOver) {
        cardRef.current.classList.toggle('flip');
      }
    }
    flipCard();
    setTimeout(flipCard, delay);
  });

  function handleMouseOver() {
    addWillChange(); // hint to browser to optimize changes
  }

  // change Card's CSS transform value based on mouse position,
  // causing it to 3d rotate to pull toward mouse
  function handleMouseMove(e) {
    requestAnimationFrame(() => {
      // set card transform value
      cardRef.current.style.transform = getTransforms(
        e.clientX,
        e.clientY,
        cardRef.current,
      );

      // set glare background and opacity
      const glare = getGlare(e.clientX, e.clientY, glareRef.current);
      glareRef.current.style.background = glare.background;
      glareRef.current.style.opacity = glare.opacity;
    });
  }

  // reset Card CSS transform value to 0deg (default)
  function handleMouseLeave() {
    setTimeout(() => {
      cardRef.current.style.transform = 'rotate(0deg)';
      glareRef.current.style.opacity = 0;
      removeWillChange(); // remove optimization
    }, 10);
  }

  // hint to browser how these elements will change (to optimize)
  function addWillChange() {
    cardRef.current.style.willChange = 'transform';
    glareRef.current.style.willChange = 'opacity';
  }

  // remove hint to browser (to free up resources)
  function removeWillChange() {
    cardRef.current.style.willChange = 'auto';
    glareRef.current.style.willChange = 'auto';
  }

  return (
    <div
      ref={cardRef}
      className="card"
      onClick={() => handleSelection(name)}
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-inner">
        <button
          className="card-front"
          // set backgroundColor to CSS variable name of first type
          style={{ background: getBackground(types) }}
        >
          <img src={imageUrl} alt=""></img>
          <h3 className="name">{name}</h3>
        </button>
        <div className="card-back"></div>
        <div ref={glareRef} className="glare"></div>
      </div>
    </div>
  );
}

// based on given x & y mouse coords and element, calc and return CSS transform value
// e.g. 'perspective(1000px) rotateX(-40.7617deg) rotateY(-33.0273deg)'
function getTransforms(mouseX, mouseY, el) {
  const constraint = 6; // constrain rotation by this factor
  const box = el.getBoundingClientRect();
  // calc rotation in degrees of x and y axes
  const rotateX = (mouseY - box.y - box.height / 2) / constraint;
  const rotateY = -(mouseX - box.x - box.width / 2) / constraint;

  return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// based on given x & y mouse coords and element,
// calc and return obj containing CSS glare background and opacity
// e.g. {
//   background: radial-gradient(circle at 119.406px 225px, #fffa 40px, #0000),
//   opacity: 0.867583,
// }
function getGlare(mouseX, mouseY, el) {
  const box = el.getBoundingClientRect();
  // calc x and y coords of glare radial gradient
  const posX = mouseX - box.x;
  const posY = mouseY - box.y;
  // set opacity to 0 btw top and mid of y axis, range 0 - 1 btw mid and bottom
  const opacity = Math.max(0, (posY / box.height) * 2 - 1);

  return {
    background: `radial-gradient(circle at ${posX}px ${posY}px, #fffa 40px, #0000)`,
    opacity,
  };
}
