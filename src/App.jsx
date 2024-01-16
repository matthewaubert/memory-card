import { useEffect, useState } from 'react';
import Scoreboard from './components/Scoreboard.jsx';
import Card from './components/Card.jsx';
import GameOver from './components/GameOver.jsx';
import getPokemonDataset from './pokemon-data.js';
import { getRandInts, shuffleArray } from './util.js';
import pokemonLogo from './assets/pokemon-logo.svg';
import './App.css';

const numCards = 12; // number of cards to display
const pokemonNums = [1, 151]; // range of pokemon id nums to fetch (inclusive)

export default function App() {
  const [dataset, setDataset] = useState([]);
  const [selections, setSelections] = useState([]);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playAgain, setPlayAgain] = useState(0); // trigger fetch new pokemon data

  // fetch array of pokemon data and store in state
  useEffect(() => {
    (async () => {
      // get {numCards} random ints btw pokemonNums (inclusive)
      const ids = getRandInts(numCards, pokemonNums[0], pokemonNums[1] + 1);
      const pokemonDataset = await getPokemonDataset(ids);
      console.log(pokemonDataset);
      setDataset(pokemonDataset);
    })();
  }, [playAgain]);

  // reset dataset, selections, score, GameOver;
  // trigger fetch new pokemon data
  function startGame() {
    setDataset([]);
    setSelections([]);
    setScore(0);
    setGameOver(false);
    setPlayAgain(playAgain + 1);
  }

  // handle when user selects Card
  function handleSelection(name) {
    // if game over: do nothing
    if (gameOver) return;

    // if name already in selections: lose
    if (selections.includes(name)) {
      endGame();
      return;
    }

    incrementScore();
    // if player has selected all 12 cards: win
    if (score === numCards - 1) endGame();
    else {
      shuffleCards();
      setSelections([...selections, name]); // add name to selections
    }
  }

  // add 1 to score; check to update hiScore
  function incrementScore() {
    const newScore = score + 1;
    setScore(newScore);
    console.log('score++');
    // if score greater than hiScore, set hiScore to score
    if (newScore > hiScore) setHiScore(newScore);
  }

  // shuffle dataSet array in order to shuffle cards
  function shuffleCards() {
    setDataset(shuffleArray(dataset));
  }

  function endGame() {
    setGameOver(true);
    console.log('Game over!');
  }

  console.log(selections);

  return (
    <>
      {/* StartScreen (conditionally display) */}
      <header>
        <button className="logo">
          <img src={pokemonLogo} alt="Pokemon logo" />
        </button>
        <Scoreboard score={score} hiScore={hiScore} />
      </header>
      <main>
        {/* Cards (one per pokemon in dataset) */}
        {dataset.length > 0 &&
          dataset.map((data) => (
            <Card key={data.id} data={data} handleSelection={handleSelection} />
          ))}
      </main>
      <footer>
        {/* MenuButton (sound) */}
        {/* MenuButton (help) */}
      </footer>
      {gameOver && (
        <GameOver score={score} numCards={numCards} startGame={startGame} />
      )}
    </>
  );
}
