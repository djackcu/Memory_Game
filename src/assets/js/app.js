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

    initGame() {
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
        if (typeof(this.solvedCards.find(x => x == cardId)) != 'undefined' || this.activeCard == cardId) {
            return ['disabled'];
        } else if (this.activeCard == -1) {
            let actCard = this.activeCard = cardId;
            this.moves++;
            return ['activated', actCard];
        } else if (this.arrayCards[this.activeCard] == this.arrayCards[cardId]) {
            this.solvedCards.push(this.activeCard, cardId);
            let actCard = this.activeCard;
            this.activeCard = -1;
            this.moves++;
            return ['matched', actCard];
        } else {
            let actCard = this.activeCard;
            this.activeCard = -1;
            this.moves++;
            return ['deactivated', actCard];
        }
    },

    checkScore() {
        let score = (this.moves - 16) / 2;
        this.stars = (score <= 3) ? 3 :
            (score > 3 && score <= 6) ? 2 :
            (score > 6 && score <= 9) ? 1 :
            0;
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
        targetElement.classList.add('open');
        switch (actionCard[0]) {
            case 'activated':
                targetElement.classList.add('show');
                break;
            case 'matched':
                targetElement.classList.add('match');
                document.getElementById(actionCard[1]).classList.replace('show', 'match');
                break;
            case 'deactivated':
                targetElement.classList.add('show');
                targetElement.classList.add('close');
                document.getElementById(actionCard[1]).classList.add('close');
                setTimeout(function closeCard() {
                    targetElement.classList.remove('show', 'open', 'close');
                    document.getElementById(actionCard[1]).classList.remove('show', 'open', 'close');
                }, 1000);
                break;
            default:
        }
        updateScore();
        if (memoryGame.isEndGame()) {
            endGame();
        }
    }
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

function restartGame() {
    document.querySelector('.modal').classList.add('hide');
    document.querySelector('.modal-back').classList.add('hide');
    /* const panelScore = document.querySelector('.score-panel');
     const scorePanel = document.querySelectorAll('.panel');
     panelScore.appendChild(scorePanel);*/
    createDeck();
}

function endGame() {
    clearInterval(timerId);
    document.querySelector('.modal').classList.remove('hide');
    document.querySelector('.modal-back').classList.remove('hide');
    /* const endScore = document.querySelector('.end-score');
     const scorePanel = document.querySelectorAll('.panel');
     endScore.appendChild(scorePanel);*/
}

function createGame() {
    document.querySelector('.restart').addEventListener('click', createDeck);
    document.querySelector('.close-modal').addEventListener('click', restartGame);
    createDeck();
}

createGame();