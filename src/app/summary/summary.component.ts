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
    private _summaryText: string;

    constructor(
        private _gameRestartService: GameRestartService,
        private _gameOverService: GameOverService,
        @Inject('PlayerA') private _playerA: Player,
        @Inject('PlayerB') private _playerB: Player
    ) {
        this._gameOverService.gameOverAnnounced$.subscribe(p => {
            this._summaryText = this.getSummaryText();
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
    * Returns win/draw text
    * Requirement: 
    */
    getSummaryText(): string {
        if (this._playerA.score > this._playerB.score) {
            return `${this._playerA.name} is the winner!`;
        } else if (this._playerB.score > this._playerA.score) {
            return `${this._playerB.name} is the winner!`;
        } else {
            return `${this._playerA.name} and ${this._playerB.name} tied!`;
        }
    }
}
