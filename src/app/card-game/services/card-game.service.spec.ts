import { TestBed } from '@angular/core/testing';
import { GameManagerService } from '.';
import { MatchCondition, Rank, Suit } from '../enums';
import { Card, Player } from '../models';

import { CardGameService } from './';

describe('CardGameService', () => {
  let cardGameService: CardGameService;
  let gameManagerServiceSpy: jasmine.SpyObj<GameManagerService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj(
      'GameManagerService',
      ['getValidatedNumber']
    );;

    TestBed.configureTestingModule({
      providers: [
        CardGameService,
        { provide: GameManagerService, useValue: spy }
      ]
    });

    cardGameService = TestBed.inject(CardGameService);
    gameManagerServiceSpy = TestBed.inject(GameManagerService) as jasmine.SpyObj<GameManagerService>;
  });

  describe('getWinnerName', () => {
    it('getWinnerName should return empty string when players have equal amount of cards', () => {
      // arrange
      const firstPlayer = new Player('first');
      const secondPlayer = new Player('second');
      const card = new Card(Rank.Ace, Suit.Clubs);

      firstPlayer.addCards([card]);
      secondPlayer.addCards([card]);

      const expectedResult = ''

      // act
      const result = cardGameService.getWinnerName(firstPlayer, secondPlayer);

      // assert
      expect(result).toBe(expectedResult)
    });

    it('getWinnerName should return first player name when first player has more cards than second player', () => {
      // arrange
      const firstPlayer = new Player('first');
      const secondPlayer = new Player('second');
      const card = new Card(Rank.Ace, Suit.Clubs);

      firstPlayer.addCards([card]);

      const expectedResult = firstPlayer.name;

      // act
      const result = cardGameService.getWinnerName(firstPlayer, secondPlayer);

      // assert
      expect(result).toBe(expectedResult)
    });

    it('getWinnerName should return second player name when second player has more cards than first player', () => {
      // arrange
      const firstPlayer = new Player('first');
      const secondPlayer = new Player('second');
      const card = new Card(Rank.Ace, Suit.Clubs);

      secondPlayer.addCards([card]);

      const expectedResult = secondPlayer.name;

      // act
      const result = cardGameService.getWinnerName(firstPlayer, secondPlayer);

      // assert
      expect(result).toBe(expectedResult)
    });
  });

  describe('selectRandomPlayer', () => {
    it('selectRandomPlayer should return random player', () => {
      // arrange
      const firstPlayer = new Player('first');
      const secondPlayer = new Player('second');

      // act
      const result: Player = cardGameService.selectRandomPlayer(firstPlayer, secondPlayer);

      // assert
      expect(result).toBeInstanceOf(Player);
    });
  });

  describe('getMatchFunction', () => {
    it('getMatchFunction should return first match function when appropriate value is passed', () => {
      // arrange
      const expectedResult: string = ((firstCard: Card, secondCard: Card): boolean => firstCard.suit === secondCard.suit).toString();

      // act
      const result: string = (cardGameService.getMatchFunction(MatchCondition.SUITS_MUST_MATCH)).toString();

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('getMatchFunction should return second match function when appropriate value is passed', () => {
      // arrange
      const expectedResult = ((firstCard: Card, secondCard: Card): boolean => firstCard.rank === secondCard.rank).toString();

      // act
      const result: string = (cardGameService.getMatchFunction(MatchCondition.RANKS_MUST_MATCH)).toString();

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('getMatchFunction should return third match function when appropriate value is passed', () => {
      // arrange
      const expectedResult: string = ((firstCard: Card, secondCard: Card): boolean => firstCard.suit === secondCard.suit && firstCard.rank === secondCard.rank).toString();

      // act
      const result: string = (cardGameService.getMatchFunction(MatchCondition.SUITS_AND_RANKS_MUST_MATCH)).toString();

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('getMatchFunction should return third match function when appropriate value is passed', () => {
      // arrange
      const expectedResult: string = ((firstCard: Card, secondCard: Card): boolean => firstCard.suit === secondCard.suit && firstCard.rank === secondCard.rank).toString();

      // act
      const result: string = (cardGameService.getMatchFunction(MatchCondition.SUITS_AND_RANKS_MUST_MATCH)).toString();

      // assert
      expect(result).toEqual(expectedResult);
    });

    it('getMatchFunction should throw an error when input is incorrect', () => {
      // arrange
      const incorrectInput = 4;

      try {
        // act 
        cardGameService.getMatchFunction(incorrectInput);
      } catch (error) {
        // assert
        expect(error).toEqual(new Error('wrong match condition'));
      }
    });
  });

  describe('getPacksAndMatchConditions', () => {
    it('getPacksAndMatchConditions should return array of correct values when both inputs are valid', () => {
      // arrange
      // disable prompt to run tests
      spyOn(window, "prompt").and.returnValue('');

      gameManagerServiceSpy.getValidatedNumber.and.returnValue(1);

      const expectedResult = [1, 1];

      // act
      const result = cardGameService.getPacksAndMatchConditions();

      // assert
      expect(result).toEqual(expectedResult);
    });

    // refactor infinite while loop
    it('getPacksAndMatchConditions should throw an error when getValidatedNumber get unvalid value', () => {
      // arrange
      // disable prompt to run tests
      spyOn(window, "prompt").and.returnValue('');
      spyOn(window, 'alert').and.throwError('error');

      gameManagerServiceSpy.getValidatedNumber.and.returnValue(1);

      try {
        // act
        cardGameService.getPacksAndMatchConditions();
      } catch (error) {
        // assert
        expect(error).toEqual(new Error('error'));
      }
    });
  });
});
