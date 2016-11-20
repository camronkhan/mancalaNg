import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameStartService } from '../services/game-start.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit, OnDestroy {
  private _setupVisible: boolean;
  private _subscription: Subscription;

  constructor(
    private gameStartService: GameStartService,
    @Inject('PlayerA') private _playerA: Player,
    @Inject('PlayerB') private _playerB: Player
  ) { }

  ngOnInit() {
    this._setupVisible = true;
  }

  onSubmit() {
    this._setupVisible = false;
    this._playerA.turn = true;
    this.gameStartService.confirmGameStart();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  haveDifferentNames(): boolean {
    if (this._playerA.name !== this._playerB.name) {
      return true;
    }
    return false;
  }
}
