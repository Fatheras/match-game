# Card Game

Simulation of a card game called "Match!" between two computer players.

## How to start

1. Clone the project `git clone https://github.com/zoopla/Stanislav-Levchenko.git`
2. Run `npm i`
3. Run `npm start` for a dev server
4. Navigate to `http://localhost:4200/`

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## How to improve

- provide the ability to play the game in real time, for example by using setTimeOut and asking the players to press a specific key to declare "Match!"
- move the logic to the server side
- provide additional features such as authorization, user profile, leaderboard, monetization, user chat between game sessions and so on
- improve UI
- refactor the code (improve shuffle algorithm, remove the prompt loop, use Angular code architecture, move some logic to a shared service)
- add more validation
- improve test coverage(add integration and e2e tests)
