import { Component, Inject } from '@angular/core';
import { Player } from '../models/player';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent {

  constructor(
    @Inject('PlayerA') private _playerA: Player,
    @Inject('PlayerB') private _playerB: Player
  ) { }
}
