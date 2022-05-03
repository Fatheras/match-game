import { TestBed } from '@angular/core/testing';
import { GameManagerService } from '.';

describe('GameManagerService', () => {
  let gameManagerService: GameManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameManagerService]
    });

    gameManagerService = TestBed.inject(GameManagerService);
  });

  describe('getValidatedNumber', () => {
    it('getValidatedNumber should return validated number if passed value is in range', () => {
      // arrange
      const min = 1, max = 50;
      const input = '10';

      const expectedResult = +input;

      // act
      const result = gameManagerService.getValidatedNumber(input, min, max);

      // assert
      expect(result).toBe(expectedResult)
    });

    it('getValidatedNumber should return validated number if passed value is not in range', () => {
      // arrange
      const min = 1, max = 50;
      const input = '51';

      try {
        // act
        gameManagerService.getValidatedNumber(input, min, max);
      } catch (error) {

        // assert
        expect(error).toEqual(new Error(`enter a valid number from ${min} to ${max}`))
      }
    });

    it('getValidatedNumber should return validated number if passed value is nullable', () => {
      // arrange
      const min = 1, max = 50;
      const input = null;

      try {
        // act
        gameManagerService.getValidatedNumber(input, min, max);
      } catch (error) {

        // assert
        expect(error).toEqual(new Error(`enter a valid number from ${min} to ${max}`))
      }
    });
  });
});
