import '../styles/GameOver.css';

export default function GameOver({ score, numCards, startGame }) {
  return (
    <div className="game-over">
      <h2>
        You got {score === numCards ? 'all' : `${score} / ${numCards}`} cards!
      </h2>
      <button onClick={startGame}>Play again</button>
    </div>
  );
}
