import { useEffect, useState } from 'react';
import Scoreboard from './components/Scoreboard.jsx';
import Card from './components/Card.jsx';
import GameOver from './components/GameOver.jsx';
import Music from './components/Music.jsx';
import Help from './components/Help.jsx';
import getPokemonDataset from './pokemon-data.js';
import { getRandInts, shuffleArray } from './util.js';
import pokemonLogo from './assets/pokemon-logo.svg';
import './App.css';

const numCards = 12; // number of cards to display
const pokemonNums = [1, 151]; // range of pokemon id nums to fetch (inclusive)
const delay = 600; // delay in ms for setTimeouts

export default function App() {
  const [dataset, setDataset] = useState([]);
  const [selections, setSelections] = useState([]);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [numGames, setNumGames] = useState(0); // trigger fetch new pokemon data

  // fetch array of pokemon data and store in state
  useEffect(() => {
    (async () => {
      // get {numCards} random ints btw pokemonNums (inclusive)
      const ids = getRandInts(numCards, pokemonNums[0], pokemonNums[1] + 1);
      const pokemonDataset = await getPokemonDataset(ids);
      console.log(pokemonDataset);
      setDataset(pokemonDataset);
    })();
  }, [numGames]);

  // reset dataset, selections, score, gameOver;
  // trigger fetch new pokemon data
  function startGame() {
    setDataset([]);
    setSelections([]);
    setScore(0);
    setGameOver(false);
    setNumGames(numGames + 1);
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
      setTimeout(shuffleCards, delay); // shuffle cards after flipping (to hide shuffle)
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
      <div id="background"></div>
      {/* StartScreen? (conditionally display) */}
      <header>
        <LogoButton />
        <Scoreboard score={score} hiScore={hiScore} />
      </header>
      <footer>
        <Music />
        <Help numGames={numGames} />
      </footer>
      <main>
        {/* render cards only if there's pokemon data */}
        {dataset.length > 0 && (
          <>
            {/* Cards (one per pokemon in dataset) */}
            {dataset.map((data) => (
              <Card
                key={data.id}
                data={data}
                handleSelection={handleSelection}
                gameOver={gameOver}
                delay={delay}
              />
            ))}
          </>
        )}
      </main>
      {gameOver && (
        <GameOver score={score} numCards={numCards} startGame={startGame} />
      )}
    </>
  );
}

function LogoButton() {
  return (
    <button className="logo" onClick={() => location.reload()}>
      <div className="logo-wrapper">
        <img src={pokemonLogo} alt="Pokémon logo" />
        <span>MEMORY CARD GAME</span>
      </div>
    </button>
  );
}
