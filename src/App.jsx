import { useEffect, useState } from 'react';
import Scoreboard from './components/Scoreboard.jsx';
import Card from './components/Card.jsx';
import getPokemonDataset from './pokemon-data.js';
import { getRandInts, shuffleArray } from './util.js';
import pokemonLogo from './assets/pokemon-logo.svg';
import './App.css';

// get 12 random ints btw 1 and 151 (inclusive)
const numCards = 12;
const ids = getRandInts(numCards, 1, 152);

export default function App() {
  const [dataset, setDataset] = useState([]);
  const [selections, setSelections] = useState([]);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);

  // fetch array of pokemon data and store in state
  useEffect(() => {
    (async () => {
      const pokemonDataset = await getPokemonDataset(ids);
      console.log(pokemonDataset);
      setDataset(pokemonDataset);
    })();
  }, []);

  // clear selections array
  function startGame() {
    setSelections([]);
  }

  // handle when user selects Card
  function handleSelection(name) {
    // if name already in selections: game over
    if (selections.includes(name)) endGame();
    else {
      // add name to selections array
      setSelections([...selections, name]);
      incrementScore();
      // shuffle cards on re-render
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

  // reset score to 0; start new game
  function endGame() {
    setScore(0);
    console.log('Game over!');
    startGame();
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
        {shuffleArray(dataset).map((data) => (
          <Card key={data.id} data={data} handleSelection={handleSelection} />
        ))}
      </main>
      <footer>
        {/* MenuButton (sound) */}
        {/* MenuButton (help) */}
      </footer>
    </>
  );
}
