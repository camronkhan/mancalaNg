import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { GameStartService } from './services/game-start.service';
import { GameOverService } from './services/game-over.service';
import { Player } from './models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ GameStartService, GameOverService ]
})
export class AppComponent {
  title: string = 'mancalaNg';
  tagline: string = 'play mancala in your web browser';
  @Input() private _players: Array<Player>;

  constructor(private _gameStartService: GameStartService, private _gameOverService: GameOverService) {
    this._gameStartService.gameStartConfirmed$.subscribe(p => {
      this._players = p;
      this.announceGameStart();
    });

    this._gameOverService.gameOverConfirmed$.subscribe(p => {
      this._players = p;
      this.announceGameOver();
    });
  }

  announceGameStart() {
    this._gameStartService.announceGameStart();
  }

  announceGameOver() {
    console.log('Game Over Announced');
    this._gameOverService.announceGameOver();
  }
}
