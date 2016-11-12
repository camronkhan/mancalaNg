import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
  // private _playerA: Player;
  // private _playerB: Player;
  @Input() private _players: Array<Player>;

  constructor(private gameStartService: GameStartService, private playerA: Player, private playerB: Player) {
    
  }

  ngOnInit() {
    this._visible = true;
    // this._playerA = this.playerA;
    // this._playerB = this.playerB;
    this._players = new Array<Player>();
  }

  confirmGameStart(event) {
    this._visible = false;
    this.playerA.name = 'Camron';
    this.playerB.name = 'Toni';
    this.playerA.turn = true;
    console.log(`A: ${this.playerA.turn}   B: ${this.playerB.turn}`);
    console.log(`this._playerA.name: ${this.playerA.name}   this._playerB.name: ${this.playerB.name}`);
    this._players.push(this.playerA);
    this._players.push(this.playerB);
    console.log(`nameA: ${this._players[0].name}   nameB: ${this._players[1].name}`);
    this.gameStartService.confirmGameStart(this._players);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
