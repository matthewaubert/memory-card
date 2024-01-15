import '../styles/Scoreboard.css';

export default function Scoreboard({ score, hiScore }) {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>
      <h2>High Score: {hiScore}</h2>
    </div>
  );
}
