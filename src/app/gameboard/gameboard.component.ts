import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameStartService } from '../services/game-start.service';
import { Player } from '../models/player';
import { Gameboard } from '../models/gameboard';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit, OnDestroy {
  private _gameboardVisible: boolean;
  private _subscription: Subscription;

  constructor(
    private gameStartService: GameStartService,
    private _gameboard: Gamepad,
    @Inject('PlayerA') private _playerA: Player,
    @Inject('PlayerB') private _playerB: Player)
  {
    gameStartService.gameStartAnnounced$.subscribe(p => {
      this._gameboardVisible = true;
    });
  }

  ngOnInit() {
    this._gameboardVisible = false;
    this._gameboard.
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
