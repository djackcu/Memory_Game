const memoryGame = {
    arrayCards: [],
    activeCard: false,
    solvedCards: [],
    nameCards: ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'],
    moves: 0,

    initGame() {
        let newCards = [];
        if (!this.activeCard) {
            this.activeCard = false;
        }
        if (this.solvedCards.length != 0) {
            this.solvedCards.splice(0, this.solvedCards.length);
        }
        for (let card of this.nameCards) {
            newCards.push(card);
            newCards.push(card);
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

    playCard(cardId) {
        if (typeof(this.solvedCards.find(x => x == cardId)) != 'undefined' || this.activeCard == cardId) {
            return 'disabled';
        } else if (!this.activeCard) {
            this.activeCard = cardId;
            this.moves++;
            return 'activated';
        } else if (this.arrayCards[this.activeCard] == this.arrayCards[cardId]) {
            this.solvedCards.push(this.activeCard, cardId);
            this.activeCard = false;
            this.moves++;
            return 'matched';
        } else {
            this.activeCard = false;
            this.moves++;
            return 'deactivated';
        }
    },

    isEndGame() {
        return this.solvedCards.length == this.arrayCards.length;
    }
};

function createGame() {
    const cardsDeck = document.createDocumentFragment();
    memoryGame.initGame();
    for (var i = 0; i < memoryGame.arrayCards.length; i++) {
        const newCard = document.createElement('li');
        newCard.classList.add('card');
        newCard.classList.add('open','show');
        newCard.id = i;
        const newIco = document.createElement('i');
        newIco.classList.add('fa');
        newIco.classList.add(memoryGame.arrayCards[i]);
        newCard.appendChild(newIco);
        cardsDeck.appendChild(newCard);
    }
    console.log(cardsDeck);
    let deck = document.getElementsByClassName('deck');
    //deck.appenChild(cardsDeck);
    console.log(deck);
    //deck.appendChild(cardsDeck);
}

function printAll() {
    console.log(memoryGame.arrayCards);
    console.log(memoryGame.activeCard);
    console.log(memoryGame.solvedCards);
    console.log(memoryGame.moves);
    console.log(memoryGame.isEndGame());
}


/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

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