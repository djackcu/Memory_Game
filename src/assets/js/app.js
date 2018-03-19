const memoryGame = {
    arrayCards: [], 
    activeCards: [],
    solvedCards: [],
    // Shuffle function from http://stackoverflow.com/a/2450976
    shuffleCards() {
        var currentIndex = this.arrayCards.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.arrayCards[currentIndex];
            this.arrayCards[currentIndex] = this.arrayCards[randomIndex];
            this.arrayCards[randomIndex] = temporaryValue;
        }
    },

    initGame(num) {
        let newCards = [];
        this.activeCards.splice(0, this.activeCards.length);
        this.solvedCards.splice(0, this.solvedCards.length);
        for (let i = 1; i <= num; i++) {
            newCards.push(i);
            newCards.push(i);
        }
        this.arrayCards = newCards;
        this.shuffleCards();
    },

    isPair(card) {
        console.log(card);
        if (this.activeCards.length == 0) {
            this.activeCards.push(card);
        } else {
            if (this.activeCards[0] == card) {
                this.solvedCards.push(card);
                this.activeCards.pop();
                this.arrayCards = this.arrayCards.map(x => (x == card ? 0 : x));
            } else {
                this.activeCards.pop();
            }
        }
    },

    isEndGame() {
        return typeof(this.arrayCards.find(x => x > 0)) == 'undefined';
    }
};


function printAll() {
    console.log(memoryGame.arrayCards);
    console.log(memoryGame.activeCards);
    console.log(memoryGame.solvedCards);
    console.log(memoryGame.isEndGame());
}
memoryGame.initGame(4);
printAll();
memoryGame.shuffleCards();
printAll();
memoryGame.isPair(1);
printAll();
memoryGame.isPair(1);
printAll();
memoryGame.isPair(4);
printAll();
memoryGame.isPair(2);
printAll();
memoryGame.isPair(2);
printAll();
memoryGame.isPair(2);
printAll();
memoryGame.isPair(3);
printAll();
memoryGame.isPair(3);
printAll();
memoryGame.isPair(4);
printAll();
memoryGame.isPair(4);
printAll();
memoryGame.initGame(4);
printAll();