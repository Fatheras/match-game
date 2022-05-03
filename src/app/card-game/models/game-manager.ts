import { Card, Deck, Player } from ".";
import { CardGameService } from "../services";

export class GameManager {
    constructor(
        private cardGameService: CardGameService,
        private numberOfPacks: number,
        private matchCondition: number
    ) { }

    start(): void {
        const firstPlayer: Player = new Player('Carlos Castaneda');
        const secondPlayer: Player = new Player('Don Juan');

        const deck: Deck = new Deck(this.numberOfPacks);
        let discardPile: Card[] = [];

        const isMatch = this.cardGameService.getMatchFunction(this.matchCondition);

        while (!deck.isEmpty()) {
            const firstPlayerCard: Card | null = deck.drawCard();
            const secondPlayerCard: Card | null = deck.drawCard();

            if (!(firstPlayerCard && secondPlayerCard)) {
                break;
            }

            discardPile.push(firstPlayerCard, secondPlayerCard);

            if (isMatch(firstPlayerCard, secondPlayerCard)) {
                const randomPlayer: Player = this.cardGameService.selectRandomPlayer(firstPlayer, secondPlayer);
                randomPlayer.hand.push(...discardPile);

                discardPile = [];
            }

            console.log('first player hand: ', firstPlayer.hand);
            console.log('second player hand: ', secondPlayer.hand);
        }

        let winnerName = this.cardGameService.getWinnerName(firstPlayer, secondPlayer);

        winnerName
            ? alert(`${winnerName} won`)
            : alert('draw')
    }
}
