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

    /*
    * Hides summary component when initialized
    * Requirement: 
    */
    ngOnInit() {
        this._summaryVisible = false;
    }

    /*
    * Hides summary component and emits game restart observable when restart button clicked
    * Requirement: 
    */
    onSubmit() {
        this._summaryVisible = false;
        this._gameRestartService.confirmGameRestart();
    }

    /*
    * Unsubscribes from subscription when component is destroyed
    * Requirement: 
    */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    /*
    * Returns player with higher score
    * Requirement: 
    */
    getWinner(): string {
        if (this._playerA.score > this._playerB.score) { return this._playerA.name; }
        return this._playerB.name;
    }

    /*
    * Returns the winner's score
    * Requirement: 
    */
    getWinnerScore(): number {
        if (this._playerA.score > this._playerB.score) { return this._playerA.score; }
        return this._playerB.score;
    }

    /*
    * Returns the loser's score
    * Requirement: 
    */
    getLoserScore(): number {
        if (this._playerA.score > this._playerB.score) { return this._playerB.score; }
        return this._playerA.score;
    }

    /*
    * Returns true if players tied, false otherwise
    * Requirement: 
    */
    checkIfDraw(): boolean {
        if (this._playerA.score === this._playerB.score) { return true; }
        return false;
    }
}
