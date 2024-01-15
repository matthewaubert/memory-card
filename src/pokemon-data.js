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

// input: pokemon data fetched from api
// output: Pokemon obj instance
// e.g. Pokemon {
//   id: 144,
//   name: 'Articuno',
//   types: ['ice', 'flying'],
//   imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png',
// }
class Pokemon {
  constructor({ id, name, types, sprites }) {
    this.id = id;
    this.name = Pokemon.#FormatName(name);
    this.types = types.map((type) => type.type.name);
    this.imageUrl = sprites.other['official-artwork'].front_default;
  }

  // input: name from api data
  // output: name formatted for app
  static #FormatName(name) {
    const edgeCases = {
      'farfetchd': 'Farfetch\'d',
      'mr-mime': 'Mr. Mime',
      'nidoran-f': 'Nidoran♀',
      'nidoran-m': 'Nidoran♂',
    };

    // if name is an edge case: return mapped value
    for (const key in edgeCases) {
      if (name === key) return edgeCases[key];
    }

    // else: return title-cased name
    return name[0].toUpperCase() + name.slice(1);
  }
}
