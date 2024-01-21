import '../styles/modal.css';

// React component for game over modal menu
export default function GameOver({ score, numCards, startGame }) {
  return (
    <div className="overlay">
      <div className="game-over modal">
        <h2>
          You got {score === numCards ? 'all' : `${score} / ${numCards}`} Pokémon!
        </h2>
        <button onClick={startGame}>Play again!</button>
      </div>
    </div>
  );
}
