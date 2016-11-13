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
  private _visible: boolean;
  private _subscription: Subscription;

  constructor(
    private gameStartService: GameStartService,
    @Inject('PlayerA') private _playerA: Player,
    @Inject('PlayerB') private _playerB: Player
  ) { }

  ngOnInit() {
    this._visible = true;
  }

  confirmGameStart(event) {
    this._visible = false;
    this._playerA.name = 'Camron';
    this._playerB.name = 'Toni';
    this._playerA.turn = true;
    console.log(`A: ${this._playerA.turn}   B: ${this._playerB.turn}`);
    console.log(`this._playerA.name: ${this._playerA.name}   this._playerB.name: ${this._playerB.name}`);
    this.gameStartService.confirmGameStart();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
