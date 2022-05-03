import { Component, OnInit } from '@angular/core';
import { GameManager } from './models';
import { CardGameService } from './services';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css']
})
export class CardGameComponent implements OnInit {
  constructor(private cardGameService: CardGameService) { }

  ngOnInit(): void {}

  public onClick(): void {
    const [numberOfPacks, matchCondition] = this.cardGameService.getPacksAndMatchConditions();
    const gameManager: GameManager = new GameManager(this.cardGameService, numberOfPacks, matchCondition);

    gameManager.start();
  }
}
