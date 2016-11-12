import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { GameStartService } from './services/game-start.service';
import { Player } from './models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ GameStartService ]
})
export class AppComponent {
  title: string = 'mancalaNg';
  tagline: string = 'play mancala in your web browser';
  @Input() private _players: Array<Player>;

  constructor(private gameStartService: GameStartService) {
    gameStartService.gameStartConfirmed$.subscribe(p => {
      this._players = p;
      this.announceGameStart();
    });
  }

  announceGameStart() {
    this.gameStartService.announceGameStart(this._players);
  }
}
