# Memory Game

## Table of content
* [Descriptions](#description)
* [Instructions](#instructions)
* [Contributing](#contributing)
* [Getting started](#getting-started)

### Description
This Memory Game is a project made in pure javascript, html and css.It is a Project for practice web front-end skills in the _Udacity Front-End Nanodegree_.
You can test and exercise your memory capacity.

### Instructions 
This game consist in pairing two cards. It show:
* 8 pair of cards.
* one scoreboard to show time, moves and score.
The game is score with stars:
* Complete the game with 1-4 errors (3 stars).
* Complete the game with 5-8 errors (2 stars).
* Complete the game with +8 errors (1 star).
The game finish when all your card are pair.


### Getting started
This game you can play online:
[https://djackcu.github.io/Memory_Game/](https://djackcu.github.io/Memory_Game/)
or can play in your computer:
```
$ git clone https://github.com/djackcu/Memory_Game.git
$ cd Memory_Game
```

and open the file index.html 
### Build width
* [JavaScript](https://www.javascript.com/)
* [HTML5](https://www.w3.org/TR/html5/)
* [CSS3](https://www.w3.org/TR/css3-roadmap/)

### Code description
**_memoryGame_** is a object that contain array of cards moves and stars, and methods to initialize and shuffle cards, logic to play cards and track the score
**_memoryGame.clickOnCard_** is an event listener to show and activate cards, match cards (**_calling matchedCard()_**),deactivate cards (**_calling deactivatedCard()_**), update the score(**_calling updateScore()_**) and end game(**_calling endGame_**).

**_calculateTime()_** and **_updateTime()_**  are executed every second to show the time.

**_createDeck()_**  create the stock of card.

**_restartGame()_** and **_backToGame()_** restart the game.

**_createGame()_** and **_endGame()_** initialize and end the game.

### Contributing
This repository is one of the project of _Udacity's Nanodegree_. Therefore, we most likely will not accept pull requests. 

## Authors

**Dieter Jackson**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details