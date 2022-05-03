import { Rank, Suit } from "../enums";
import { Card } from "./card";

export class Deck {
    public deck: Card[] = [];
    public lastPlayedCard: Card | null = null;

    private suits: Suit[] = Object.values(Suit);
    private ranks: Rank[] = Object.values(Rank);

    constructor(numberOfPacks: number) {
        this.build(numberOfPacks);
    }

    private build(numberOfPacks: number): void {
        this.reset();

        // hardcoding the deck would give us better performance
        this.suits.forEach(suite => {
            this.ranks.forEach(rank => {
                for (let i = 0; i < numberOfPacks; i++) {
                    this.deck.push(new Card(rank, suite));
                }
            })
        });

        this.shuffle();
    }

    public drawCard(): Card | null {
        const drawnCard: Card | undefined = this.deck.pop();
        if (!drawnCard) {
            return null;
        }

        this.lastPlayedCard = drawnCard;

        return drawnCard;
    }

    public isEmpty(): boolean {
        return this.deck.length === 0;
    }

    public reset(): void {
        this.deck = [];
        this.lastPlayedCard = null;
    }

    public shuffle(): void {
        // this.deck.sort(() => Math.random() - 0.5);
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            [this.deck[i]] = [this.deck[j]];
        }
    }
}