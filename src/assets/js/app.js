/*
 * Create a object that holds all cards
 */

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
    //Check if the game is end, return true or false
    isEndGame() {
        return this.solvedCards.length == this.arrayCards.length;
    }
};

function clickOnCard(evt) {
    let targetElement = false;
    if (evt.target.nodeName.toLowerCase() === 'li') {
        targetElement = evt.target;
    } else if (evt.target.nodeName.toLowerCase() === 'i') {
        targetElement = evt.target.parentNode;
    }
    if (targetElement) {
        let actionCard = memoryGame.playCard(targetElement.id);
        targetElement.classList.toggle('show');
        switch (actionCard) {
            case 'activated':
                console.log(actionCard);
                break;
            case 'matched':
                //targetElement.classList.replace('show','match')
                //document.getElementsByClassName('show')[0].classList.replace('show','match');
                console.log(actionCard);
                break;
            case 'deactivated':
                //targetElement.classList.toggle('show');
                //document.getElementsByClassName('show')[0].classList.toggle('show');
                console.log(actionCard);
                break;
            default:
                console.log(actionCard);

        }

    } else {
        console.log('no target');
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function createGame() {
    const cardsDeck = document.createDocumentFragment();
    memoryGame.initGame();
    const newCardList = document.createElement('ul');
    newCardList.classList.add('deck');
    newCardList.addEventListener('click', clickOnCard);
    for (var i = 0; i < memoryGame.arrayCards.length; i++) {
        const newCard = document.createElement('li');
        newCard.classList.add('card');
        newCard.classList.add('open');
        newCard.id = i;
        const newIco = document.createElement('i');
        newIco.classList.add('fa', memoryGame.arrayCards[i]);
        newCard.appendChild(newIco);
        newCardList.appendChild(newCard);
    }
    cardsDeck.appendChild(newCardList)
    let deck = document.querySelector('.deck');
    deck.parentNode.replaceChild(cardsDeck, deck);
}

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