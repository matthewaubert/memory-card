import { useEffect, useState } from 'react';
import Card from './components/Card.jsx';
import getPokemonDataset from './pokemon-data.js';
import { getRandInts } from './util.js';
import './App.css';

// get 12 random ints btw 1 and 151 (inclusive)
const numCards = 12;
const ids = getRandInts(numCards, 1, 152)

export default function App() {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    (async () => {
      const pokemonDataset = await getPokemonDataset(ids);
      console.log(pokemonDataset);
      setDataset(pokemonDataset);
    })();
  }, []);

  return (
    <>
      {/* StartScreen (conditionally display) */}
      <header>
        {/* logo button */}
        {/* Scoreboard */}
      </header>
      <main>
        {/* Cards (one per pokemon in dataset) */}
        {dataset.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </main>
      <footer>
        {/* MenuButton (sound) */}
        {/* MenuButton (help) */}
      </footer>
    </>
  );
}
