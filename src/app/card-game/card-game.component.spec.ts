import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGameComponent } from './card-game.component';
import { CardGameService } from './services';

describe('CardGameComponent', () => {
  let component: CardGameComponent;
  let fixture: ComponentFixture<CardGameComponent>;
  let mockedCardGameService

  beforeEach(() => {
    mockedCardGameService = jasmine.createSpyObj(
      'CardGameService',
      ['getPacksAndMatchConditions', 'getWinnerName', 'selectRandomPlayer']
    );

    TestBed.configureTestingModule({
      declarations: [CardGameComponent],
      providers: [{ provide: CardGameService, useValue: mockedCardGameService }],
    });

    fixture = TestBed.createComponent(CardGameComponent);
    component = fixture.componentInstance;
  });

  it('check', () => {
    spyOn(component, 'onClick');
    component.onClick();
    expect(component.onClick).toHaveBeenCalled();
  });
});
