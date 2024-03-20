import Pokemon from './Pokemon';

// fetch and process pokemon data from api
// input: array of ids (int btw 1 and 151, inclusive)
// output: array of Pokemon obj instances
export default async function getPokemonDataset(ids) {
  const pokemonDataset = [];

  // for each id: fetch data, process into Pokemon instance, push to pokemonDataset
  for (const id of ids) {
    const response = await fetchPokemonData(id);
    if (response === null) return null; // if error, return null
    // console.log(response);

    pokemonDataset.push(new Pokemon(response));
  }

  // console.log(pokemonDataset);
  return pokemonDataset;
}

// fetch pokemon data from api
// input: id (int btw 1 and 151, inclusive)
async function fetchPokemonData(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      mode: 'cors',
    });

    // if response not ok, throw error
    if (!response.ok) throw new Error(`Pokemon #${id} not found`);

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
