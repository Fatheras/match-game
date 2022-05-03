import { Card } from ".";

export class Hand {
    public hand: Card[] = [];

    public addCards(cards: Card[]): void {
        cards.forEach(card => this.hand.push(card));
    }
}