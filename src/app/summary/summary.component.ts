import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameRestartService } from '../services/game-restart.service';
import { GameOverService } from '../services/game-over.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {
  private _summaryVisible: boolean;
  private _subscription: Subscription;
  private _winner: string;
  private _winnerScore: number;
  private _loserScore: number;
  private _isDraw: boolean;

  constructor(
    private _gameRestartService: GameRestartService,
    private _gameOverService: GameOverService,
    @Inject('PlayerA') private _playerA: Player,
    @Inject('PlayerB') private _playerB: Player
  ) {
    this._gameOverService.gameOverAnnounced$.subscribe(p => {
      this._winner = this.getWinner();
      this._winnerScore = this.getWinnerScore();
      this._loserScore = this.getLoserScore();
      this._isDraw = this.checkIfDraw();
      this._summaryVisible = true;
    });
  }

  ngOnInit() {
    this._summaryVisible = false;
  }

  onSubmit() {
    this._summaryVisible = false;
    this._gameRestartService.confirmGameRestart();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getWinner(): string {
    if (this._playerA.score > this._playerB.score) { return this._playerA.name; }
    return this._playerB.name;
  }

  getWinnerScore(): number {
    if (this._playerA.score > this._playerB.score) { return this._playerA.score; }
    return this._playerB.score;
  }

  getLoserScore(): number {
    if (this._playerA.score > this._playerB.score) { return this._playerB.score; }
    return this._playerA.score;
  }

  checkIfDraw(): boolean {
    if (this._playerA.score === this._playerB.score) { return true; }
    return false;
  }
}
