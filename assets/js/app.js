/*
 * Create a object that holds all cards
 */

const memoryGame = {
    arrayCards: [],
    activeCard: -1,
    solvedCards: [],
    nameCards: ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'],
    moves: 0,
    stars: 3,
    isPlay: false,

    initGame() {
        'use strict';
        let newCards = [];
        if (this.activeCard != -1) {
            this.activeCard = -1;
        }
        if (this.solvedCards.length != 0) {
            this.solvedCards.splice(0, this.solvedCards.length);
        }
        for (let card of this.nameCards) {
            newCards.push(card, card);
        }
        this.arrayCards = newCards;
        this.shuffleCards();
        this.moves = 0;
    },

    // Shuffle function from http://stackoverflow.com/a/2450976
    shuffleCards() {
        let currentIndex = this.arrayCards.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.arrayCards[currentIndex];
            this.arrayCards[currentIndex] = this.arrayCards[randomIndex];
            this.arrayCards[randomIndex] = temporaryValue;
        }
    },

    /*
     * Method to compare and return the keywords
     * - 'disabled'(is already open or matched)
     * - 'activated'(is the first element activate to match)
     * - 'matched'(is matched with a previous card)
     * - 'deactivated'(not match with a previous card)
     */

    playCard(cardId) {
        if (typeof(this.solvedCards.find(x => x == cardId)) != 'undefined' || this.activeCard == cardId || this.isPlay) {
            return ['disabled'];
        } else if (this.activeCard == -1) {
            this.activeCard = cardId;
            this.moves++;
            return ['activated', this.activeCard];
        } else if (this.arrayCards[this.activeCard] == this.arrayCards[cardId]) {
            this.solvedCards.push(this.activeCard, cardId);
            let actCard = this.activeCard;
            this.activeCard = -1;
            this.moves++;
            this.isPlay = true;
            return ['matched', actCard];
        } else {
            let actCard = this.activeCard;
            this.activeCard = -1;
            this.moves++;
            this.isPlay = true;
            return ['deactivated', actCard];
        }
    },

    checkScore() {
        let errorCard = (this.moves - 16) / 2;
        this.stars = (errorCard <= 6) ? 3 :
            (errorCard > 6 && errorCard <= 9) ? 2 :
            1;
    },

    //Check if the game is end, return true or false

    isEndGame() {
        return this.solvedCards.length == this.arrayCards.length;
    }
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function clickOnCard(evt) {
    let targetElement;
    if (evt.target.nodeName.toLowerCase() === 'li') {
        targetElement = evt.target;
    } else if (evt.target.nodeName.toLowerCase() === 'i') {
        targetElement = evt.target.parentNode;
    }
    if (targetElement) {
        let actionCard = memoryGame.playCard(targetElement.id);
        let secondElem;
        if (!memoryGame.isPlay) {
            targetElement.classList.add('open');
            targetElement.classList.add('show');
        }
        switch (actionCard[0]) {
            case 'activated':
                break;
            case 'matched':
                secondElem = document.getElementById(actionCard[1]);
                matchedCard(targetElement, secondElem);
                break;
            case 'deactivated':
                secondElem = document.getElementById(actionCard[1]);
                deactivatedCard(targetElement, secondElem);
                break;
            default:
        }
        updateScore();
        if (memoryGame.isEndGame()) {
            endGame();
        }
    }
}

function matchedCard(firstElem, secondElem) {
    firstElem.classList.remove('show', 'open');
    secondElem.classList.remove('show', 'open');
    firstElem.classList.add('match');
    secondElem.classList.add('match');
    memoryGame.isPlay = false;
}

function deactivatedCard(firstElem, secondElem) {
    firstElem.classList.add('close');
    secondElem.classList.add('close');
    setTimeout(function closeCard() {
        firstElem.classList.remove('show', 'open', 'close');
        secondElem.classList.remove('show', 'open', 'close');
        memoryGame.isPlay = false;
    }, 500);
}

/*
 * Update score
 */

function updateScore() {
    document.querySelector('.moves').textContent = memoryGame.moves;
    memoryGame.checkScore();
    let starsScore = document.querySelectorAll('.stars>li>i');
    for (var i = 0; i < 3; i++) {
        starsScore[i].classList.add('fa-star-o');
    }
    for (var i = 0; i < memoryGame.stars; i++) {
        starsScore[i].classList.replace('fa-star-o', 'fa-star');
    }
}

/*
 *   Display time
 */

let startingTime,
    endingTime,
    timerId;

function calculateTime() {
    endingTime = performance.now();
    let timeSec = Math.floor((endingTime - startingTime) / 1000);
    let hours = Math.floor(timeSec / 3600);
    let minutes = Math.floor((timeSec % 3600) / 60);
    let seconds = timeSec % 3600 % 60;
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    let time = `${hours}:${minutes}:${seconds}`;
    return time;
}

function updateTime() {
    let time = calculateTime();
    document.querySelector('.time').textContent = time;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function createDeck() {
    const cardsDeck = document.createDocumentFragment();
    memoryGame.initGame();
    const newCardList = document.createElement('ul');
    newCardList.classList.add('deck');
    newCardList.addEventListener('click', clickOnCard);
    for (let i = 0; i < memoryGame.arrayCards.length; i++) {
        const newCard = document.createElement('li');
        newCard.classList.add('card');
        newCard.id = i;
        const newIco = document.createElement('i');
        newIco.classList.add('fa', memoryGame.arrayCards[i]);
        newCard.appendChild(newIco);
        newCardList.appendChild(newCard);
    }
    cardsDeck.appendChild(newCardList)
    let deck = document.querySelector('.deck');
    deck.parentNode.replaceChild(cardsDeck, deck);
    updateScore();
    startingTime = performance.now();
    timerId = setInterval(updateTime, 1000);
}

/*
 *   Start, end and restart game
 */
function restartGame (){
    clearInterval(timerId);
    createDeck();
}

function backToGame() {
    document.querySelector('.modal-back').classList.add('hide');
    document.querySelector('.restart').classList.remove('hide');
    const panelScore = document.querySelector('.score-panel');
    const scorePanel = document.querySelectorAll('.scores');
    for (let elem of scorePanel) {
        panelScore.appendChild(elem);
    }
    createDeck();
}

function endGame() {
    clearInterval(timerId);
    document.querySelector('.modal-back').classList.remove('hide');
    document.querySelector('.restart').classList.add('hide');
    memoryGame.isPlay = false;
    const endScore = document.querySelector('.end-score');
    const scorePanel = document.querySelectorAll('.scores');
    for (let elem of scorePanel) {
        endScore.appendChild(elem);
    }
}

function createGame() {
    document.querySelector('.restart').addEventListener('click', restartGame);//here
    document.querySelector('.close-modal').addEventListener('click', backToGame);
    createDeck();
}

/*
 * Initialize game
 */

createGame();