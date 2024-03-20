// input: pokemon data fetched from api
// output: Pokemon obj instance
// e.g. Pokemon {
//   id: 144,
//   name: 'Articuno',
//   types: ['ice', 'flying'],
//   imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png',
// }
export default class Pokemon {
  constructor({ id, name, types, sprites }) {
    this.id = id;
    this.name = Pokemon.#FormatName(name);
    this.types = Pokemon.#FormatTypes(types);
    this.imageUrl = sprites.other['official-artwork'].front_default;
  }

  // input: name from api data
  // output: name formatted for app (e.g. 'Articuno')
  static #FormatName(name) {
    const edgeCases = {
      farfetchd: "Farfetch'd",
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

  // input: types from api data
  // output: array of types formatted and filtered for app (e.g. ['ice', 'flying'])
  static #FormatTypes(types) {
    const edgeCases = ['steel'];
    return types.reduce((accum, type) => {
      if (!edgeCases.includes(type.type.name)) accum.push(type.type.name);
      return accum;
    }, []);
  }
}
