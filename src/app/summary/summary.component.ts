import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
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

  constructor(
    private _gameOverService: GameOverService,
    @Inject('PlayerA') private _playerA: Player,
    @Inject('PlayerB') private _playerB: Player
  ) { 
    console.log('Summary component created');
    this._gameOverService.gameOverAnnounced$.subscribe(p => { this._summaryVisible = true; }); }

  ngOnInit() {
    this._summaryVisible = false;
  }

  onSubmit() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
