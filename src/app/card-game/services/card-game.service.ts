import { Injectable } from '@angular/core';
import { MatchCondition } from '../enums';
import { Player, Card } from '../models';
import { GameManagerService } from './';

@Injectable({
    providedIn: 'root',
})
export class CardGameService {
    constructor(private gameManagerService: GameManagerService) { }

    public getPacksAndMatchConditions(): number[] {
        let numberOfPacks: number = 0;
        let matchCondition: number = 0;
    
        while (true) {
          const defaultValue = '1';
    
          try {
            const numberOfPacksPromptValue = prompt('how many packs of cards to use for the deck?', defaultValue);
            numberOfPacks = this.gameManagerService.getValidatedNumber(numberOfPacksPromptValue, 1, 50);
    
            const matchConditionPromptValue = prompt(`
          Choose one of the match conditions
          1. The suits of two cards must match
          2. The ranks of two cards must match
          3. Both rank and value must match(available only if number of packs is more than 1)`, defaultValue);
            matchCondition = this.gameManagerService.getValidatedNumber(matchConditionPromptValue, 1, 3);
          } catch (error) {
            alert(error);
            continue;
          }
    
          break;
        }
    
        return [numberOfPacks, matchCondition];
      }

    public getWinnerName(player1: Player, player2: Player) {
        let winnerName = '';

        if (player1.hand.length > player2.hand.length) {
            winnerName = player1.name;
        } else if (player1.hand.length < player2.hand.length) {
            winnerName = player2.name;
        }
        
        return winnerName;
    }

    public selectRandomPlayer(player1: Player, player2: Player): Player {
        const zeroOrOne = Math.floor(Math.random() * 2);

        return zeroOrOne === 0
            ? player1
            : player2;
    }

    public getMatchFunction(matchCondition: number): Function {
        switch (matchCondition) {
            case MatchCondition.SUITS_MUST_MATCH:
                return (firstCard: Card, secondCard: Card): boolean => firstCard.suit === secondCard.suit;
            case MatchCondition.RANKS_MUST_MATCH:
                return (firstCard: Card, secondCard: Card): boolean => firstCard.rank === secondCard.rank;
            case MatchCondition.SUITS_AND_RANKS_MUST_MATCH:
                return (firstCard: Card, secondCard: Card): boolean => firstCard.suit === secondCard.suit && firstCard.rank === secondCard.rank;
            default:
                throw new Error('wrong match condition');
        }
    }
}