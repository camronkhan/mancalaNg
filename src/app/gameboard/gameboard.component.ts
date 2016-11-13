import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
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

  constructor(
    private gameStartService: GameStartService,
    @Inject('PlayerA') private _playerA: Player,
    @Inject('PlayerB') private _playerB: Player)
  {
    gameStartService.gameStartAnnounced$.subscribe(p => {
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
