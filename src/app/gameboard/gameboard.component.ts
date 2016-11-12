import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameStartService } from '../services/game-start.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit, OnDestroy {
  private _visible: boolean;
  private _subscription: Subscription;
  private _playerA: Player;
  private _playerB: Player;
  // @Input() private _players: Array<Player>;

  constructor(private gameStartService: GameStartService) {
    gameStartService.gameStartAnnounced$.subscribe(p => {
      this._playerA = p[0];
      this._playerB = p[1];
      console.log(`p[0]: ${p[0].name}   p[1]: ${p[1].name}`);
      this._visible = true;
    });
  }

  ngOnInit() {
    this._visible = false;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
