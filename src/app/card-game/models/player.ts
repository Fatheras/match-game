import { Card } from ".";

export class Player {
    public hand: Card[] = [];
            
    constructor(public name: string) {}
    
    public addCards(cards: Card[]): void {
        cards.forEach(card => this.hand.push(card));
    }

}