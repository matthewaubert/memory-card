## Understanding the Problem

Create a memory card game. My app should include the following:

- A scoreboard, which counts the highest score
- A "Best Score", which shows the highest score the user has achieved thus far
- A function that displays the cards in random order anytime a user clicks one
- A handful of cards that display images and possibly informational text. These cards and texts need to be fetched from an external API.

## Plan

1. [Create a new React project](https://gist.github.com/matthewaubert/e809ae8ccfe41442bb588b3c49d9c63d)

1. Features I want to implement:
   - Cards in the center of the screen. They should rotate dynamically when the user hovers over them and flip around when clicked.
   - A scoreboard to record the current score and high score
   - Save the high score to the browser's localStorage
   - Instructions or a help menu
   - An interesting background (perhaps a moving gif?)
   - Music and/or sound effects
   <!-- - Different difficulty levels? (e.g. easy, medium, hard) -->

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
   - I will use [PokéAPI](https://pokeapi.co/)
   - Based on the documentation, I can make a fetch request to `https://pokeapi.co/api/v2/pokemon/{name or id}`
   - I can then make use of the `name`, `types`, and `sprites` properties in the resulting JSON object
