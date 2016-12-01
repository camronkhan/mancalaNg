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

    /*
    * Makes setup component visible on startup
    * Requirement: 
    */
    ngOnInit() {
        this._setupVisible = true;
    }

    /*
    * When user clicks start button hide setup compnoent, set Player A to current player, and emit game start observable
    * Requirement: 
    */
    onSubmit() {
        this._setupVisible = false;
        this._playerA.turn = true;
        this.gameStartService.confirmGameStart();
    }

    /*
    * Unsubscribe from subscription when component is destroyed
    * Requirement: 
    */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    /*
    * Returns true if string values in player name fields are different, false otherwise
    * Requirement: 
    */
    haveDifferentNames(): boolean {
        if (this._playerA.name !== this._playerB.name) {
            return true;
        }
        return false;
    }
}
