# Memory Card

This project was built as part of <a href="https://www.theodinproject.com/lessons/node-path-react-new-memory-card">The Odin Project: React course</a> in order to implement the React concepts I've learned thus far, including components, JSX, keys, props, state, and effects.

The main goal is to use hooks to manage and utilize state while fetching and using data from an external API.

## Understanding the Problem

Create a memory card game, with similar functionality to <a href="https://heldersrvio.github.io/memory-card-game/">this student's solution</a>.

My app should include the following:
- A scoreboard, which counts the highest score
- A "Best Score", which shows the highest score the user has achieved thus far
- A function that displays the cards in random order anytime a user clicks one
- A handful of cards that display images and possibly informational text. These cards and texts need to be fetched from an external API.

## Plan

1. <a href="https://gist.github.com/matthewaubert/e809ae8ccfe41442bb588b3c49d9c63d">Create a new React project</a>

1. Features I want to implement:
   - Cards in the center of the screen. They should rotate dynamically when the user hovers over them and flip around when clicked.
   - A scoreboard to record the current score and high score
   - Save the high score to the browser's localStorage
   - Instructions or a help menu
   - An interesting background (perhaps a moving gif?)
   - Music and sound effects?
   - Different difficulty levels? (e.g. easy, medium, hard)

1. Components I'll need:
   - Card
   - StartScreen
   - Scoreboard
   - MenuButton
   - HelpMenu (modal)

1. How to structure my application:
   - App (background image)
     - Header
       - Logo
       - Scoreboard
     - Main
       - Cards (fit to screen via CSS grid repeat fn)
     - Footer
       - MenuButton (sound)
       - MenuButton (help)

1. How to get the images from an API:
   - I will use <a href="https://pokeapi.co/">PokéApi</a>
   - Based on the documentation, I can make a fetch request to "https://pokeapi.co/api/v2/pokemon/{name or id}"
   - I can then make use of the `name`, `types`, and `sprites` properties in the resulting JSON object

## Credits

- International Pokémon logo: <a href="https://en.m.wikipedia.org/wiki/File:International_Pok%C3%A9mon_logo.svg">Wikipedia Commons</a>
- Pokémon card background: <a href="https://www.deviantart.com/atomicmonkeytcg/art/Pokemon-Card-Backside-in-High-Resolution-633406210">AtomicmonkeyTCG on DeviantArt</a>
- Landscape background: <a href="https://www.deviantart.com/mizudokei/art/Twitch-Plays-Pokemon-440694759">Mizudokei on DeviantArt</a>
- Background music: <a href="https://www.youtube.com/watch?v=m1vtEX64gmE&ab_channel=GlitchxCity">GlitchxCity</a>
- Poké Ball favicon: <a href="https://en.m.wikipedia.org/wiki/File:Pok%C3%A9_Ball_icon.svg">Wikipedia Commons</a>